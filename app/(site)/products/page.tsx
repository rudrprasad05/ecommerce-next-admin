import Button from "@/components/Button";
import Head from "next/head";
import Link from "next/link";
import React from "react";

const index = () => {
  return (
    <div>
      <Head>
        <title>Products</title>
      </Head>
      <Link href={"/products/new"}>
        <Button>New</Button>
      </Link>
    </div>
  );
};

export default index;
