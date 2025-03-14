import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InfoCardDetailInfo from "./InfoCardDetailInfo";
import InfoCardDetailReview from "./InfoCardDetailReview";
import InfoCardHeader from "../../components/informationdetail/InfoCardHeader";
import { ShowInfo } from "../../types/Informationdetail";
import api from "../../api/api";
import { useBookmarkState } from "../../hooks/useBookmarkState";
import { useAuthStore } from "../../stores/authStore";
import { useModalStore } from "../../stores/modalStore";
import ScrollToTopButton from "../../components/ui/ScrollToTopButton";
import { useTitleFormatter } from "../../hooks/usePopupTitleFormatter"; // 추가된 hook import
import { useDateFormatter } from "../../hooks/useInformationDateFormatter";

interface EventDetail {
  id: number;
  genre: string | null;
  postUrl: string;
  ageRating: string | null;
  title: string;
  startDate: string;
  endDate: string;
  operatingHours: string | null;
  location: string;
  venue: string;
  status: string;
  ticketingWebSite: string | null;
  price: string | null;
  detailImage: string | null;
  description: string | null;
  bookmarked: boolean;
}

const fallbackEventDetail: EventDetail = {
  id: 0,
  genre: "기타",
  postUrl: "/default-image.png",
  ageRating: "-",
  title: "정보를 불러올 수 없습니다",
  startDate: "",
  endDate: "",
  operatingHours: "-",
  location: "-",
  venue: "정보 없음",
  status: "진행중",
  ticketingWebSite: null,
  price: "-",
  detailImage: null,
  description:
    "서버에서 정보를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
  bookmarked: false,
};

