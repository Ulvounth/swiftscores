import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET = process.env.JWT_SECRET || "default_secret";

export async function GET() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return NextResponse.json({ loggedIn: false }, { status: 200 }); // ✅ Prevents 401 errors
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    return NextResponse.json({ loggedIn: true, user: decoded });
  } catch {
    return NextResponse.json({ loggedIn: false }, { status: 200 });
  }
}
