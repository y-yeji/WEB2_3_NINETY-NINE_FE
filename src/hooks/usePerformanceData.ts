import { useEffect } from "react";
import useFetchMapData from "./useFetchMapData";
import { MapSearchResponse } from "../types/mapSearch";

const endpointMap: Record<string, string> = {
  "팝업 스토어": "api/events/popupstores",
  전시회: "api/events/exhibits",
  "뮤지컬 | 연극": "api/events/performances",
  페스티벌: "/api/events/festivals",
};

const statusMapping: Record<string, string> = {
  선택: "",
  진행중: "진행중",
  "오픈 예정": "진행 예정",
};

export const usePerformanceData = (
  performanceOptionsSelected: string,
  statusOptionsSelected: string,
  searchKeyword: string,
  searchParams: URLSearchParams
) => {
  const { data, isLoading, fetchData } = useFetchMapData<MapSearchResponse>();

  const fetchDataByCategory = () => {
    const params: {
      pageNum: number;
      pageSize: number;
      region: string;
      titleKeyword: string;
      status?: string;
    } = {
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

  return { data, isLoading, refetch: fetchDataByCategory };
};
