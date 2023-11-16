import Button from "@/components/Button";
import React from "react";
import { HiXMark } from "react-icons/hi2";

interface props {
  onClick?: () => void;
  classes?: string;
}

const XButton: React.FC<props> = ({ onClick }) => {
  return (
    <button
      type="button"
      className="bg-rose-400 text-white hover:bg-rose-500 w-8 h-8 flex items-center justify-center"
      onClick={onClick}
    >
      <HiXMark />
    </button>
  );
};

export default XButton;
