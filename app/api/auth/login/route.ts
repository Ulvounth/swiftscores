import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/mongodb";
import { cookies } from "next/headers";

const SECRET = process.env.JWT_SECRET || "default_secret";

export async function POST(req: Request) {
  await connectToDatabase();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 400 });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return NextResponse.json({ error: "Invalid password" }, { status: 400 });

  const token = jwt.sign({ email, userId: user._id }, SECRET, {
    expiresIn: "1h",
  });

  // ✅ Securely store JWT in HTTP-only, SameSite=Strict cookies
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // 🛑 Prevents CSRF attacks
    maxAge: 60 * 60, // 1 hour
  });

  return NextResponse.json({ message: "Login successful" });
}
