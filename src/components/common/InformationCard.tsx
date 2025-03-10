import { useNavigate } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import { useAuthStore } from "../../stores/authStore";
import { useModalStore } from "../../stores/modalStore";
import { useBookmarkState } from "../../hooks/useBookmarkState";
import { useCategoryMapper } from "../../hooks/useInfoCardMapper";
import { useTitleFormatter } from "../../hooks/usePopupTitleFormatter";
import { useDateFormatter } from "../../hooks/useInformationDateFormatter"; // 새로 추가한 훅 임포트

interface InformationCardProps {
  id: number;
  date?: string; // date 대신 startDate와 endDate로 변경
  imageUrl: string;
  title: string;
  startDate?: string; // date 대신 startDate와 endDate로 변경
  endDate?: string;
  location: string;
  isBookmarked: boolean;
  onBookmarkChange?: (id: number, newStatus: boolean) => void;
  category: string;
}

function InformationCard({
  id,
  imageUrl,
  title,
  startDate, // 변경된 props
  endDate,
  location,
  isBookmarked,
  onBookmarkChange,
  category,
}: InformationCardProps) {
  const navigate = useNavigate();
  const { isLoggedIn, checkAuth } = useAuthStore();
  const { openModal } = useModalStore();
  const { mapToApiCategory } = useCategoryMapper();
  const { formatTitle } = useTitleFormatter();
  const { formatDatePeriod } = useDateFormatter(); // 새로 추가한 훅 사용

  // 카테고리에 따라 제목 포맷팅
  const formattedTitle = formatTitle(title, category);

  // 날짜 정보 포맷팅
  const formattedDate = formatDatePeriod(startDate, endDate);

  // 북마크 상태 관리 커스텀 훅 사용
  const {
    isBookmarked: bookmarked,
    toggleBookmark: handleToggleBookmark,
    isLoading,
  } = useBookmarkState(id, isBookmarked);

  // 카드 클릭 시 상세 페이지로 이동
  const handleClick = () => {
    const apiCategory = mapToApiCategory(category);
    navigate(`/informations/${apiCategory}/${id}`);
  };

  // 북마크 토글 처리
  const toggleBookmark = async (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트 방지

    // 인증 확인
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

    // 부모 컴포넌트에 변경 알림
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
        alt={formattedTitle}
        className="w-full h-full absolute left-0 top-0 object-cover"
        onError={(e) => {
          // 이미지 로딩 실패 시 기본 이미지로 대체
          e.currentTarget.src = "/default-image.png";
        }}
      />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 bottom-0 w-full h-full info-postcard-shadow"></div>
      </div>
      <div className="w-[268px] h-[268px] absolute left-4 top-4">
        <div className="flex justify-between items-start w-full absolute left-0 top-[203px]">
          <div>
            <p className="body-normal-b text-white line-clamp-1">
              {formattedTitle}
            </p>
            <div className="flex items-center w-full mt-1">
              <Icon
                name="CalendarRange"
                size={14}
                strokeWidth={1.5}
                className="text-white"
              />
              <p className="caption-r text-white ml-1">{formattedDate}</p>
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
