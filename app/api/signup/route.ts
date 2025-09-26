// app/api/signup/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";   // adjust if your path differs
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, phone, location, farmerType } = body;

    const client = await clientPromise;
    const db = client.db("agroSikkim");

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      phone,
      location,
      farmerType,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
