import { useState } from "react";
import InformationCard from "../../components/common/InformationCard";
import Dropdown from "../../components/ui/Dropdown";
import Pagination from "../../components/ui/Pagination";

const Exhibition = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const totalItems = 105;
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <div className="w-[1280px] mx-auto bg-white">
      <div className="mt-[188px] w-[1020px] mx-auto">
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
          />
          <Dropdown
            data={["진행 중", "진행 예정"]}
            onSelect={(value) => setSelectedStatus(value)}
          />
        </div>

        <div className="flex flex-wrap justify-center gap-y-[60px] mt-11">
          <div className="flex gap-x-10 justify-between">
            <InformationCard />
            <InformationCard />
            <InformationCard />
          </div>
          <div className="flex gap-x-10 justify-between">
            <InformationCard />
            <InformationCard />
            <InformationCard />
          </div>
          <div className="flex gap-x-10 justify-between">
            <InformationCard />
            <InformationCard />
            <InformationCard />
          </div>
        </div>

        <div className="w-full flex justify-center mt-24">
          <Pagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Exhibition;
