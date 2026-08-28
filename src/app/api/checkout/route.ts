import crypto from "node:crypto";
import { NextResponse } from "next/server";
export async function POST(request: Request) { const body = await request.json(); if (!body.name || !body.email || !body.whatsapp || !body.amount) return NextResponse.json({ error: "Data belum lengkap" }, { status: 400 });
  if (!process.env.TRIPAY_API_KEY || !process.env.TRIPAY_PRIVATE_KEY) return NextResponse.json({ checkoutUrl: `/thank-you/?paket=${encodeURIComponent(body.plan)}`, demo: true });
  const merchantRef = `FP-${Date.now()}`;
  const payload = { method: process.env.TRIPAY_CHANNEL || "QRIS", merchant_ref: merchantRef, amount: Number(body.amount), customer_name: body.name, customer_email: body.email, customer_phone: body.whatsapp, order_items: [{ sku: body.plan, name: `FunnelPage ${body.plan}`, price: Number(body.amount), quantity: 1 }], callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/tripay/callback`, return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/thank-you/?paket=${encodeURIComponent(body.plan)}` };
  const signature = crypto.createHmac("sha256", process.env.TRIPAY_PRIVATE_KEY).update(`${process.env.TRIPAY_MERCHANT_CODE}${merchantRef}${body.amount}`).digest("hex");
  const response = await fetch(`${process.env.TRIPAY_MODE === "production" ? "https://tripay.co.id" : "https://tripay.co.id/api-sandbox"}/transaction/create`, { method: "POST", headers: { Authorization: `Bearer ${process.env.TRIPAY_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, signature }) });
  const result = await response.json();
  if (!response.ok || !result.success) return NextResponse.json({ error: result.message || "Tripay gagal membuat transaksi" }, { status: 502 });
  return NextResponse.json({ checkoutUrl: result.data.checkout_url, reference: result.data.reference });
}
