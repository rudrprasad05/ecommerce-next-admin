"use client";

import Button from "@/components/Button";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ProductCard from "./components/ProductCard";
import { HiMiniPlus } from "react-icons/hi2";
import TooltipMain from "@/components/Tooltip";
import { Skeleton } from "@/components/ui/skeleton";

const index = () => {
  const [productsList, setproductsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const getProducts = async () => {
      axios
        .get(`/api/products`)
        .then((res) => {
          setproductsList(res.data);
        })
        .catch(() => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    getProducts();
  }, []);

  return (
    <div className="px-10 py-5 bg-secondary-bg">
      <Head>
        <title>Products</title>
      </Head>
      <div className="absolute bottom-10 right-10">
        <TooltipMain hint={"Add New Product"}>
          <Link href={"/admin/products/new"}>
            <div className=" text-white border bg-green-500 shadow-sm rounded-md p-2">
              <HiMiniPlus size={30} />
            </div>
          </Link>
        </TooltipMain>
      </div>

      <main>
        <div className="grid grid-cols-2 gap-3">
          {!isLoading
            ? productsList?.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))
            : [1, 2, 3, 4].map((item, index) => (
                <Skeleton key={index} className="w-full h-12 rounded-md" />
              ))}
        </div>
      </main>
    </div>
  );
};

export default index;
