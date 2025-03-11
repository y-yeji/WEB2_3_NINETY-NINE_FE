import { useAllEventData } from "../hooks/useEventData";
import EventSection from "../components/common/EventSection";
import ScrollToTopButton from "../components/ui/ScrollToTopButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { Link } from "react-router-dom";

const categoryRoutes = {
  팝업스토어: "popupstores",
  전시회: "exhibits",
  "뮤지컬 | 연극": "performances",
  페스티벌: "festivals",
};

const MainPage = () => {
  const { data, loading } = useAllEventData();
  if (loading) return <p className="text-center">데이터 불러오는 중...</p>;
  console.log(data);
  const getRandomItems = (items: { postUrl: string }[], count: number) => {
    if (!items || items.length === 0) return [];
    const shuffled = [...items].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const allEvents = [...((data as any).performances?.data || [])];
  const randomEvents = getRandomItems(allEvents, 8);

  return (
    <div className="w-full flex flex-col mx-auto">
      <section className="w-full h-[647px] mt-[84px]">
        {randomEvents.length > 0 ? (
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 7000 }}
            loop={true}
            slidesPerView={2}
            slidesPerGroup={2}
            spaceBetween={0}
            className="w-full h-full object-contain"
          >
            {randomEvents.map((event, index) => (
              <SwiperSlide key={index} className="w-full h-[647px] ">
                <Link to={`/informations/performances/${(event as any).id}`}>
                  <img
                    src={event.postUrl}
                    alt={`이벤트 이미지 ${index + 1}`}
                    className="w-full h-full object-center"
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-lg font-semibold">
            이벤트 데이터를 불러올 수 없습니다.
          </p>
        )}
      </section>
      {Object.entries(categoryRoutes).map(([category, route]) => (
        <EventSection
          key={route}
          category={category}
          route={route}
          data={(data as any)[route]?.data || []}
        />
      ))}
      <ScrollToTopButton />
    </div>
  );
};

export default MainPage;
