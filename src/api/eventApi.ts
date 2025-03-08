import api from "../api/api";

export const fetchEventData = async (eventType: string) => {
  try {
    const response = await api.get(`/api/events/${eventType}/random`);
    return response.data;
  } catch (error) {
    console.error(`${eventType} 데이터를 불러오는 중 오류 발생:`, error);
    return [];
  }
};
