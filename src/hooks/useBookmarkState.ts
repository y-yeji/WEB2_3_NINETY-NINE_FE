import { useEffect, useState } from "react";
import api from "../api/api";

interface BookmarkToggleResult {
  success: boolean;
  newBookmarkStatus: boolean;
}

export const useBookmarkState = (
  id: number,
  initialBookmarkStatus: boolean
) => {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarkStatus);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsBookmarked(initialBookmarkStatus);
  }, [initialBookmarkStatus]);

  // Map category from URL path to API parameter
  const getCategoryParam = (): string => {
    const pathname = window.location.pathname;
    const categoryMap: { [key: string]: string } = {
      popups: "popupStore",
      exhibition: "exhibit",
      musical: "performance",
      concert: "festival",
    };

    for (const [urlPath, apiParam] of Object.entries(categoryMap)) {
      if (pathname.includes(`/informations/${urlPath}`)) {
        return apiParam;
      }
    }
    return "performance"; // Default fallback
  };

  const toggleBookmark = async (): Promise<BookmarkToggleResult> => {
    setIsLoading(true);
    setError(null);
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setIsLoading(false);
      return {
        success: false,
        newBookmarkStatus: isBookmarked,
      };
    }

    try {
      // Update UI optimistically
      const newStatus = !isBookmarked;
      setIsBookmarked(newStatus);

      // Get the correct category parameter
      const categoryParam = getCategoryParam();

      // Make API request to toggle bookmark
      const response = await api.post(
        `/api/events/${id}/bookmarks?genre=${categoryParam}`,
        {},
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      console.log("북마크 응답:", response);

      // Check if the request was successful
      if (response.data?.success) {
        return {
          success: true,
          newBookmarkStatus: newStatus,
        };
      } else {
        // Revert if API call was not successful
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
        newBookmarkStatus: isBookmarked,
      };
    } finally {
      setIsLoading(false);
    }
  };

  return { isBookmarked, toggleBookmark, isLoading, error };
};
