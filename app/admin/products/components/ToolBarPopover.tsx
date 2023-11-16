import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HiEllipsisVertical } from "react-icons/hi2";

interface props {
  children: React.ReactNode;
}

const ToolBarPopover: React.FC<props> = ({ children }) => {
  return (
    <Popover>
      <PopoverTrigger className="h-min">
        <HiEllipsisVertical />
      </PopoverTrigger>
      <PopoverContent>{children}</PopoverContent>
    </Popover>
  );
};

export default ToolBarPopover;
