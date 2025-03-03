import React from "react";

interface InterestsIconProps {
  name: string;
  isActive?: boolean;
  color: string;
  onClick?: () => void;
  disabled?: boolean;
  as?: "div" | "button";
}

const InterestsIcon = ({
  name,
  isActive = false,
  color,
  onClick,
  disabled = false,
  as = "button", // 기본값 button
}: InterestsIconProps) => {
  const Component = as === "button" ? "button" : "div"; // 조건에 따라 컴포넌트 결정

  const commonProps = {
    className: `px-4 h-7 rounded-[140px] body-small-b text-center flex items-center justify-center ${
      isActive || as === "div"
        ? `bg-[${color}] text-white`
        : disabled
          ? `bg-[${color}]/50 text-[${color}] cursor-not-allowed`
          : `bg-[${color}]/50 text-[${color}] cursor-pointer`
    }`,
  };

  const buttonProps = as === "button" ? { onClick, disabled } : {};

  return React.createElement(
    Component,
    { ...commonProps, ...buttonProps },
    name
  );
};

export default InterestsIcon;
