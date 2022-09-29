import React from "react";
interface buttonProps {
  disabled?: boolean;
  title: string | JSX.Element | JSX.Element[];
  type?: keyof typeof buttonTypeMap;
  size?: keyof typeof buttonSizeMap;
  onClick?: () => void;
}

const Button = ({
  disabled = false,
  title,
  type = "primary",
  onClick = () => {},
  size = "medium",
}: buttonProps) => {
  const clickHandler = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <button
      className={`rounded-lg font-medium h-9 ${buttonSizeMap[size]} ${
        disabled
          ? `cursor-not-allowed bg-neutrals-100 text-blue-900`
          : `${buttonTypeMap[type]}`
      }`}
      onClick={() => clickHandler()}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

const buttonSizeMap = {
  large: "w-44",
  medium: "w-32",
};

const buttonTypeMap = {
  primary: "bg-blue-900 text-white",
  danger: "bg-red-100 text-white",
};

export default Button;
export { Button };
