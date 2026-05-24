export const IMAGE_SOURCE_ERROR = 'Use a root-relative image path or an HTTPS image URL.';

function normalizeImageSource(src: unknown): string | null {
  if (typeof src !== 'string') return null;

  const value = src.trim();
  if (!value || /[\u0000-\u001F\u007F]/.test(value)) return null;

  if (value.startsWith('/') && !value.startsWith('//')) {
    return value;
  }

  try {
    const url = new URL(value);
    if (url.protocol === 'https:' && url.hostname) {
      return url.href;
    }
  } catch {
    return null;
  }

  return null;
}

export function isSafeImageSrc(src: unknown): src is string {
  return normalizeImageSource(src) !== null;
}

export function toSafeImageSrc(src: unknown, fallback = ''): string {
  return normalizeImageSource(src) ?? normalizeImageSource(fallback) ?? '';
}
