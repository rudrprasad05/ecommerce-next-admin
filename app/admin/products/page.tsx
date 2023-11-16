"use client";

import Button from "@/components/Button";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ProductCard from "./components/ProductCard";

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
      <Link href={"/admin/products/new"}>
        <Button>New</Button>
      </Link>

      <main>
        {productsList &&
          productsList?.map((product, index) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </main>
    </div>
  );
};

export default index;
