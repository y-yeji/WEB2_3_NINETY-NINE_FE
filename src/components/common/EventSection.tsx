import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import InformationCard from "../common/InformationCard";

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
          data.map((data) => (
            <SwiperSlide
              key={data.id}
              className="w-full h-[300px] rounded-[10px] flex flex-col justify-start items-center"
            >
              <InformationCard
                id={data.id}
                category={data.genre}
                title={data.title}
                date={
                  data.startDate !== "null" && data.endDate !== "null"
                    ? `${data.startDate} ~ ${data.endDate}`
                    : data.startDate !== "null"
                      ? `시작일 ${data.startDate}`
                      : data.endDate !== "null"
                        ? `종료일 ${data.endDate}`
                        : "날짜 정보 없음"
                }
                location={data.location}
                isBookmarked={data.bookmarked}
                imageUrl={
                  typeof data.postUrl === "string"
                    ? data.postUrl.startsWith("[") && data.postUrl.endsWith("]")
                      ? data.postUrl
                          .slice(1, -1)
                          .split(",")[0]
                          .trim()
                          .replace(/['"]/g, "")
                      : data.postUrl
                    : Array.isArray(data.postUrl)
                      ? data.postUrl[0]
                      : ""
                }
              />
            </SwiperSlide>
          ))
        ) : (
          <p className="text-gray-20">데이터가 없습니다.</p>
        )}
      </Swiper>
    </section>
  );
};

export default EventSection;
