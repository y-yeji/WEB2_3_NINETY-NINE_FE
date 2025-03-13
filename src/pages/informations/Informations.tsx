import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventsGrid from "../../components/informationslist/InformationsGrid";
import EventFilters from "../../components/informationslist/InformationsFilters";
import EventsHeader from "../../components/informationslist/InformationsHeader";
import { useEventsData } from "../../hooks/useInformationsList";
import Pagination from "../../components/ui/Pagination";

const categoryTitles: { [key: string]: string } = {
  popups: "팝업스토어",
  popupstores: "팝업스토어",
  exhibition: "전시회",
  exhibits: "전시회",
  musical: "뮤지컬 | 연극",
  performances: "뮤지컬 | 연극",
  festivals: "페스티벌",
};

const Informations = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>("전체");
  const [selectedStatus, setSelectedStatus] = useState<string>("진행 중");
  const { category } = useParams<{ category: string }>();
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { events, totalItems, loading, fetchEvents } = useEventsData(
    category || ""
  );

  // 페이지 또는 필터 변경시 API 재호출
  useEffect(() => {
    fetchEvents(currentPage, selectedLocation, selectedStatus);
  }, [category, currentPage, selectedLocation, selectedStatus, fetchEvents]);

  // 필터 변경시 첫 페이지로 이동
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedLocation, selectedStatus]);

  // 카테고리 변경시 기본 필터 설정
  useEffect(() => {
    setSelectedLocation("전체");
    setSelectedStatus("진행 중");
    setCurrentPage(1);
  }, [category]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // 페이지 변경시 상단으로 스크롤
  };

  return (
    <div className="w-[1280px] mx-auto bg-white">
      <div className="mt-[156px] w-[1020px] mx-auto">
        <EventsHeader
          title={category && (categoryTitles[category] || category)}
        />

        <EventFilters
          selectedLocation={selectedLocation}
          selectedStatus={selectedStatus}
          onLocationChange={setSelectedLocation}
          onStatusChange={setSelectedStatus}
        />

        <EventsGrid events={events} loading={loading} />

        <div className="w-full flex justify-center mt-24">
          {totalItems > 0 && (
            <Pagination
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Informations;
