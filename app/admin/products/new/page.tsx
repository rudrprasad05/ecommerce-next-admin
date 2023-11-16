"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import TextArea from "@/components/TextArea";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ImagePreview from "../components/ImagePreview";
import XButton from "../components/XButton";

const categories = ["phone", "laptop"];

const New = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageList, setImageList] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const uploadImageToCloudniary = async (e: any) => {
    const files = e.files;

    if (files?.length > 0) {
      const data = new FormData();

      for (const file of files) {
        data.append("file", file);
      }

      data.append("upload_preset", "myuploads");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dlio3oanz/image/upload",
        {
          method: "POST",
          body: data,
        }
      ).then((r) => r.json());

      setImageUrl((prev) => [...prev, res.secure_url]);
    }
  };

  const handleImageDelete = async (img: any) => {};

  const handleImageUpload = (event: any) => {
    const imageUrl: string = event.files[0].name;
    setImageList((prev) => [...prev, imageUrl]);
    uploadImageToCloudniary(event);
  };

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
      images: [],
      isFeatured: false,
    },
  });

  const members = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    data.images = imageList;

    axios
      .post("/api/products", data)
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
        toast.success("Product Created");
        router.back();
      });
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
            required
          />
          <Input
            label="Enter Price"
            id="price"
            register={register}
            errors={errors}
            required
          />
          <input
            type="file"
            onChange={(event) => handleImageUpload(event.target)}
          />

          <div className="grid grid-cols-4 gap-2 py-5">
            {imageUrl &&
              imageUrl.map((image, index) => (
                <div
                  key={index}
                  className="col-span-1 h-24 relative shadow-md overflow-clip rounded-sm"
                >
                  <img src={image} className="h-full w-full object-cover " />
                  <div className="absolute top-0 right-0">
                    <XButton onClick={() => handleImageDelete(image)} />
                  </div>
                </div>
              ))}
          </div>

          <TextArea
            label="Enter brief description"
            id="description"
            register={register}
            errors={errors}
            required
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

          <div className="absolute bottom-5 flex gap-5">
            <Button type="submit" disabled={isLoading}>
              Create
            </Button>
            <Button type="button" danger onClick={goBack}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default New;
