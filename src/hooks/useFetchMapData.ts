import { useState } from "react";
import api from "../api/api";
import axios, { AxiosError } from "axios";

const useFetchMapData = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("accessToken");

  const fetchData = async (endpoint: string, params: Record<string, any>) => {
    try {
      setIsLoading(true);
      const headers = token ? { Authorization: token } : undefined;

      const response = await api.get(endpoint, {
        params,
        headers,
      });

      let fetchedData = response.data.data as T;
      setData(fetchedData);
      return fetchedData;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          console.error("응답 오류:", axiosError.response.data);
          console.error("응답 상태:", axiosError.response.status);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };
  return { data, isLoading, fetchData };
};

export default useFetchMapData;
