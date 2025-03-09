import { useEffect, useState } from "react";
import api from "../api/api";

interface BookmarkToggleResult {
  success: boolean;
  newBookmarkStatus: boolean; // Make this non-optional
}

export const useBookmarkState = (
  eventId: number,
  initialBookmarkStatus: boolean,
  eventType: "performances" | "festivals" = "performances"
) => {
  const token = localStorage.getItem("accessToken");
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarkStatus);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch the current bookmark status when component mounts
  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      if (!token) return; // Skip if not logged in

      try {
        const response = await api.get(`/api/events/performances/${eventId}`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        if (response.data?.success) {
          setIsBookmarked(response.data.data.bookmarked);
        }
      } catch (error) {
        console.error("북마크 상태 확인 오류", error);
      }
    };

    fetchBookmarkStatus();
  }, [eventId, token]);

  const toggleBookmark = async (): Promise<BookmarkToggleResult> => {
    setIsLoading(true);
    setError(null);

    try {
      // First update UI optimistically
      const newStatus = !isBookmarked;
      setIsBookmarked(newStatus);

      // Your existing POST request to toggle the bookmark
      const response = await api.post(
        `/api/events/${eventType}/${eventId}/bookmarks`,
        {},
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      console.log("북마크 응답:", response);

      // After toggling, fetch the current status to make sure it matches our expectation
      const updatedResponse = await api.get(
        `/api/events/performances/${eventId}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      if (updatedResponse.data?.success) {
        const actualStatus = updatedResponse.data.data.bookmarked;
        setIsBookmarked(actualStatus);

        return {
          success: true,
          newBookmarkStatus: actualStatus,
        };
      } else {
        // Revert if we couldn't confirm the update
        setIsBookmarked(!newStatus);
        setError("북마크 업데이트 실패");
        return {
          success: false,
          newBookmarkStatus: !newStatus,
        };
      }
    } catch (error) {
      console.error("북마크 토글 오류", error);
      // Revert the optimistic update on error
      setIsBookmarked(!isBookmarked);
      setError("북마크 업데이트 실패");
      return {
        success: false,
        newBookmarkStatus: !isBookmarked,
      };
    } finally {
      setIsLoading(false);
    }
  };

  return { isBookmarked, toggleBookmark, isLoading, error };
};
