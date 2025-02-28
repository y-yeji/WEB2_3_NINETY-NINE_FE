import { useEffect, useState } from "react";
import InformationCard from "../../components/common/InformationCard";
import Dropdown from "../../components/ui/Dropdown";
import Pagination from "../../components/ui/Pagination";
import api from "../../api/api";
import { useParams } from "react-router-dom";

const categoryTitles: { [key: string]: string } = {
  popups: "팝업스토어",
  exhibition: "전시회",
  musical: "뮤지컬 | 연극",
  concert: "페스티벌 | 콘서트",
};

const Informations = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("진행 중"); // 기본값을 "진행 중"으로 설정
  const { category } = useParams<{ category: string }>();
  const [events, setEvents] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState<number>(105);
  const itemsPerPage = 9; // 3x3 그리드
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get(`/api/events/${category}`);
        setEvents(response.data);
        if (response.data.length > 0) {
          setTotalItems(response.data.length);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [category]);

  // 필터링 로직
  const filteredEvents = events.filter((event) => {
    let locationMatch = true;
    let statusMatch = true;

    if (selectedLocation && selectedLocation !== "전체") {
      locationMatch = event.location.includes(selectedLocation);
    }

    if (selectedStatus) {
      const currentDate = new Date();
      const startDate = new Date(event.event_start_date);
      const endDate = new Date(event.event_end_date);

      if (selectedStatus === "진행 중") {
        statusMatch = currentDate >= startDate && currentDate <= endDate;
      } else if (selectedStatus === "진행 예정") {
        statusMatch = currentDate < startDate;
      }
    }

    return locationMatch && statusMatch;
  });

  // 페이지네이션
  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  return (
    <div className="w-[1280px] mx-auto bg-white">
      <div className="mt-[156px] w-[1020px] mx-auto">
        {category && (
          <h1 className="h1-b font-bold mb-8 ml-5">
            {categoryTitles[category] || category}
          </h1>
        )}
        <div className="flex ml-5 gap-5 w-full">
          <Dropdown
            data={[
              "전체",
              "서울특별시",
              "인천광역시",
              "대전광역시",
              "광주광역시",
              "대구광역시",
              "울산광역시",
              "부산광역시",
              "세종특별자치시",
              "강원도",
              "충청북도",
              "전라북도",
              "전라남도",
              "경상북도",
              "경상남도",
              "제주특별자치도",
            ]}
            onSelect={(value) => setSelectedLocation(value)}
            sizeClassName="w-[164px] h-[32px]"
          />
          <Dropdown
            data={["진행 중", "진행 예정"]}
            onSelect={(value) => setSelectedStatus(value)}
            sizeClassName="w-[124px] h-[32px]"
          />
        </div>

        <div className="flex flex-wrap ml-5 gap-y-[60px] mt-[42px]">
          {Array.from(
            { length: Math.ceil(currentEvents.length / 3) },
            (_, rowIndex) => (
              <div key={rowIndex} className="flex gap-x-10">
                {currentEvents
                  .slice(rowIndex * 3, rowIndex * 3 + 3)
                  .map((event) => (
                    <InformationCard
                      key={event.event_id}
                      imageUrl={event.image_url}
                      title={event.event_title}
                      date={`${event.event_start_date} - ${event.event_end_date}`}
                      location={event.location}
                    />
                  ))}
              </div>
            )
          )}
        </div>

        <div className="w-full flex justify-center mt-24">
          <Pagination
            totalItems={filteredEvents.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Informations;
