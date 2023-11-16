import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Button from "../Button";

import { HiMiniXMark } from "react-icons/hi2";

interface props {
  name?: string;
  img?: string;
  onClick?: () => void;
}

const ImageModal: React.FC<props> = ({ name, img, onClick }) => {
  return (
    <Dialog>
      <DialogTrigger className="text-black p-1">
        <HiMiniXMark size={20} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Image Preview</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <img src={img} alt="" />
        </DialogDescription>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <div className="flex gap-5">
              <Button type="button" secondary>
                Close
              </Button>
              <Button type="button" danger onClick={onClick}>
                Delete
              </Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
