import { useLocation } from "react-router-dom";

// 카테고리 매핑 타입
interface CategoryMappings {
  [key: string]: string;
}

// 카테고리 매핑을 위한 커스텀 훅
export const useCategoryMapper = () => {
  const location = useLocation();

  // 모든 카테고리 매핑 정의
  const categoryMappings: CategoryMappings = {
    // UI 경로와 이름
    popups: "popupstores",
    exhibition: "exhibits",
    musical: "performances",
    festival: "festivals",
    // 한글 카테고리 이름
    팝업스토어: "popupstores",
    전시회: "exhibits",
    공연: "performances",
    뮤지컬: "performances",
    연극: "performances",
    콘서트: "festivals",
    축제: "festivals",
    "뮤지컬 | 연극": "performances",
    // API 경로는 그대로 유지
    popupstores: "popupstores",
    exhibits: "exhibits",
    performances: "performances",
    festivals: "festivals",
  };

  // 현재 경로에서 카테고리 추출
  const extractCategoryFromPath = (): string => {
    if (location.pathname.includes("informations")) {
      const pathSegments = location.pathname.split("/");
      const pathIndex = pathSegments.indexOf("informations");
      if (pathIndex >= 0 && pathIndex + 1 < pathSegments.length) {
        return pathSegments[pathIndex + 1];
      }
    }
    return "";
  };

  // 카테고리를 API 경로로 변환하는 함수
  const mapToApiCategory = (category: string): string => {
    if (!category || category === "카테고리 선택") {
      return "popupstores";
    }

    if (categoryMappings[category]) {
      return categoryMappings[category];
    }

    const pathCategory = extractCategoryFromPath();
    if (pathCategory && categoryMappings[pathCategory]) {
      return categoryMappings[pathCategory];
    }

    return category;
  };

  // 한글 카테고리 이름 반환
  const getCategoryTitle = (apiCategory: string): string => {
    const reverseMappings: CategoryMappings = {
      popupstores: "팝업스토어",
      exhibits: "전시회",
      performances: "뮤지컬 | 연극",
      festivals: "페스티벌",
    };

    return reverseMappings[apiCategory] || apiCategory;
  };

  return {
    mapToApiCategory,
    getCategoryTitle,
    currentPathCategory: extractCategoryFromPath(),
  };
};
