import React, { useEffect } from "react";
import Dropdown from "../../components/ui/Dropdown";
import InformationCard from "../../components/common/InformationCard";
import Map from "./Map";
import Pagination from "../../components/ui/Pagination";
import useFetchData from "../../hooks/useFetchData";
import useSearchFilters from "../../hooks/useSearchFilters";
import Icon from "../../assets/icons/Icon";

interface MapPost {
  id: number;
  title: string;
  latitude: number;
  longitude: number;
  postUrl: string;
  startDate: string;
  endDate: string;
  location: string;
  isBookmarked: boolean;
}
interface MapSearchResponse {
  posts: MapPost[];
  totalElements: number;
}

const performanceOptions = [
  "카테고리 선택",
  "팝업 스토어",
  "전시회",
  "뮤지컬 | 연극",
  "페스티벌",
];
const progressStatusOptions = ["선택", "진행중", "오픈 예정"];

const MapSearch: React.FC = () => {
  const {
    searchKeyword,
    performanceOptionsSelected,
    statusOptionsSelected,
    setSearchKeyword,
    setPerformanceOptionSelected,
    setStatusOptionsSelected,
    updateSearchParams,
    searchParams,
  } = useSearchFilters();

  const {
    data: performanceData,
    isLoading,
    fetchData,
  } = useFetchData<MapSearchResponse>();

  const fetchDataByCategory = () => {
    const endpointMap: Record<string, string> = {
      "팝업 스토어": "api/events/popupstores",
      전시회: "api/events/exhibits/exhibits",
      "뮤지컬 | 연극": "api/events/performances",
      페스티벌: "/api/events/festivals",
    };

    const statusMapping: Record<string, string> = {
      선택: "",
      진행중: "진행중",
      "오픈 예정": "진행 예정",
    };

    const params: Record<string, any> = {
      pageNum: parseInt(searchParams.get("page") || "1") - 1,
      pageSize: 9,
      region: searchParams.get("region") || "",
      titleKeyword: searchKeyword,
    };

    if (statusOptionsSelected !== "선택") {
      params.status = statusMapping[statusOptionsSelected];
    }

    fetchData(
      endpointMap[performanceOptionsSelected] || "api/events/performances",
      params
    );
  };

  useEffect(() => {
    fetchDataByCategory();
  }, [
    performanceOptionsSelected,
    statusOptionsSelected,
    searchKeyword,
    searchParams.get("page"),
  ]);

  return (
    <div className="mt-[124px]">
      <section className="mb-10 flex gap-6 justify-center items-center">
        <Dropdown
          data={performanceOptions}
          selectedOption={performanceOptionsSelected}
          onSelect={(selected) => {
            setPerformanceOptionSelected(selected);
            updateSearchParams("category", selected);
            updateSearchParams("page", "1");
          }}
          sizeClassName="w-[170px] h-[30px]"
        />
        <Dropdown
          data={progressStatusOptions}
          selectedOption={statusOptionsSelected}
          onSelect={(selected) => {
            setStatusOptionsSelected(selected);
            updateSearchParams("status", selected);
            updateSearchParams("page", "1");
          }}
          sizeClassName="w-[122px] h-[30px]"
        />
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex justify-between w-[766px] h-9 relative items-center"
        >
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full h-full py-[9px] px-4 bg-transparent outline-none placeholder:body-small-r appearance-none [&::-webkit-search-cancel-button]:hidden border border-gray-20 rounded-full focus:border-blue-7"
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center"
          >
            <Icon name="Search" size={18} className="text-blue-1" />
          </button>
        </form>
      </section>

      <section className="flex justify-center items-center">
        <Map
          center={{
            lat: parseFloat(searchParams.get("lat") || "33.450701"),
            lng: parseFloat(searchParams.get("lng") || "126.570667"),
          }}
        />
      </section>

      <section className="my-20">
        <div className="flex gap-[93px] justify-center flex-wrap mx-auto">
          {isLoading ? (
            <p className="text-center">리스트를 불러오는 중입니다.</p>
          ) : !performanceData?.posts || performanceData.posts.length === 0 ? (
            <p className="text-center">
              {statusOptionsSelected !== "선택"
                ? `선택하신 카테고리에 ${statusOptionsSelected}인 리스트가 없습니다.`
                : "리스트가 없습니다."}
            </p>
          ) : (
            performanceData.posts.map((post) => {
              const dateDisplay =
                post.startDate !== "null" && post.endDate !== "null"
                  ? `${post.startDate} ~ ${post.endDate}`
                  : post.startDate !== "null"
                    ? `시작일 ${post.startDate}`
                    : post.endDate !== "null"
                      ? `종료일 ${post.endDate}`
                      : "날짜 정보 없음";
              return (
                <InformationCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  imageUrl={post.postUrl || "/default-image.png"}
                  date={dateDisplay}
                  location={post.location || "위치 정보 없음"}
                  isBookmarked={post.isBookmarked || false}
                />
              );
            })
          )}
        </div>
      </section>

      {performanceData?.posts && performanceData.posts.length > 0 && (
        <div className="mb-16">
          <Pagination
            totalItems={performanceData?.totalElements || 0}
            itemsPerPage={9}
            currentPage={parseInt(searchParams.get("page") || "1")}
            onPageChange={(page) => updateSearchParams("page", page.toString())}
          />
        </div>
      )}
    </div>
  );
};

export default MapSearch;
