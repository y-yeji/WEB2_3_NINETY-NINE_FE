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
      festival: "festival",
      팝업스토어: "popupStore",
      전시회: "exhibit",
      "뮤지컬 | 연극": "performance",
      공연: "performance",
      페스티벌: "festival",
      축제: "festival",
    };

    for (const [urlPath, apiParam] of Object.entries(categoryMap)) {
      if (pathname.includes(`/informations/${urlPath}`)) {
        return apiParam;
      }
    }
    return "performance"; // Default fallback
  };

  const toggleBookmark = async (
    overrideCategory?: string
  ): Promise<BookmarkToggleResult> => {
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
      // UI 먼저 낙관적으로 업데이트
      const newStatus = !isBookmarked;
      setIsBookmarked(newStatus);

      // overrideCategory가 있으면 사용, 없으면 URL에서 추출
      const categoryParam = overrideCategory
        ? overrideCategory === "popupstores"
          ? "popupStore"
          : overrideCategory === "exhibits"
            ? "exhibit"
            : overrideCategory === "performances"
              ? "performance"
              : overrideCategory === "festivals"
                ? "festival"
                : overrideCategory
        : getCategoryParam();

      console.log("북마크 요청 정보:", {
        id,
        categoryParam,
        overrideCategory,
        currentPath: window.location.pathname,
      });

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
