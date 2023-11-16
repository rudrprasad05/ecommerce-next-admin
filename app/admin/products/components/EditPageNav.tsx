import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import React from "react";
import { HiArrowLeft } from "react-icons/hi2";

interface props {
  onClick: () => void;
  newProduct?: boolean;
  children?: React.ReactNode;
}

const EditPageNav: React.FC<props> = ({ onClick, newProduct, children }) => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <nav className="sticky top-0 bg-white shadow-sm">
      <div className="flex py-5 items-center w-4/5 mx-auto">
        <Button secondary onClick={handleBack}>
          <div className="flex items-center gap-3">
            <span>
              <HiArrowLeft size={20} />
            </span>
            <span>Back</span>
          </div>
        </Button>
        <div className="ml-auto flex gap-3">
          <Button type="button" onClick={onClick}>
            Save
          </Button>
          {newProduct ? (
            <Button type="button" danger>
              Delete
            </Button>
          ) : (
            <div>{children}</div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default EditPageNav;
