import prisma from "@/app/libs/prismadb";
import React from "react";

const getProduct = async (id: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });
    return product;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default getProduct;
