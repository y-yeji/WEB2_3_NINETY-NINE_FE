import { useEffect, useState } from "react";
import { fetchEventData } from "../api/eventApi";

const eventTypes = ["popupstores", "performances", "exhibits", "festivals"];

export const useAllEventData = () => {
  const [data, setData] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const results = await Promise.all(
          eventTypes.map((type) => fetchEventData(type))
        );

        const newData: Record<string, any[]> = {};
        eventTypes.forEach((type, index) => {
          newData[type] = results[index];
        });

        setData(newData);
      } catch (error) {
        console.error("이벤트 데이터를 불러오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);
  return { data, loading };
};
