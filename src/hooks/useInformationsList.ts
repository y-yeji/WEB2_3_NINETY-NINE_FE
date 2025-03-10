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
        const endpoint = categoryEndpoints[category || ""] || category;
        let region = location === "전체" ? "" : location;

        // 토큰 가져오기
        const token = localStorage.getItem("accessToken");

        const params = {
          region: region,
          status: status === "진행 중" ? "진행중" : "진행 예정",
          pageNum: page - 1,
          pageSize: 9,
        };

        const headers = token ? { Authorization: token } : {};

        const response = await api.get<ApiResponse>(`/api/events/${endpoint}`, {
          params,
          headers, // 토큰이 있으면 헤더에 추가
        });
        // useEventsData에서
        console.log("API Response with auth token:", response.data);
        console.log("Events with bookmark status:", response.data.data.posts);
        console.log("API Response:", response.data);
        setEvents(response.data.data.posts);
        setTotalItems(response.data.data.totalElements);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    },
    [category]
  );

  return { events, totalItems, loading, fetchEvents };
};
