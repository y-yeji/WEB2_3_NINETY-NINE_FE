import { useEffect, useState } from "react";
import Icon from "../../assets/icons/Icon";
import InfoCardDetailInfo from "./InfoCardDetailInfo";
import InfoCardDetailReview from "./InfoCardDetailReview";
import InfoCardHeader from "../../components/informationdetail/InfoCardHeader"; // Import the new component
import { ShowInfo } from "../../types/Informationdetail";

const dummyShowInfo: ShowInfo = {
  posterUrl: "/poster-img.png",
  title: "<인상파, 모네에서 미국으로: 빛, 바다를 건너다 전시>",
  audience: "전체관람가",
  period: "2025.02.13 - 2025.06.30",
  location: "서울 서초구",
  times: "월 - 목 : 10:30 ~ 20:00 | 금 - 일 : 10:30 ~ 20:30",
  links: "사이트 바로가기 | 예매 사이트 바로가기",
  price: "유료",
  reviewCount: 99,
  isBookmarked: false,
};

const InfoCardDetail = () => {
  const [activeTab, setActiveTab] = useState("review");
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(dummyShowInfo.isBookmarked);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  return (
    <div className="w-[1280px] h-full relative overflow-hidden bg-white">
      <InfoCardHeader
        showInfo={dummyShowInfo}
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
            <p className="h3-b">후기 ({dummyShowInfo.reviewCount})</p>
          </button>
        </div>
        <div className="relative w-[1120px] h-[4px] bg-gray-20">
          <div
            className={`absolute h-full bg-blue-6 transition-all duration-300 ${
              activeTab === "review" ? "left-0 w-1/2" : "left-1/2 w-1/2"
            }`}
          />
        </div>
        <div>
          {activeTab === "review" ? (
            <InfoCardDetailInfo />
          ) : (
            <InfoCardDetailReview />
          )}
        </div>
      </div>

      {showScrollButton && (
        <div
          className="w-[42px] h-[42px] fixed bottom-10 right-10 cursor-pointer"
          onClick={scrollToTop}
        >
          <div
            className="w-[42px] h-[42px] rounded-lg bg-blue-7 flex justify-center items-center shadow-md"
            style={{ boxShadow: "0px 0px 3px 3px rgba(0,0,0,0.06)" }}
          >
            <Icon name="ChevronUp" className="w-7.5 h-7.5 text-white" />
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoCardDetail;
