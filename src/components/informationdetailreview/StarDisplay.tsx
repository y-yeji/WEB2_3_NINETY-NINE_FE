import React from "react";
import Icon from "../../assets/icons/Icon";

interface StarDisplayProps {
  rating: number;
}

const StarDisplay: React.FC<StarDisplayProps> = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <Icon
        key={i}
        name="Star"
        className={`flex-grow-0 flex-shrink-0 w-[18px] h-[18px] ${i < rating ? "text-blue-1" : "text-blue-7"}`}
        fill={i < rating ? "currentColor" : "none"}
      />
    );
  }
  return <div className="flex gap-1.5">{stars}</div>;
};

export default StarDisplay;
