import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, price, description, isFeatured, images } = body;

    const product = await prisma.product.create({
      data: {
        name,
        price,
        images,
        description,
        isFeatured,
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    console.log(error, "Product Creation Error");
    return new NextResponse("internal error", { status: 500 });
  }
}

export async function GET(request: Request, params: any) {
  console.log(params.id);
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(products);
  } catch (error: any) {
    console.log(error);
    return [];
  }
}
