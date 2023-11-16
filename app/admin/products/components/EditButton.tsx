import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { HiOutlinePencil } from "react-icons/hi2";

const EditButton = ({ to }: any) => {
  return (
    <Link href={`/admin/products/${to}`}>
      <div>
        <HiOutlinePencil />
      </div>
    </Link>
  );
};

export default EditButton;
