import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/mongodb";
import { cookies } from "next/headers";

const SECRET = process.env.JWT_SECRET || "default_secret";

export async function POST(req: Request) {
  await connectToDatabase();
  const { email, password, action } = await req.json();

  if (action === "register") {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    return NextResponse.json({ message: "User registered successfully" });
  }

  if (action === "login") {
    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 400 });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });

    const token = jwt.sign({ email, userId: user._id }, SECRET, {
      expiresIn: "1h",
    });

    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60,
    });

    return NextResponse.json({ message: "Login successful" });
  }

  return NextResponse.json({ error: "Invalid request" }, { status: 400 });
}
