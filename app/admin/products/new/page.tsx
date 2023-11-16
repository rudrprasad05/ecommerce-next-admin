"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import TextArea from "@/components/TextArea";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { CldUploadButton } from "next-cloudinary";

import React, { useEffect, useState } from "react";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ImagePreview from "../components/ImagePreview";
import XButton from "../components/XButton";
import { HiOutlineCloudArrowUp } from "react-icons/hi2";
import { Checkbox } from "@/components/ui/checkbox";
import { FullProductType } from "@/types";
import EditPageNav from "../components/EditPageNav";

const categories = ["phone", "laptop"];

const New = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageList, setImageList] = useState<string[]>([]);
  const [isFeaturedLabel, setIsFeaturedLabel] = useState<boolean>(false);
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const handleImageDelete = async (img: any) => {};

  const handleImageUpload = (event: any) => {
    const value = event?.info?.secure_url;

    setImageList((prev) => [...prev, value]);
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
      isFeatured: isFeaturedLabel,
    },
  });

  const members = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    data.images = imageList;
    data.isFeatured = isFeaturedLabel;

    axios
      .post("/api/products", data)
      .catch(() => {
        toast.error("Something went wrong");
      })
      .then((res) => {
        if (res) {
          console.log(res);
          toast.success("Product Created");
          router.back();
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <EditPageNav newProduct onClick={handleSubmit(onSubmit)} />

      <div className="w-4/5 mx-auto py-5">
        <p className="text-xl">New Product Details</p>

        <form>
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
          <div className="w-full">
            <CldUploadButton
              onUpload={handleImageUpload}
              uploadPreset={"myuploads"}
              className="w-full"
            >
              <div className="flex flex-col text-sm items-center w-full rounded-md border-0 ring-gray-300 ring-1 px-3 py-1 text-sm`,">
                <p>Upload Images</p>
                <HiOutlineCloudArrowUp
                  className={"text-blue-500 stroke-1"}
                  size={30}
                />
              </div>
            </CldUploadButton>
          </div>

          {imageList.length > 0 && (
            <div className="grid grid-cols-4 gap-2 py-5">
              {imageList &&
                imageList.map((image, index) => (
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
          )}

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
          </div>

          <div className="items-top flex items-center space-x-2 my-5">
            <Checkbox
              id="isFeatured"
              onCheckedChange={() =>
                setIsFeaturedLabel((prev) => {
                  if (prev) return false;
                  else return true;
                })
              }
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="isFeatured"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Add product to featured section?
              </label>
            </div>
          </div>

          {/* <div className="absolute bottom-5 flex gap-5">
            <Button type="submit" disabled={isLoading}>
              Create
            </Button>
            <Button type="button" danger onClick={goBack}>
              Cancel
            </Button>
          </div> */}
        </form>
      </div>
    </>
  );
};

export default New;