const InfoCardDetail = () => {
  const { category, eventId } = useParams<{
    category: string;
    eventId: string;
  }>();
  const navigate = useNavigate();
  const { isLoggedIn, checkAuth } = useAuthStore();
  const { openModal } = useModalStore();
  const { formatTitle } = useTitleFormatter(); // 추가된 hook 사용

  const [activeTab, setActiveTab] = useState("review");
  const [eventDetail, setEventDetail] = useState<EventDetail | null>(null);

  const { isBookmarked, toggleBookmark: handleToggleBookmark } =
    useBookmarkState(Number(eventId), eventDetail?.bookmarked || false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const [reviewCount, setReviewCount] = useState(0);

  const { formatDatePeriod } = useDateFormatter();

  const normalizeCategory = (cat: string | undefined): string => {
    if (!cat) return "";

    const categoryMapping: Record<string, string> = {
      popups: "popupstores",
      exhibition: "exhibits",
      musical: "performances",
      concert: "festivals",
    };

    return categoryMapping[cat] || cat;
  };

  const fetchReviewCount = async () => {
    if (!category || !eventId) return;

    const categoryMapping: Record<string, string> = {
      popups: "popupStoreId",
      exhibition: "exhibitId",
      musical: "performanceId",
      concert: "festivalId",
    };

    const paramKey = categoryMapping[category] || "";
    if (!paramKey) return;

    try {
      const token = localStorage.getItem("accessToken");
      const requestUrl = `/api/reviews?${paramKey}=${eventId}`;

      const response = await api.get(requestUrl, {
        headers: token ? { Authorization: token } : {},
      });

      if (response.data && response.data.success) {
        setReviewCount(response.data.data.length);
      }
    } catch (error) {
      console.error("리뷰 개수 가져오기 오류:", error);
    }
  };

  // Fetch event detail from API
  useEffect(() => {
    const fetchEventDetail = async () => {
      if (!category || !eventId) {
        setError("Invalid category or event ID");
        setLoading(false);
        return;
      }

      const normalizedCategory = normalizeCategory(category);
      const token = localStorage.getItem("accessToken");

      try {
        // API 호출 전 정보 로깅
        const response = await api.get(
          `/api/events/${normalizedCategory}/${eventId}`,
          {
            headers: token ? { Authorization: token } : {},
          }
        );

        // 응답 구조 확인 및 처리
        if (response.data && typeof response.data === "object") {
          // success 속성이 있는지 확인 (원래 예상했던 구조인지)
          if ("success" in response.data && "data" in response.data) {
            if (response.data.success) {
              const eventData = response.data.data;
              setEventDetail(eventData);
            } else {
              setError(
                response.data.message || "Failed to fetch event details"
              );
              setEventDetail(fallbackEventDetail);
              setUsingFallback(true);
            }
          } else {
            // 새로운 구조: 응답 자체가 EventDetail 객체
            // 필수 필드를 확인하여 유효한 EventDetail인지 확인
            if ("id" in response.data && "title" in response.data) {
              setEventDetail(response.data);
            } else {
              setError("Invalid data format received from server");
              setEventDetail(fallbackEventDetail);
              setUsingFallback(true);
            }
          }
        } else {
          setError("Invalid response format");
          setEventDetail(fallbackEventDetail);
          setUsingFallback(true);
        }
      } catch (error: any) {
        console.error("Error fetching event details:", error);
        setError(`An error occurred: ${error.message || "Unknown error"}`);
        setEventDetail(fallbackEventDetail);
        setUsingFallback(true);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetail();
  }, [category, eventId]);

  // 이벤트 상세 정보 로드 후 리뷰 개수 가져오기
  useEffect(() => {
    if (eventDetail) {
      fetchReviewCount();
    }
  }, [eventDetail]);

  const toggleBookmark = async () => {
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

    // 현재 카테고리와 경로 출력
    console.log("상세 페이지 북마크:", { category, eventId });

    // category와 일치하는 API 매개변수 지정
    const apiCategoryMap: Record<string, string> = {
      popups: "popupstores",
      exhibition: "exhibits",
      musical: "performances",
      concert: "festivals",
    };

    const normalizedCategory = apiCategoryMap[category || ""] || category;
    await handleToggleBookmark(normalizedCategory);
  };

  const mapToShowInfo = (data: EventDetail): ShowInfo => {
    // postUrl이 없는 경우 기본 이미지 경로를 사용
    let posterUrl = data.postUrl || "/default-image.png";

    // formatTitle 훅을 사용하여 제목 처리
    let title = formatTitle(data.title || "-");

    // 배열 형태 문자열인지 확인 (대괄호로 시작하는지)
    if (
      data.postUrl &&
      data.postUrl.startsWith("[") &&
      data.postUrl.endsWith("]")
    ) {
      // 대괄호 제거하고 첫 번째 URL만 추출
      const urlArray = data.postUrl
        .substring(1, data.postUrl.length - 1)
        .split(",");
      posterUrl = urlArray[0].trim();

      // 첫 번째 URL에서 따옴표 제거 (있을 경우)
      if (posterUrl.startsWith('"') || posterUrl.startsWith("'")) {
        posterUrl = posterUrl.substring(1, posterUrl.length - 1);
      }
    } else if (data.postUrl && data.postUrl.includes(",")) {
      // 기존 로직 유지: 콤마로만 구분된 경우
      posterUrl = data.postUrl.split(",")[0].trim();
    }

    // 날짜 정보 포맷팅
    const formattedPeriod = formatDatePeriod(data.startDate, data.endDate);

    // 티켓팅 웹사이트 정보 파싱
    let links: Array<{ siteName: string; url: string }> = [];

    if (data.ticketingWebSite) {
      // 여러 사이트가 있는 경우 쉼표로 구분되어 있음
      const siteInfos = data.ticketingWebSite.split(",");

      siteInfos.forEach((siteInfo) => {
        // 각 사이트 정보는 '사이트명 - URL' 형식
        const trimmedSiteInfo = siteInfo.trim();
        const separatorIndex = trimmedSiteInfo.indexOf(" - ");

        if (separatorIndex !== -1) {
          const siteName = trimmedSiteInfo.substring(0, separatorIndex).trim();
          const url = trimmedSiteInfo.substring(separatorIndex + 3).trim();

          links.push({ siteName, url });
        }
      });
    }

    return {
      posterUrl: posterUrl || "/default-image.png",
      title: title || "-",
      audience: data.ageRating || "-",
      period: formattedPeriod, // 포맷팅된 날짜 정보 사용
      location: data.location || "-",
      times: data.operatingHours || "-",
      links: links.length > 0 ? links : "-",
      price: data.price || "-",
      reviewCount,
      isBookmarked: data.bookmarked,
      genre: data.genre || "",
    };
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p>불러오는 중...</p>
      </div>
    );
  }

  if (error && !eventDetail) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <p>정보를 불러올 수 없습니다.</p>
        <p className="text-gray-500 mt-2">{error}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-6 text-white rounded-md"
          onClick={() => navigate(-1)}
        >
          돌아가기
        </button>
      </div>
    );
  }

  if (!eventDetail) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <p>정보를 불러올 수 없습니다.</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-6 text-white rounded-md"
          onClick={() => navigate(-1)}
        >
          돌아가기
        </button>
      </div>
    );
  }

  const showInfo = mapToShowInfo(eventDetail);

  const cleanDescription = (text: string | null): string | null => {
    if (!text) return null;
    return text.replace(/\?/g, "");
  };

  return (
    <div className="w-[1280px] h-full relative overflow-hidden bg-white">
      {usingFallback && (
        <div className="bg-yellow-100 p-4 mb-4 rounded-md text-yellow-800">
          <p>
            서버에서 정보를 가져오는 데 문제가 발생했습니다. 제한된 정보만
            표시됩니다.
          </p>
        </div>
      )}

      <InfoCardHeader
        showInfo={showInfo}
        isBookmarked={isBookmarked}
        toggleBookmark={toggleBookmark}
      />

      <div className="flex flex-col items-center mt-12">
        <div className="w-[1120px] flex justify-center relative">
          <button
            onClick={() => setActiveTab("review")}
            className={`flex-1 text-center pb-5 ${
              activeTab === "review" ? "text-blue-6" : "text-gray-20"
            }`}
          >
            <p className="h3-b">상세 정보</p>
          </button>
          <button
            onClick={() => setActiveTab("info")}
            className={`flex-1 text-center pb-5 ${
              activeTab === "info" ? "text-blue-6" : "text-gray-20"
            }`}
          >
            <p className="h3-b">후기</p>
          </button>
        </div>
        <div className="relative w-[1120px] h-[4px] bg-gray-20">
          <div
            className={`absolute h-full bg-blue-6 transition-all duration-300 ${
              activeTab === "review" ? "left-0 w-1/2" : "left-1/2 w-1/2"
            }`}
          />
        </div>
        <div className="w-full flex justify-center">
          {activeTab === "review" ? (
            <InfoCardDetailInfo
              description={cleanDescription(eventDetail.description)}
              location={eventDetail.location}
              venue={eventDetail.venue}
              detailImage={eventDetail.detailImage}
            />
          ) : (
            <InfoCardDetailReview
              eventId={Number(eventId)}
              onReviewCountChange={setReviewCount}
            />
          )}
        </div>
      </div>

      <ScrollToTopButton />
    </div>
  );
};

export default InfoCardDetail;
