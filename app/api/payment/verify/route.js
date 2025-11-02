import crypto from "crypto";

export async function POST(req) {
  try {
    const { order_id, payment_id, signature } = await req.json();

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(order_id + "|" + payment_id)
      .digest("hex");

    if (expectedSignature === signature) {
      return new Response(JSON.stringify({ status: "Payment Successful" }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ status: "Payment Verification Failed" }), { status: 400 });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
