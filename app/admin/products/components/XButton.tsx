import Button from "@/components/Button";
import React from "react";
import { MdDeleteOutline } from "react-icons/md";

interface props {
  onClick?: () => void;
  classes?: string;
}

const XButton: React.FC<props> = ({ onClick }) => {
  return (
    <button type="button" className="stroke text-rose-500" onClick={onClick}>
      <MdDeleteOutline size={25} />
    </button>
  );
};

export default XButton;
