"use client";
import { useState } from "react";

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);

  const startPayment = async () => {
    setLoading(true);

    // 1. Create order from backend
    const orderRes = await fetch("/api/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: 500, // Rs. 500
        currency: "INR",
      }),
    });

    const order = await orderRes.json();
    setLoading(false);

    if (!order.id) {
      alert("Error creating order");
      return;
    }

    // 2. Open Razorpay Checkout
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Antim Seva",
      description: "Test Transaction",
      order_id: order.id,
      handler: async function (response) {
        // 3. Verify payment on backend
        const verifyRes = await fetch("/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        });

        const verifyData = await verifyRes.json();
        if (verifyData.success) {
          alert("Payment successful!");
        } else {
          alert("Payment verification failed!");
        }
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Test Payment</h1>
      <button
        onClick={startPayment}
        disabled={loading}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}
