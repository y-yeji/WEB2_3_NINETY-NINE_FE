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

  // 문자열 템플릿 대신 객체 형태로 스타일 정의
  const getStyles = () => {
    let classes =
      "px-4 h-7 rounded-[140px] body-small-b text-center flex items-center justify-center ";

    // 조건에 따른 배경색 및 텍스트 색상 추가
    if (isActive || as === "div") {
      classes += `bg-[${color}] text-white`;
    } else if (disabled) {
      classes += `bg-[${color}]/50 text-[${color}] cursor-not-allowed`;
    } else {
      classes += `bg-[${color}]/50 text-[${color}] cursor-pointer`;
    }

    return classes;
  };

  const buttonProps = as === "button" ? { onClick, disabled } : {};

  return React.createElement(
    Component,
    {
      className: getStyles(),
      style: {
        backgroundColor: isActive || as === "div" ? color : `${color}80`,
        color: isActive || as === "div" ? "white" : color,
      },
      ...buttonProps,
    },
    name
  );
};

export default InterestsIcon;
