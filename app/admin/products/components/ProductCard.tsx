import Button from "@/components/Button";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { FullProductType } from "@/types";
import EditButton from "./EditButton";
import ToolBarPopover from "./ToolBarPopover";

interface props {
  product: FullProductType;
}

{
  /* <Link href={`/admin/products/${product.id}`}>Update</Link> */
}

const ProductCard: React.FC<props> = ({ product }) => {
  return (
    <div className="col-span-1 flex">
      <div className="h-32 aspect-square">
        <img
          className="h-full w-full object-cover"
          src={product.images[0]}
          alt="img"
        />
      </div>
      <div className="grow">
        <p>{product.name}</p>
      </div>
      <ToolBarPopover>
        <Link href={`/admin/products/${product.id}`}>
          <div className="flex">
            <span className="grow">Edit</span>
            <span>
              <EditButton to={`${product.id}`} />
            </span>
          </div>
        </Link>
      </ToolBarPopover>
    </div>
  );
};

export default ProductCard;
