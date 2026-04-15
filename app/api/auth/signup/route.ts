import { NextResponse } from "next/server";
import { prisma } from "@/lib/server/prisma";
import { hashPassword, generateToken } from "@/lib/server/auth";
import { signupSchema } from "@/lib/server/validation/schemas";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = signupSchema.parse(body);

    const existing = await prisma.user.findUnique({
      where: { email: parsed.email },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(parsed.password);

    const user = await prisma.user.create({
      data: {
        email: parsed.email,
        password: hashedPassword,
        firstName: parsed.firstName,
        lastName: parsed.lastName,
        role: parsed.role,
      },
    });

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      },
      { status: 201 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}