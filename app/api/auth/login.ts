import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users } from "./users";

const SECRET = "your_secret_key";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = users.find((u) => u.email === email);
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 400 });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return NextResponse.json({ error: "Invalid password" }, { status: 400 });

  const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });

  return NextResponse.json({ token });
}
