import { useState } from "react";
import Icon from "../../assets/icons/Icon";
import Dropdown from "../../components/ui/Dropdown";
import InformationCard from "../../components/common/InformationCard";
import Map from "./Map";
import Pagination from "../../components/ui/Pagination";

const cardData = [
  { id: 1, title: "Card 1", description: "Description 1" },
  { id: 2, title: "Card 2", description: "Description 2" },
  { id: 3, title: "Card 3", description: "Description 3" },
  { id: 4, title: "Card 1", description: "Description 1" },
  { id: 5, title: "Card 2", description: "Description 2" },
  { id: 6, title: "Card 3", description: "Description 3" },
  { id: 7, title: "Card 1", description: "Description 1" },
  { id: 8, title: "Card 2", description: "Description 2" },
  { id: 9, title: "Card 3", description: "Description 3" },
];

const mockLocations = [
  { name: "서울특별시", lat: 37.5665, lng: 126.978 },
  { name: "인천광역시", lat: 37.4563, lng: 126.7052 },
  { name: "대전광역시", lat: 36.3504, lng: 127.3845 },
  { name: "광주광역시", lat: 35.1595, lng: 126.8526 },
  { name: "대구광역시", lat: 35.8714, lng: 128.6014 },
  { name: "울산광역시", lat: 35.5384, lng: 129.3114 },
  { name: "부산광역시", lat: 35.1796, lng: 129.0756 },
  { name: "세종특별자치시", lat: 36.48, lng: 127.289 },
  { name: "강원도", lat: 37.8228, lng: 128.1555 },
  { name: "충청북도", lat: 36.8, lng: 127.7 },
  { name: "전라북도", lat: 35.7175, lng: 127.153 },
  { name: "전라남도", lat: 34.8679, lng: 126.991 },
  { name: "경상북도", lat: 36.4919, lng: 128.8889 },
  { name: "경상남도", lat: 35.4606, lng: 128.2132 },
  { name: "제주특별자치도", lat: 33.489, lng: 126.4983 },
];

// interface ApiResponse {
//   posts: Post[];
//   totalElements: number;
// }

const MapSearch = ({}) => {
  const performanceOptions = [
    "카테고리 선택",
    "팝업 스토어",
    "전시회",
    "뮤지컬 | 연극",
    "페스티벌 | 콘서트",
  ];
  const progressStatusOptions = ["선택", "진행중", "오픈 예정"];
  const [performanceOptionsSelected, setPerformanceOptionSelected] = useState(
    performanceOptions[0]
  );
  const [statusOptionsSelected, setStatusOptionsSelected] = useState(
    progressStatusOptions[0]
  );
  const [searchKeyword, setSearchKeyword] = useState("");
  const [mapCenter, setMapCenter] = useState({
    lat: 33.450701,
    lng: 126.570667,
  });

  // const handleSearchSortChange = (selected: string) => {
  //   setPerformanceOptionSelected(selected);
  //   // 선택된 정렬 옵션에 따라 지도 중심 변경 (예시)
  //   if (selected === "진행중") {
  //     setMapCenter({ lat: 37.5665, lng: 126.978 }); // 서울 중심 좌표
  //   } else if (selected === "오픈 예정") {
  //     setMapCenter({ lat: 35.1796, lng: 129.0756 }); // 부산 중심 좌표
  //   } else {
  //     setMapCenter({ lat: 33.450701, lng: 126.570667 }); // 기본 좌표
  //   }
  // };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const foundLocation = mockLocations.find(
      (location) => location.name.toLowerCase() === searchKeyword.toLowerCase()
    );

    if (foundLocation) {
      setMapCenter({ lat: foundLocation.lat, lng: foundLocation.lng });
      console.log(`검색된 위치: ${foundLocation.name}`);
    } else {
      console.log("검색 결과가 없습니다.");
    }
  };

  return (
    <div className="mt-[124px]">
      <section className="mb-10 flex gap-6 justify-center items-center">
        <div className="flex gap-4">
          <Dropdown
            data={performanceOptions}
            // onSelect={handleSearchSortChange}
            sizeClassName="w-[154px] h-[30px]"
          />
          <Dropdown
            data={progressStatusOptions}
            // onSelect={handleSearchSortChange}
            sizeClassName="w-[122px] h-[30px]"
          />
        </div>
        <form
          onSubmit={handleSearch}
          className="flex justify-between py-[9px] w-[766px] h-9 rounded-full border border-gray-20"
        >
          <input
            type="search"
            name="search"
            id="search"
            placeholder="찾고싶은 공연의 이름을 입력하세요"
            className="flex-grow px-4 bg-transparent outline-none pl-6 placeholder:caption-r"
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <button type="submit" className="flex justify-end items-center mr-6">
            <Icon name="Search" size={18} className="text-blue-1" />
          </button>
        </form>
      </section>

      <section className="flex justify-center items-center">
        <Map center={mapCenter} />
      </section>

      <section className="my-10">
        <div className="flex gap-[93px] justify-center flex-wrap mx-auto">
          {cardData.map((card) => (
            <InformationCard
              key={card.id}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </section>
      <div>
        <Pagination
        // totalItems={totalItems}
        // itemsPerPage={9}
        // currentPage={currentPage}
        // onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default MapSearch;
