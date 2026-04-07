import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { amount } = await req.json();

    if (!amount || isNaN(amount)) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json({ error: "Payment gateway not configured" }, { status: 500 });
    }

    // Create order via Razorpay REST API
    const orderData = {
      amount: Math.round(amount * 100), // paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: { source: "relaxin-spa-booking" },
    };

    const credentials = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Razorpay order creation failed:", error);
      return NextResponse.json({ error: "Failed to create payment order" }, { status: 500 });
    }

    const order = await response.json();

    return NextResponse.json({
      orderId: order.id,
      currency: order.currency,
      amount: order.amount,
      key: keyId,
    });
  } catch (err) {
    console.error("Create order error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
