"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import TextArea from "@/components/TextArea";
import Head from "next/head";
import React from "react";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const categories = ["phone", "laptop"];

const New = () => {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      price: "",
      description: "",
      isFeatured: false,
    },
  });

  const members = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await fetch("/api/products", { method: "GET" });
    const dataHndle = await res.json();
    console.log(dataHndle);
  };

  return (
    <>
      <Head>
        <title>New Product</title>
      </Head>

      <div className="w-4/5 mx-auto py-5">
        <p className="text-xl">New Product Details</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Enter Name"
            id="name"
            register={register}
            errors={errors}
          />
          <Input
            label="Enter Price"
            id="price"
            register={register}
            errors={errors}
          />
          <TextArea
            label="Enter brief description"
            id="description"
            register={register}
            errors={errors}
          />
          <div className="flex items-center gap-10 text-sm">
            <div className="grow">
              <Select
                label="Members"
                options={categories.map((user) => ({
                  value: user,
                  label: user,
                }))}
                onChange={(value) =>
                  setValue("members", value, {
                    shouldValidate: true,
                  })
                }
                value={members}
              />
            </div>

            <div className="flex items-center gap-5 text-sm">
              <p>Will this be featured</p>
              <Input
                type="checkbox"
                label=""
                id="isFeatured"
                register={register}
                errors={errors}
              />
            </div>
          </div>

          <Button type="submit" sticky>
            Create
          </Button>
        </form>
      </div>
    </>
  );
};

export default New;
