import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import InformationCard from "../common/InformationCard";
import { useTitleFormatter } from "../../hooks/usePopupTitleFormatter";

interface EventItem {
  id: number;
  genre: string;
  postUrl: string;
  title: string;
  location: string;
  venue: string;
  status: string;
  startDate: string;
  endDate: string;
  price: string | null;
  description: string | null;
  ageRating: string | null;
  bookmarked: boolean;
  detailImage: string | null;
  operatingHours: string | null;
  ticketingWebSite: string | null;
}

interface EventSectionProps {
  category: string;
  route: string;
  data: EventItem[];
}

const EventSection = ({ category, route, data }: EventSectionProps) => {
  const { formatTitle } = useTitleFormatter();

  return (
    <section className="mb-12 mx-[50px]">
      <div className="flex justify-between items-center mb-[64px] h-full">
        <h2 className="h1-b text-gray-80 mt-[84px] flex items-center">
          {category}
        </h2>
        <Link
          to={`/informations/${route}`}
          className="mx-[58px] text-blue-2 body-s-m hover:text-gray-700 transition-all mt-[84px] flex items-center"
        >
          더보기
        </Link>
      </div>
      <Swiper
        pagination={{ clickable: true }}
        spaceBetween={170}
        slidesPerView={4}
        slidesPerGroup={1}
        loop={true}
        className="w-full"
      >
        {data.length > 0 ? (
          data.map((item) => {
            // 중요: 여기서 카테고리를 매핑하는 대신 route를 사용
            return (
              <SwiperSlide
                key={item.id}
                className="w-full h-[300px] rounded-[10px] flex flex-col justify-start items-center"
              >
                <InformationCard
                  id={item.id}
                  category={route} // item.genre 대신 route 값 사용
                  title={
                    route === "popupstores"
                      ? formatTitle(item.title, "popupstores")
                      : item.title
                  }
                  startDate={
                    item.startDate !== "null" ? item.startDate : undefined
                  }
                  endDate={item.endDate !== "null" ? item.endDate : undefined}
                  location={item.location}
                  isBookmarked={item.bookmarked}
                  imageUrl={
                    typeof item.postUrl === "string"
                      ? item.postUrl.startsWith("[") &&
                        item.postUrl.endsWith("]")
                        ? item.postUrl
                            .slice(1, -1)
                            .split(",")[0]
                            .trim()
                            .replace(/['"]/g, "")
                        : item.postUrl
                      : Array.isArray(item.postUrl)
                        ? item.postUrl[0]
                        : ""
                  }
                  apiCategory={route}
                />
              </SwiperSlide>
            );
          })
        ) : (
          <p className="text-gray-20">데이터가 없습니다.</p>
        )}
      </Swiper>
    </section>
  );
};

export default EventSection;
