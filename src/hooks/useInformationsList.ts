import { useState, useCallback } from "react";
import api from "../api/api";

const categoryEndpoints: { [key: string]: string } = {
  popups: "popupstores",
  exhibition: "exhibits",
  musical: "performances",
  concert: "festivals",
};

export interface EventData {
  id: number;
  genre: string | null;
  postUrl: string;
  ageRating: string | null;
  title: string;
  startDate: string;
  endDate: string;
  operatingHours: string | null;
  location: string;
  venue: string;
  status: string;
  ticketingWebSite: string | null;
  price: string | null;
  detailImage: string | null;
  description: string | null;
  bookmarked: boolean;
}

interface ApiResponse {
  code: number;
  message: string;
  data: {
    posts: EventData[];
    totalPages: number;
    totalElements: number;
    pageNum: number;
    pageSize: number;
    numberOfElements: number;
  };
  success: boolean;
}

export const useEventsData = (category: string) => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchEvents = useCallback(
    async (page: number, location: string, status: string) => {
      setLoading(true);
      try {
        // 카테고리에 맞는 엔드포인트 결정
        const endpoint = categoryEndpoints[category || ""] || category;

        let region = location;
        if (region === "전체") {
          region = "";
        }

        // API 파라미터 설정
        const params = {
          region: region,
          status: status === "진행 중" ? "진행중" : "진행 예정", // 공백 유지
          pageNum: page - 1, // API는 0부터 시작하는 페이지 번호 사용
          pageSize: 9,
        };

        console.log(
          `Calling API: /api/events/${endpoint} with params:`,
          params
        );

        const response = await api.get<ApiResponse>(`/api/events/${endpoint}`, {
          params,
        });
        console.log("API Response:", response.data);

        setEvents(response.data.data.posts);
        setTotalItems(response.data.data.totalElements);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    },
    [category]
  );

  return { events, totalItems, loading, fetchEvents };
};
