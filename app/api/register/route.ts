import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    if (!email || !password || !email) {
      return new NextResponse("Missing Info", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword,
        name,
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    console.log(error, "REGISTRATION ERROR");
    return new NextResponse("internal error", { status: 500 });
  }
}