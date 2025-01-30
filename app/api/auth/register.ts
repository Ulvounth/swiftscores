import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { users } from "./users";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (users.find((user) => user.email === email)) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });

  return NextResponse.json({ message: "User registered successfully" });
}
