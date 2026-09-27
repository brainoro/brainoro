import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'edge';

// Helper to verify HMAC SHA256 signature using Web Crypto API
async function verifyHmacSha256(data: string, signature: string, secret: string): Promise<boolean> {
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

    const mac = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
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
    const body = await request.json().catch(() => ({}));
    const {
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature,
      userId,
      email,
    } = body;

    const keySecret = process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_WEBHOOK_SECRET || '';

    // Verify signature if provided and secret exists
    if (keySecret && razorpay_payment_id && razorpay_subscription_id && razorpay_signature) {
      const payloadToSign = `${razorpay_payment_id}|${razorpay_subscription_id}`;
      const isValid = await verifyHmacSha256(payloadToSign, razorpay_signature, keySecret);
      
      if (!isValid) {
        console.warn('Razorpay subscription signature verification mismatch.');
      }
    }

    // Update user's profile in Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

    if (supabaseUrl && supabaseKey && (userId || email)) {
      const supabase = createClient(supabaseUrl, supabaseKey);

      let query = supabase.from('profiles').update({
        subscription_status: 'active',
        updated_at: new Date().toISOString(),
      });

      if (userId && userId !== 'anonymous') {
        query = query.eq('user_id', userId);
      } else if (email) {
        query = query.eq('email', email);
      }

      const { data, error: dbError } = await query.select();

      if (dbError) {
        console.error('Database update failed in verify-payment:', dbError);
        return NextResponse.json({ error: 'Failed to update subscription in database.' }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        message: 'Subscription activated successfully.',
        profile: data?.[0] || null,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Payment received.',
    });
  } catch (error: any) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { error: error?.message || 'Payment verification failed' },
      { status: 500 }
    );
  }
}
