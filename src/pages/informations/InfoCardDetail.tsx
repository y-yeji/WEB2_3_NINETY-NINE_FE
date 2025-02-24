import { useEffect, useState } from "react";
import Icon from "../../assets/icons/Icon";
import InfoCardDetailInfo from "./InfoCardDetailInfo";
import InfoCardDetailReview from "./InfoCardDetailReview";

interface ShowInfo {
  posterUrl: string;
  title: string;
  audience: string;
  period: string;
  location: string;
  times: string;
  links: string;
  price: string;
  reviewCount: number;
}

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
};

const InfoCardDetail = () => {
  const [activeTab, setActiveTab] = useState("review");
  const [showScrollButton, setShowScrollButton] = useState(false);

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

  return (
    <div className="w-[1280px] h-full relative overflow-hidden bg-white">
      <div className="w-[1120px] h-[470px] mx-auto mt-[130px] rounded-[10px] bg-[#f9f9f9] border border-blue-7 p-9 flex relative">
        <img
          src={dummyShowInfo.posterUrl}
          alt="전시 포스터"
          className="w-[300px] h-[400px] ml-20"
        />
        <div className="flex flex-col justify-between ml-32">
          <p className="h3-b font-bold text-left text-gray-80 mb-24 mt-3">
            {dummyShowInfo.title}
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-1.5">
              <Icon name="UsersRound" className="w-[18px] h-[18px] ml-0.5" />
              <p className="body-normal-r text-left text-gray-80">
                {dummyShowInfo.audience}
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <Icon name="CalendarRange" className="w-5 h-5" />
              <p className="body-normal-r text-left text-gray-80">
                {dummyShowInfo.period}
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <Icon name="MapPin" className="w-5 h-5" />
              <p className="body-normal-r text-left text-gray-80">
                {dummyShowInfo.location}
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <Icon name="Clock" className="w-[18px] h-[18px] ml-0.5" />
              <p className="body-normal-r text-left text-gray-80">
                {dummyShowInfo.times}
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <Icon
                name="Pin"
                className="w-[18px] h-[18px] ml-0.5"
                style={{ transform: "rotate(-22.23deg)" }}
              />
              <p className="body-normal-r text-left text-gray-80">
                {dummyShowInfo.links}
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <Icon name="Tickets" className="w-[18px] h-[18px] ml-0.5" />
              <p className="body-normal-r text-left text-gray-80">
                {dummyShowInfo.price}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-4 mt-2 absolute bottom-7 right-7">
          <div className="w-8 h-8 rounded-[8px] bg-blue-6 flex justify-center items-center cursor-pointer">
            <Icon name="Bookmark" className="w-6 h-6 text-white" />
          </div>
          <div className="w-8 h-8 rounded-[8px] bg-blue-6 flex justify-center items-center cursor-pointer">
            <Icon name="Share2" className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

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
