'use client';

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutButton() {
  const handleCheckout = async () => {
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: [
          { name: 'Test Product', price: 20, quantity: 1 },
        ],
      }),
    });

    const { id } = await res.json();

    const stripe = await stripePromise;
    stripe?.redirectToCheckout({ sessionId: id });
  };

  return (
    <button
      onClick={handleCheckout}
      style={{
        padding: '10px 20px',
        backgroundColor: 'black',
        color: 'white',
        borderRadius: '5px'
      }}
    >
      Checkout
    </button>
  );
}
