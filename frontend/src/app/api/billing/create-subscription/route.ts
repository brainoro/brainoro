import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const planId = process.env.RAZORPAY_PLAN_ID || 'plan_TgludFk9592YRi';

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: 'Razorpay API keys are not configured in environment variables.' },
        { status: 500 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { userId, email, totalCount = 12 } = body;

    // Razorpay Subscriptions API endpoint
    const credentials = btoa(`${keyId}:${keySecret}`);
    const response = await fetch('https://api.razorpay.com/v1/subscriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        plan_id: planId,
        total_count: totalCount,
        quantity: 1,
        customer_notify: 1,
        notes: {
          user_id: userId || 'anonymous',
          email: email || '',
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Razorpay API error:', data);
      return NextResponse.json(
        { error: data?.error?.description || 'Failed to create subscription with Razorpay.' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      subscription_id: data.id,
      key_id: keyId,
      plan_id: planId,
      status: data.status,
    });
  } catch (error: any) {
    console.error('Error creating Razorpay subscription:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal server error while initiating subscription.' },
      { status: 500 }
    );
  }
}
