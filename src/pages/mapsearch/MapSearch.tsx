import React, { useEffect } from "react";
import SearchForm from "./SearchForm";
import Map from "./Map";
import Pagination from "../../components/ui/Pagination";
import MappageInfomationCardList from "./MappageInfomationCardList";
import useSearchFilters from "../../hooks/useSearchFilters";
import { usePerformanceData } from "../../hooks/usePerformanceData";
import { useCategoryMapper } from "../../hooks/useInfoCardMapper";

const performanceOptions = [
  "카테고리 선택",
  "팝업 스토어",
  "전시회",
  "뮤지컬 | 연극",
  "페스티벌",
];
const progressStatusOptions = ["선택", "진행중", "오픈 예정"];

const MapSearch: React.FC = () => {
  const { mapToApiCategory } = useCategoryMapper();
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

  useEffect(() => {}, [performanceData]);

  useEffect(() => {
    if (performanceData?.posts) {
    }
  }, [performanceData, performanceOptionsSelected]);

  return (
    <div className="flex flex-col justify-center xm:mt-[160px] max-xm:mt-[120px]">
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

      <section className="flex justify-center items-center w-full ">
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
          posts={performanceData?.posts.map((post) => {
            // 이 부분 수정
            let mappedCategory = post.category;
            if (!mappedCategory && post.genre) {
              mappedCategory = mapToApiCategory(post.genre);
            } else if (!mappedCategory) {
              mappedCategory = mapToApiCategory(performanceOptionsSelected);
            }

            return {
              ...post,
              isBookmarked: post.bookmarked || false,
              category: mappedCategory,
              apiCategory: mappedCategory, // apiCategory도 함께 전달
            };
          })}
          isLoading={isLoading}
        />
      </section>

      {performanceData?.posts && performanceData.posts.length > 0 && (
        <div className="sm:my-20 sm:block xm:hidden max-xm:hidden">
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
