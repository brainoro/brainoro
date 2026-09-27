import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'edge';

// Helper to verify HMAC SHA256 signature using Web Crypto API
async function verifySignature(bodyText: string, signature: string, secret: string): Promise<boolean> {
  try {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const key = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const mac = await crypto.subtle.sign('HMAC', key, encoder.encode(bodyText));
    const hashArray = Array.from(new Uint8Array(mac));
    const expectedSignature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return expectedSignature.toLowerCase() === signature.toLowerCase();
  } catch (err) {
    console.error('Signature verification error:', err);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || process.env.RAZORPAY_KEY_SECRET || '';
    const signature = request.headers.get('x-razorpay-signature') || '';

    const bodyText = await request.text();

    if (webhookSecret && signature) {
      const isValid = await verifySignature(bodyText, signature, webhookSecret);
      if (!isValid) {
        return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
      }
    }

    const payload = JSON.parse(bodyText);
    const event = payload?.event;

    // Handle subscription events
    if (
      event === 'subscription.authenticated' ||
      event === 'subscription.charged' ||
      event === 'subscription.activated' ||
      event === 'payment.captured' ||
      event === 'invoice.paid'
    ) {
      const subscriptionEntity = payload?.payload?.subscription?.entity;
      const paymentEntity = payload?.payload?.payment?.entity;
      
      const userId =
        subscriptionEntity?.notes?.user_id ||
        paymentEntity?.notes?.user_id ||
        null;
      
      const userEmail =
        subscriptionEntity?.notes?.email ||
        paymentEntity?.email ||
        null;

      if (userId || userEmail) {
        const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
        const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?/, '').replace(/\/+$/, '');
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
        
        if (supabaseUrl && supabaseKey) {
          const supabase = createClient(supabaseUrl, supabaseKey);

          let query = supabase.from('profiles').update({
            subscription_status: 'active',
            updated_at: new Date().toISOString(),
          });

          if (userId && userId !== 'anonymous') {
            query = query.eq('user_id', userId);
          } else if (userEmail) {
            query = query.eq('email', userEmail);
          }

          const { error: dbError } = await query;
          if (dbError) {
            console.error('Failed to update user subscription status in Supabase:', dbError);
          }
        }
      }
    }

    return NextResponse.json({ status: 'ok', received: true });
  } catch (error: any) {
    console.error('Razorpay webhook processing error:', error);
    return NextResponse.json({ error: error?.message || 'Webhook processing failed' }, { status: 500 });
  }
}
