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
    console.log("현재 경로:", pathname);

    const categoryMap: { [key: string]: string } = {
      popups: "popupStore",
      popupstores: "popupStore",
      exhibition: "exhibit",
      exhibits: "exhibit",
      musical: "performance",
      performances: "performance",
      festival: "festival",
      festivals: "festival",
    };

    for (const [urlPath, apiParam] of Object.entries(categoryMap)) {
      if (pathname.includes(`/informations/${urlPath}`)) {
        console.log(`매핑된 카테고리: ${urlPath} -> ${apiParam}`);
        return apiParam;
      }
    }

    console.log("기본 카테고리로 fallback");
    return "exhibit"; // 현재 경로가 exhibits이므로 기본값 수정
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

      // 요청 파라미터와 현재 경로를 로깅
      const currentPath = window.location.pathname;

      // overrideCategory가 있으면 사용, 없으면 URL에서 추출
      let categoryParam = getCategoryParam();

      if (overrideCategory) {
        // 전달받은 카테고리를 API 매개변수로 변환
        if (overrideCategory === "popupstores") categoryParam = "popupStore";
        else if (overrideCategory === "exhibits") categoryParam = "exhibit";
        else if (overrideCategory === "performances")
          categoryParam = "performance";
        else if (overrideCategory === "festivals") categoryParam = "festival";
        else categoryParam = overrideCategory;
      }

      console.log("북마크 요청 정보:", {
        id,
        categoryParam,
        overrideCategory,
        currentPath,
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

      // 응답 상태 코드로 성공 여부 판단 (204 No Content는 성공)
      if (response.status >= 200 && response.status < 300) {
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
