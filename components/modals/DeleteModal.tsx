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

interface props {
  name?: string;
  description?: string;
  onClick?: () => void;
}

const DeleteModal: React.FC<props> = ({ name, description, onClick }) => {
  return (
    <Dialog>
      <DialogTrigger className="bg-rose-500 hover:bg-rose-600 text-white flex justify-center rounded-md px-2 py-1">
        {name}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
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

export default DeleteModal;
