import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import InformationCard from "../common/InformationCard";

interface EventSectionProps {
  category: string;
  route: string;
  data: any[];
}

const EventSection = ({ category, route, data }: EventSectionProps) => {
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-[64px] h-full">
        <h2 className="h1-b text-gray-80 mt-[84px] flex items-center">
          {category}
        </h2>
        <Link
          to={`/informations/${route}`}
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
        {data.length > 0 ? (
          data.map((data) => (
            <SwiperSlide
              key={data.event_id}
              className="w-full h-[300px] rounded-[10px] flex flex-col justify-start items-center"
            >
              <InformationCard
                title={data.event_title}
                date={`${data.event_start_date} ~ ${data.event_end_date}`}
                location="미정"
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
