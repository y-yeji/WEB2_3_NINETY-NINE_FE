import { useNavigate, useLocation } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import { useAuthStore } from "../../stores/authStore";
import { useModalStore } from "../../stores/modalStore";
import { useBookmarkState } from "../../hooks/useBookmarkState";

interface InformationCardProps {
  id: number;
  imageUrl: string;
  title: string;
  date: string;
  location: string;
  isBookmarked: boolean;
  onBookmarkChange?: (id: number, newStatus: boolean) => void;
  category: string; // Add category prop
}

function InformationCard({
  id,
  imageUrl,
  title,
  date,
  location,
  isBookmarked,
  onBookmarkChange,
  category, // Receive category prop
}: InformationCardProps) {
  const navigate = useNavigate();
  const location_path = useLocation();
  const { isLoggedIn, checkAuth } = useAuthStore();
  const { openModal } = useModalStore();

  // Determine the API category based on current path or passed category
  const getApiCategory = () => {
    // If category is explicitly provided, use it
    if (category) return category;

    // Otherwise, extract from the current path
    const pathSegments = location_path.pathname.split("/");
    const currentCategory =
      pathSegments[pathSegments.indexOf("informations") + 1];

    // Map UI category to API endpoint category
    const categoryMapping: { [key: string]: string } = {
      popups: "popupstores",
      exhibition: "exhibits",
      musical: "performances",
      concert: "festivals",
    };

    return categoryMapping[currentCategory] || currentCategory;
  };

  // Use the custom hook instead of local state
  const {
    isBookmarked: bookmarked,
    toggleBookmark: handleToggleBookmark,
    isLoading,
  } = useBookmarkState(id, isBookmarked);

  const handleClick = () => {
    const apiCategory = getApiCategory();
    navigate(`/informations/${apiCategory}/${id}`);
  };

  const toggleBookmark = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event

    // Check authentication
    await checkAuth();
    if (!isLoggedIn) {
      openModal(
        "로그인이 필요한 서비스입니다.\n 로그인 하러 가시겠어요?",
        "취소하기",
        "로그인하기",
        () => navigate("/login")
      );
      return;
    }

    const result = await handleToggleBookmark();

    // Notify parent component of the change
    if (result.success && onBookmarkChange) {
      onBookmarkChange(id, result.newBookmarkStatus);
    }
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
        onError={(e) => {
          // Replace with default image if loading fails
          e.currentTarget.src = "/default-image.png";
        }}
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
          <button onClick={toggleBookmark} disabled={isLoading}>
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
