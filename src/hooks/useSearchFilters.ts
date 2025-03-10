import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const useSearchFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchKeyword, setSearchKeyword] = useState(
    searchParams.get("keyword") || ""
  );
  const [performanceOptionsSelected, setPerformanceOptionSelected] = useState(
    searchParams.get("category") || "카테고리 선택"
  );
  const [statusOptionsSelected, setStatusOptionsSelected] = useState(
    searchParams.get("status") || "선택"
  );

  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    setSearchParams(params);
  };

  return {
    searchKeyword,
    performanceOptionsSelected,
    statusOptionsSelected,
    setSearchKeyword,
    setPerformanceOptionSelected,
    setStatusOptionsSelected,
    updateSearchParams,
    searchParams,
  };
};
export default useSearchFilters;
