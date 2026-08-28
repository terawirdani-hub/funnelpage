import crypto from "node:crypto";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-callback-signature") || "";
  const expected = process.env.TRIPAY_PRIVATE_KEY
    ? crypto.createHmac("sha256", process.env.TRIPAY_PRIVATE_KEY).update(rawBody).digest("hex")
    : "";

  if (!expected || signature.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return NextResponse.json({ success: false, message: "Signature tidak valid" }, { status: 403 });
  }

  const payload = JSON.parse(rawBody) as { status?: string; reference?: string; merchant_ref?: string };
  console.info("Tripay callback", payload.reference, payload.merchant_ref, payload.status);
  return NextResponse.json({ success: true });
}