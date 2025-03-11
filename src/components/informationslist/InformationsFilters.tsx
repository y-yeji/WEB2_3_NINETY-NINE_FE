import React from "react";
import Dropdown from "../../components/ui/Dropdown";

interface InformationsFiltersProps {
  selectedLocation: string;
  selectedStatus: string;
  onLocationChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

const InformationsFilters: React.FC<InformationsFiltersProps> = ({
  selectedLocation,
  selectedStatus,
  onLocationChange,
  onStatusChange,
}) => {
  const locations = [
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
  ];

  const statuses = ["진행 중", "오픈 예정"];

  return (
    <div className="flex ml-[18.5px] gap-5 w-full">
      <Dropdown
        data={locations}
        onSelect={onLocationChange}
        sizeClassName="w-[164px] h-[32px]"
        selectedOption={selectedLocation}
      />
      <Dropdown
        data={statuses}
        onSelect={onStatusChange}
        sizeClassName="w-[124px] h-[32px]"
        selectedOption={selectedStatus}
      />
    </div>
  );
};

export default InformationsFilters;
