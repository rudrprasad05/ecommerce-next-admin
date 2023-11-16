"use client";

import getProduct from "@/app/actions/getProduct";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import TextArea from "@/components/TextArea";
import axios from "axios";
import router, { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import prisma from "@/app/libs/prismadb";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Link from "next/link";
import DeleteModal from "@/components/modals/DeleteModal";

const categories = ["phone", "laptop"];

type PRODUCT = {
  id: string;
  name: string;
  price: string;
  description: string;
  isFeatured: boolean;
};

const page = ({ params }: { params: { id: string } }) => {
  const [isLoading, setIsLoading] = useState(false);

  const id = params.id;
  const router = useRouter();

  const handleDelete = () => {
    console.log("dell");
    axios
      .delete<PRODUCT>(`/api/products/${id}`)
      .then((res) => {
        if (res.status == 200) toast.success("Product Deleted");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
        router.back();
      });
  };

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: async () => {
      const res = await axios.get<PRODUCT>(`/api/products/${id}`, { params });
      const data = res.data;
      console.log(data);
      return {
        name: data.name || "",
        price: data.price || "",
        description: data.description || "",
        isFeatured: data.isFeatured || "",
      };
    },
  });
  const members = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    axios
      .patch<PRODUCT>(`/api/products/${id}`, data)
      .then((res) => {
        if (res.status == 200) toast.success("Product Edited");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
        router.back();
      });
  };
  return (
    <div>
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

        <div className="absolute bottom-10 flex gap-5">
          <Button type="submit">Update</Button>

          <DeleteModal
            name="Delete"
            description="Deleting this product will remove it from our servers"
            onClick={handleDelete}
          />
        </div>
      </form>
    </div>
  );
};

export default page;
