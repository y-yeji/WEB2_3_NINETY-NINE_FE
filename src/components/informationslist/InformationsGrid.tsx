import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import InformationCard from "../../components/common/InformationCard";
import { EventData } from "../../hooks/useInformationsList";

interface InformationsGridProps {
  events: EventData[];
  loading: boolean;
  category?: string; // Add optional category prop
}

const InformationsGrid: React.FC<InformationsGridProps> = ({
  events,
  loading,
  category,
}) => {
  // 북마크 상태를 관리하기 위한 상태 추가
  const [updatedEvents, setUpdatedEvents] = useState<EventData[]>(events);
  const location = useLocation();

  // Determine the current category from URL if not provided
  const getCurrentCategory = () => {
    if (category) return category;

    const pathSegments = location.pathname.split("/");
    const indexOfInformations = pathSegments.indexOf("informations");
    if (
      indexOfInformations !== -1 &&
      indexOfInformations + 1 < pathSegments.length
    ) {
      return pathSegments[indexOfInformations + 1];
    }
    return "";
  };

  const currentCategory = getCurrentCategory();

  // events prop이 변경될 때마다 내부 상태 업데이트
  useEffect(() => {
    setUpdatedEvents(events);
  }, [events]);

  // 북마크 상태 변경 시 이벤트 목록 업데이트
  const handleBookmarkChange = (id: number, newStatus: boolean) => {
    setUpdatedEvents((prev) =>
      prev.map((event) =>
        event.id === id ? { ...event, bookmarked: newStatus } : event
      )
    );
  };

  // 첫 번째 이미지 URL만 추출하는 함수
  const getFirstImageUrl = (postUrl: string) => {
    if (!postUrl) return "/info-image.png";

    // URL이 대괄호로 묶여있고 콤마로 구분된 경우
    if (postUrl.startsWith("[") && postUrl.endsWith("]")) {
      const urlsString = postUrl.substring(1, postUrl.length - 1);
      const urls = urlsString.split(", ");
      return urls[0].trim();
    }

    return postUrl;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <p>불러오는 중...</p>
      </div>
    );
  }

  if (updatedEvents.length === 0) {
    return (
      <div className="flex justify-center items-center h-96">
        <p>조건에 맞는 공연이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap ml-5 gap-y-[60px] mt-[42px]">
      {Array.from(
        { length: Math.ceil(updatedEvents.length / 3) },
        (_, rowIndex) => (
          <div key={rowIndex} className="flex gap-x-10">
            {updatedEvents
              .slice(rowIndex * 3, rowIndex * 3 + 3)
              .map((event) => {
                console.log(
                  "렌더링 이벤트:",
                  event.id,
                  event.title,
                  event.bookmarked
                );
                return (
                  <InformationCard
                    key={event.id}
                    id={event.id}
                    imageUrl={getFirstImageUrl(event.postUrl)}
                    title={event.title || "제목 없음"}
                    date={
                      event.startDate &&
                      event.startDate !== "null" &&
                      event.endDate &&
                      event.endDate !== "null"
                        ? `${event.startDate} ~ ${event.endDate}`
                        : event.startDate && event.startDate !== "null"
                          ? `시작일 ${event.startDate}`
                          : event.endDate && event.endDate !== "null"
                            ? `종료일 ${event.endDate}`
                            : "날짜 정보 없음"
                    }
                    location={event.location || "위치 정보 없음"}
                    isBookmarked={!!event.bookmarked}
                    onBookmarkChange={handleBookmarkChange}
                    category={currentCategory} // Pass the category
                  />
                );
              })}
          </div>
        )
      )}
    </div>
  );
};

export default InformationsGrid;
