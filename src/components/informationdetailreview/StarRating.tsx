import React, { useState } from "react";
import Icon from "../../assets/icons/Icon";

interface StarRatingProps {
  onChange?: (newRating: number) => void;
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ onChange, rating }) => {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  return (
    <div className="flex gap-1.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Icon
          key={star}
          name="Star"
          className={`w-[18px] h-[18px] cursor-pointer ${
            star <= (hoveredRating ?? rating) ? "text-blue-1" : "text-blue-7"
          }`}
          fill={star <= (hoveredRating ?? rating) ? "currentColor" : "none"}
          onMouseEnter={() => setHoveredRating(star)}
          onMouseLeave={() => setHoveredRating(null)}
          onClick={() => onChange && onChange(star)}
        />
      ))}
    </div>
  );
};

export default StarRating;
