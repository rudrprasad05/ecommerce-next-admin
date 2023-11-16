"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import TextArea from "@/components/TextArea";
import axios from "axios";
import router, { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import DeleteModal from "@/components/modals/DeleteModal";
import ImageModal from "@/components/modals/ImageModal";
import { CldUploadButton } from "next-cloudinary";
import XButton from "../components/XButton";
import { HiOutlineCloudArrowUp } from "react-icons/hi2";
import { Checkbox } from "@/components/ui/checkbox";
import EditPageNav from "../components/EditPageNav";

const categories = ["phone", "laptop"];

type PRODUCT = {
  id: string;
  name: string;
  price: string;
  description: string;
  isFeatured: boolean;
  images: string[];
};

const page = ({ params }: { params: { id: string } }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageList, setImageList] = useState<string[]>([]);
  const [isFeaturedLabel, setIsFeaturedLabel] = useState<boolean>(false);
  const [domLoaded, setdomLoaded] = useState<boolean>(false);

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
      setImageList(data.images);
      setIsFeaturedLabel(data.isFeatured);
      setdomLoaded(true);

      return {
        name: data.name || "",
        price: data.price || "",
        description: data.description || "",
        isFeatured: data.isFeatured,
      };
    },
  });

  const members = watch("members");

  const handleImageUpload = (event: any) => {
    const value = event?.info?.secure_url;

    setImageList((prev) => [...prev, value]);
  };

  const handleImageDelete = () => {
    console.log("first");
    setImageList((previousArr) => previousArr.slice(0, -1));
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    data.images = imageList;
    data.isFeatured = isFeaturedLabel;

    console.log(data);
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
      <EditPageNav onClick={handleSubmit(onSubmit)}>
        <DeleteModal
          name="Delete"
          description="Deleting this product will remove it from our servers"
          onClick={handleDelete}
        />
      </EditPageNav>

      <form className="w-4/5 mx-auto">
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
        <CldUploadButton
          onUpload={handleImageUpload}
          uploadPreset={"myuploads"}
          className="w-full"
        >
          <div className="flex flex-col items-center w-full rounded-md border-0 ring-gray-300 ring-1 px-3 py-1 text-sm`,">
            <p>Upload Images</p>
            <HiOutlineCloudArrowUp
              className={"text-blue-500 stroke-1"}
              size={30}
            />
          </div>
        </CldUploadButton>

        {imageList.length > 0 && (
          <div className="grid grid-cols-4 gap-2 py-5">
            {imageList &&
              imageList.map((image, index) => (
                <div
                  key={index}
                  className="col-span-1 aspect-square relative shadow-md rounded-sm"
                >
                  <img
                    src={image}
                    className="h-full w-full rounded-sm object-cover "
                  />

                  <div className="absolute top-[-10px] right-[-10px] bg-rose-400 rounded-full aspect-square">
                    <ImageModal img={image} onClick={handleImageDelete} />
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

          <div className="items-top flex items-center space-x-2">
            {domLoaded && (
              <Checkbox
                id="isFeatured"
                defaultChecked={isFeaturedLabel}
                onCheckedChange={() =>
                  setIsFeaturedLabel((prev) => {
                    if (prev) return false;
                    else return true;
                  })
                }
              />
            )}
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="isFeatured"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Add product to featured section?
              </label>
            </div>
          </div>
        </div>

        <div className="float bottom-10 flex gap-5">
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
