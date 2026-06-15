import {
  createCipheriv,
  createDecipheriv,
  createHash,
  createHmac,
  randomBytes,
  randomInt,
  timingSafeEqual,
} from 'crypto';
import * as OTPAuth from 'otpauth';
import Admin from '../models/Admin';

const issuer = 'Itahari International College';
const recoveryAlphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

interface AdminSecondFactor {
  _id: { toString(): string };
  twoFactorSecret?: string;
  twoFactorRecoveryCodes?: string[];
  twoFactorLastUsedCounter?: number;
}

function getKeyMaterial() {
  const keyMaterial =
    process.env.TWO_FACTOR_ENCRYPTION_KEY || process.env.JWT_SECRET;

  if (keyMaterial) return keyMaterial;
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'TWO_FACTOR_ENCRYPTION_KEY or JWT_SECRET is required in production',
    );
  }

  return 'development-only-two-factor-key';
}

function getEncryptionKey() {
  return createHash('sha256').update(getKeyMaterial()).digest();
}

function normalizeCode(code: string) {
  return code.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
}

function createTotp(email: string, secret: string | OTPAuth.Secret) {
  return new OTPAuth.TOTP({
    issuer,
    label: email,
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    secret,
  });
}

export function createTwoFactorEnrollment(email: string) {
  const secret = new OTPAuth.Secret({ size: 20 });
  const totp = createTotp(email, secret);

  return {
    secret: secret.base32,
    uri: totp.toString(),
  };
}

export function encryptTwoFactorSecret(secret: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', getEncryptionKey(), iv);
  const encrypted = Buffer.concat([
    cipher.update(secret, 'utf8'),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  return [iv, authTag, encrypted]
    .map((part) => part.toString('base64url'))
    .join('.');
}

export function decryptTwoFactorSecret(value: string) {
  const [ivValue, authTagValue, encryptedValue] = value.split('.');
  if (!ivValue || !authTagValue || !encryptedValue) {
    throw new Error('Invalid encrypted two-factor secret');
  }

  const decipher = createDecipheriv(
    'aes-256-gcm',
    getEncryptionKey(),
    Buffer.from(ivValue, 'base64url'),
  );
  decipher.setAuthTag(Buffer.from(authTagValue, 'base64url'));

  return Buffer.concat([
    decipher.update(Buffer.from(encryptedValue, 'base64url')),
    decipher.final(),
  ]).toString('utf8');
}

export function verifyTotp(secret: string, code: string) {
  const normalized = normalizeCode(code);
  if (!/^\d{6}$/.test(normalized)) return null;

  const totp = createTotp('', secret);
  const delta = totp.validate({ token: normalized, window: 1 });
  if (delta === null) return null;

  return totp.counter() + delta;
}

export function generateRecoveryCodes(count = 8) {
  return Array.from({ length: count }, () => {
    const rawCode = Array.from(
      { length: 12 },
      () => recoveryAlphabet[randomInt(recoveryAlphabet.length)],
    ).join('');

    return rawCode.match(/.{1,4}/g)?.join('-') ?? rawCode;
  });
}

export function hashRecoveryCode(code: string) {
  return createHmac('sha256', getKeyMaterial())
    .update(normalizeCode(code))
    .digest('hex');
}

export function hashRecoveryCodes(codes: string[]) {
  return codes.map(hashRecoveryCode);
}

function recoveryCodeMatches(code: string, expectedHash: string) {
  const actual = Buffer.from(hashRecoveryCode(code), 'hex');
  const expected = Buffer.from(expectedHash, 'hex');

  return (
    actual.length === expected.length &&
    timingSafeEqual(actual, expected)
  );
}

export async function consumeSecondFactor(
  admin: AdminSecondFactor,
  code: string,
) {
  if (!admin.twoFactorSecret) return false;

  const secret = decryptTwoFactorSecret(admin.twoFactorSecret);
  const counter = verifyTotp(secret, code);

  if (counter !== null) {
    const result = await Admin.updateOne(
      {
        _id: admin._id,
        twoFactorEnabled: true,
        $or: [
          { twoFactorLastUsedCounter: { $lt: counter } },
          { twoFactorLastUsedCounter: { $exists: false } },
        ],
      },
      { $set: { twoFactorLastUsedCounter: counter } },
    );

    return result.modifiedCount === 1;
  }

  const matchingHash = admin.twoFactorRecoveryCodes?.find((hash) =>
    recoveryCodeMatches(code, hash),
  );
  if (!matchingHash) return false;

  const result = await Admin.updateOne(
    {
      _id: admin._id,
      twoFactorEnabled: true,
      twoFactorRecoveryCodes: matchingHash,
    },
    { $pull: { twoFactorRecoveryCodes: matchingHash } },
  );

  return result.modifiedCount === 1;
}
