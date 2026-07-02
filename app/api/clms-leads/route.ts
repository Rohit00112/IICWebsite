import { NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit } from '../../../lib/rate-limit';

const DEFAULT_CLMS_API_URL = 'https://api.ingclms.com/api/v2/raw-website-lead-management/sync-lead';

const leadSchema = z.object({
  name: z.string().trim().min(2).max(160),
  email: z.string().trim().toLowerCase().email().max(254),
  phone_number: z.string().trim().min(7).max(20).regex(/^\+?\d+$/),
  address: z.string().trim().min(2).max(250),
  course: z.string().trim().min(1).max(160),
  type: z.enum(['contact', 'apply']),
  message: z.string().trim().min(1).max(1000),
});

const leadRequestSchema = z.union([
  leadSchema,
  z.object({
    data: z.array(leadSchema).min(1).max(5),
  }),
]);

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'anonymous';
  const { success } = await rateLimit(`clms-lead-${ip}`, 10, 60 * 1000);

  if (!success) {
    return NextResponse.json(
      { error: 'Too many submissions. Please try again in a minute.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = leadRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: 'Please check the form fields and try again.',
        details: parsed.error.issues.map(issue => ({
          path: issue.path,
          message: issue.message,
        })),
      },
      { status: 400 }
    );
  }

  const clmsTenant = process.env.CLMS_TENANT;
  const clmsPrivateKey = process.env.CLMS_PRIVATE_KEY;

  if (!clmsTenant || !clmsPrivateKey) {
    console.error('[clms-leads] Missing CLMS_TENANT or CLMS_PRIVATE_KEY');
    return NextResponse.json(
      { error: 'Lead submission is not configured yet.' },
      { status: 500 }
    );
  }

  const leads = 'data' in parsed.data ? parsed.data.data : [parsed.data];

  try {
    const response = await fetch(process.env.CLMS_API_URL || DEFAULT_CLMS_API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-tenant': clmsTenant,
        'private-key': clmsPrivateKey,
      },
      body: JSON.stringify({ data: leads }),
      cache: 'no-store',
    });

    const responseText = await response.text();

    if (!response.ok) {
      console.error('[clms-leads] CLMS sync failed', {
        status: response.status,
        body: responseText.slice(0, 500),
      });

      return NextResponse.json(
        { error: 'Could not submit your details right now. Please try again.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ message: 'Submitted successfully.' }, { status: 201 });
  } catch (error) {
    console.error('[clms-leads] CLMS request failed', error);
    return NextResponse.json(
      { error: 'Could not submit your details right now. Please try again.' },
      { status: 502 }
    );
  }
}
