import Button from "@/components/Button";
import Link from "next/link";
import React from "react";

interface props {
  product: any;
}

const ProductCard: React.FC<props> = ({ product }) => {
  return (
    <>
      <div>
        <h1>{product.name}</h1>
        {product.id}
      </div>
      <div>
        <Link href={`/admin/products/${product.id}`}>Update</Link>
      </div>
    </>
  );
};

export default ProductCard;
