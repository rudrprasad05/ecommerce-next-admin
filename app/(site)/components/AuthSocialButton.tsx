import React from "react";
import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex w-full justify-center rounded-md bg-secondary-bg shadow-sm px-4 py-2 ring-1 ring-inset ring-gray-300 transition hover:bg-gray-500"
    >
      <Icon />
    </button>
  );
};

export default AuthSocialButton;
