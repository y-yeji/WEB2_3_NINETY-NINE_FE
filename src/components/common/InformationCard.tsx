import { useNavigate } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import { useState } from "react";

interface InformationCardProps {
  imageUrl?: string;
  title?: string;
  date?: string;
  location?: string;
  isBookmarked?: boolean;
}

function InformationCard({
  imageUrl = "/info-image.png",
  title = "케르종 X 비클린 팝업스토어",
  date = "2025.02.14 - 2025.06.30",
  location = "경기 성남시",
  isBookmarked = false,
}: InformationCardProps) {
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  const handleClick = () => {
    navigate("/infocard/detail/:eventId");
  };

  const toggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the card click event
    setBookmarked((prev) => !prev);
  };

  return (
    <div
      className="w-[300px] h-[300px] relative overflow-hidden rounded-[10px] bg-white cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full absolute left-0 top-0 object-cover"
      />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 bottom-0 w-full h-full info-postcard-shadow"></div>
      </div>
      <div className="w-[268px] h-[268px] absolute left-4 top-4">
        <div className="flex justify-between items-start w-full absolute left-0 top-[203px]">
          <div>
            <p className="body-normal-b text-white line-clamp-1">{title}</p>

            <div className="flex items-center w-full mt-1">
              <Icon
                name="CalendarRange"
                size={14}
                strokeWidth={1.5}
                className="text-white"
              />
              <p className="caption-r text-white ml-1">{date}</p>
            </div>
            <div className="flex items-center mt-1">
              <Icon
                name="MapPin"
                size={14}
                strokeWidth={1.5}
                className="text-white"
              />
              <p className="caption-r text-white ml-1">{location}</p>
            </div>
          </div>
          <button onClick={toggleBookmark}>
            <Icon
              name="Bookmark"
              size={24}
              strokeWidth={1}
              fill={bookmarked ? "white" : "none"}
              className="text-white ml-1"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default InformationCard;
