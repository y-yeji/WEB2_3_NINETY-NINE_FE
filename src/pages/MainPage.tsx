import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import Main1 from "../assets/main1.svg";
import Main2 from "../assets/main2.svg";
import ArrowUp from "../assets/arrow-up.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface CategoryRoutes {
  [key: string]: string;
}

const categoryRoutes: CategoryRoutes = {
  팝업스토어: "popupstore",
  전시회: "exhibition",
  "뮤지컬 | 연극": "musical",
  "페스티벌 | 콘서트": "festival",
};
const MainPage = () => {
  // ✅ "맨 위로 가기" 버튼 표시 여부 상태
  const [showScroll, setShowScroll] = useState(false);

  // ✅ 스크롤 이벤트 감지 (최상단에서 300px 이상 내려가면 버튼 보이기)
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ 맨 위로 스크롤 함수
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full flex flex-col mx-auto">
      {/* 메인 이미지 슬라이더 */}
      <section className="w-full h-[647px] mt-[84px]">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          slidesPerView={2}
          slidesPerGroup={2}
          className="w-full h-full"
        >
          {[Main1, Main2, Main1, Main2].map((image, index) => (
            <SwiperSlide key={index} className="w-[647px] h-[647px]">
              <img
                src={image}
                alt={`메인 이미지 ${index + 1}`}
                className="w-full h-full object-cover "
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {["팝업스토어", "전시회", "뮤지컬 | 연극", "페스티벌 | 콘서트"].map(
        (category, index) => (
          <section key={index} className="mb-12">
            <div className="flex justify-between items-center mb-[64px] h-full">
              <h2 className="h1-b text-gray-80 mt-[84px] flex items-center">
                {category}
              </h2>
              <Link
                to={`/${categoryRoutes[category]}`}
                className="text-blue-2 body-s-m hover:text-gray-700 transition-all mt-[84px] flex items-center"
              >
                더보기
              </Link>
            </div>

            {/* Swiper (카드 슬라이더) */}
            <Swiper
              pagination={{ clickable: true }}
              spaceBetween={40}
              slidesPerView={4}
              className="w-full"
            >
              {[1, 2, 3, 4, 5].map((item) => (
                <SwiperSlide
                  key={item}
                  className="w-full h-[300px] rounded-[10px] overflow-y-auto flex flex-col justify-start items-center"
                >
                  <img src={Main2} alt={`이벤트 ${item}`} />
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        )
      )}
      {/* ✅ "맨 위로 가기" 버튼 (우측 하단 고정) */}
      {showScroll && (
  <button
    onClick={scrollToTop}
    className="fixed z-20 bottom-6 right-6 w-[45px] h-[45px] p-0  rounded-full  transition-all"
  >
    <img onClick={scrollToTop} src={ArrowUp} alt="위로 가기" className="w-full h-full object-cover" />
  </button>
)}
    </div>
  );
};

export default MainPage;
