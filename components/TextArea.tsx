"use client";

import React from "react";
import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface Props {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
  autoComplete?: string;
  value?: string;
}

const TextArea: React.FC<Props> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
  autoComplete,
  value,
}) => {
  return (
    <div className="mt-2 mb-4">
      <label htmlFor={id} className={"text-sm text-gray-900"}>
        {label}
      </label>
      <div className="mt-2">
        <textarea
          id={id}
          value={value}
          autoComplete={autoComplete}
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(
            `
                    form-input
                    w-full
                    rounded-md
                    border-0
                    ring-gray-300
                    ring-1
                    px-3
                    py-1
                    focus:outline-none 
                    focus:ring-gray-500`,
            errors[id] && "focus:ring-rose-500",
            disabled && "opacity-50 cursor-default"
          )}
        />
      </div>
    </div>
  );
};

export default TextArea;
