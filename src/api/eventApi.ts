import api from "../api/api";

export const fetchEventData = async (eventType: string) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.get(`/api/events/${eventType}/random`, {
      headers: {
        Authorization: token || "",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`${eventType} 데이터를 불러오는 중 오류 발생:`, error);
    return [];
  }
};
