import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {
  try {
    const { id } = params;

    const products = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    return NextResponse.json(products);
  } catch (error: any) {
    console.log(error);
    return [];
  }
}

export async function PATCH(request: Request, { params }: any) {
  try {
    const { id } = params;
    const body = await request.json();

    const products = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name: body.name,
        price: body.price,
        description: body.description,
        isFeatured: body.isFeatured,
      },
    });
    return NextResponse.json(products);
  } catch (error: any) {
    console.log(error);
    return [];
  }
}

export async function DELETE(request: Request, { params }: any) {
  try {
    const { id } = params;

    const products = await prisma.product.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(products);
  } catch (error: any) {
    console.log(error);
    return [];
  }
}
