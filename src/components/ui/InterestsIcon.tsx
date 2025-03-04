import React from "react";

interface InterestsIconProps {
  name: string;
  isActive?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  as?: "div" | "button";
}

const InterestsIcon = ({
  name,
  isActive = false,
  onClick,
  disabled = false,
  as = "button", // 기본값 button
}: InterestsIconProps) => {
  const Component = as === "button" ? "button" : "div"; // 조건에 따라 컴포넌트 결정

  const colorMapping: { [key: string]: string } = {
    "팝업 스토어": "#f28c50",
    전시회: "#6d8294",
    뮤지컬: "#a370d8",
    연극: "#ebcb3d",
    페스티벌: "#4dbd79",
    콘서트: "#5e7fe2",
  };

  const color = colorMapping[name] || "#000"; // 매핑된 색상 또는 기본 색상

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
