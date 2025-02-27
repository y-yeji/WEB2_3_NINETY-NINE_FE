import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import main1 from "../assets/main1.svg";
import main2 from "../assets/main2.svg";
import { Link } from "react-router-dom";
import Icon from "../assets/icons/Icon";
import useScrollToTop from "../hooks/useScrollToTop";

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
  const { showScroll, scrollToTop, scrollTriggerRef } = useScrollToTop();

  return (
    <div className="w-full flex flex-col mx-auto">
      <div
        ref={scrollTriggerRef}
        style={{
          position: "absolute",
          top: "300px",
          left: "0",
          opacity: 0,
          pointerEvents: "none",
        }}
      ></div>
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
          {[main1, main2, main1, main2].map((image, index) => (
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
                to={`/informations/${categoryRoutes[category]}`}
                className="text-blue-2 body-s-m hover:text-gray-700 transition-all mt-[84px] flex items-center"
              >
                더보기
              </Link>
            </div>

            <Swiper
              pagination={{ clickable: true }}
              spaceBetween={40}
              slidesPerView={4}
              className="w-full"
            >
              {[1, 2, 3, 4, 5].map((item) => (
                <SwiperSlide
                  key={item}
                  className="w-full h-[300px] rounded-[10px] flex flex-col justify-start items-center"
                >
                  <img src={main2} alt={`이벤트 ${item}`} />
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        )
      )}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed z-20 bottom-6 right-6 w-[45px] h-[45px] p-0  rounded-full  transition-all"
        >
          <Icon
            name="ChevronUp"
            className="h-[42px] w-[42px] bg-blue-7 rounded-lg text-base-1"
          />
        </button>
      )}
    </div>
  );
};

export default MainPage;
