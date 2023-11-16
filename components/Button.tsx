"use client";

import React from "react";
import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
  sticky?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
  sticky,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        `
            flex
            justify-center
            rounded-md
            px-2
            py-1
            
        `,
        disabled && "opacity-50 cursor-wait",
        fullWidth && "w-full",
        secondary ? "text-gray-100 bg-slate-600" : "text-white",
        danger && "bg-rose-500 hover:bg-rose-600",

        !secondary && !danger && "bg-blue-500 hover:bg-blue-600"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
