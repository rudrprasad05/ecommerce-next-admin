import { Prisma } from "@prisma/client";
import prisma from "../../libs/prismadb";

export const POST = async (req: any) => {
  try {
    const body = await req.json();
    const { name, price, description, isFeatured } = body;

    const newPost = await prisma.post.create({
      data: {
        name,
        price,
        description,
        isFeatured,
      },
    });
  } catch (errors: any) {
    console.log(errors);
  }
};
