import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import main1 from "../assets/main1.svg";
import main2 from "../assets/main2.svg";
import ScrollToTopButton from "../components/ui/ScrollToTopButton";
import EventSection from "../components/common/EventSection";
import { useAllEventData } from "../hooks/useEventData";

const categoryRoutes = {
  팝업스토어: "popups",
  전시회: "exhibition",
  "뮤지컬 | 연극": "musical",
  "페스티벌 | 콘서트": "concert",
};

const MainPage = () => {
  const { data, loading } = useAllEventData();

  if (loading) return <p className="text-center">데이터 불러오는 중...</p>;

  return (
    <div className="w-full flex flex-col mx-auto">
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
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {Object.entries(categoryRoutes).map(([category, route]) => (
        <EventSection
          key={route}
          category={category}
          route={route}
          data={data[route] || []}
        />
      ))}

      <ScrollToTopButton />
    </div>
  );
};

export default MainPage;
