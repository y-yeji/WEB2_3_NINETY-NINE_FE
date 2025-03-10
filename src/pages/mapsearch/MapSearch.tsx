import React, { useEffect } from "react";
import SearchForm from "./SearchForm";
import Map from "./Map";
import Pagination from "../../components/ui/Pagination";
import MappageInfomationCardList from "./MappageInfomationCardList";
import useSearchFilters from "../../hooks/useSearchFilters";
import { usePerformanceData } from "../../hooks/usePerformanceData";

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
    refetch,
  } = usePerformanceData(
    performanceOptionsSelected,
    statusOptionsSelected,
    searchKeyword,
    searchParams
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  useEffect(() => {
    console.log("performanceData.posts:", performanceData?.posts);
  }, [performanceData]);

  return (
    <div className="mt-[160px]">
      <SearchForm
        performanceOptions={performanceOptions}
        progressStatusOptions={progressStatusOptions}
        performanceOptionsSelected={performanceOptionsSelected}
        statusOptionsSelected={statusOptionsSelected}
        searchKeyword={searchKeyword}
        setPerformanceOptionSelected={(selected) => {
          setPerformanceOptionSelected(selected);
          updateSearchParams("category", selected);
          updateSearchParams("page", "1");
        }}
        setStatusOptionsSelected={(selected) => {
          setStatusOptionsSelected(selected);
          updateSearchParams("status", selected);
          updateSearchParams("page", "1");
        }}
        setSearchKeyword={setSearchKeyword}
        onSubmitSearch={handleSearchSubmit}
      />

      <section className="flex justify-center items-center">
        <Map
          center={{
            lat: parseFloat(searchParams.get("lat") || "37.5665"),
            lng: parseFloat(searchParams.get("lng") || "126.9780"),
          }}
          posts={performanceData?.posts}
        />
      </section>

      <section className="my-10">
        <MappageInfomationCardList
          posts={performanceData?.posts.map((post) => ({
            ...post,
            isBookmarked: post.isBookmarked || false, // 기본값 설정
            category: performanceOptionsSelected, // 현재 선택된 카테고리 전달
          }))}
          isLoading={isLoading}
        />
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
