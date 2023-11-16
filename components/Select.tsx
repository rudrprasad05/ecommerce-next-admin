"use client";

import React from "react";
import ReactSelect from "react-select";

interface props {
  label: string;
  value?: Record<string, any>;
  disabled?: boolean;
  onChange: (value: Record<string, any>) => void;
  options: Record<string, any>[];
}

const Select: React.FC<props> = ({
  label,
  value,
  disabled,
  onChange,
  options,
}) => {
  return (
    <div>
      <label htmlFor="" className="text-sm">
        {label}
      </label>
      <div className="mt-2 bg-background">
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          isMulti
          options={options}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999,
              background: "black",
            }),
          }}
          classNames={{
            control: () => "text-sm",
          }}
        />
      </div>
    </div>
  );
};

export default Select;
