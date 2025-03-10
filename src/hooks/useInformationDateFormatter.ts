import { useCallback } from "react";

/**
 * 시작일과 종료일 정보를 포맷팅하는 훅
 * @returns 날짜 포맷팅 관련 유틸리티 함수들
 */
export const useDateFormatter = () => {
  /**
   * 시작일과 종료일 정보를 기반으로 포맷팅된 기간 문자열을 반환합니다
   * @param startDate 시작일
   * @param endDate 종료일
   * @returns 포맷팅된 기간 문자열
   */
  const formatDatePeriod = useCallback(
    (startDate?: string | null, endDate?: string | null) => {
      // null, undefined, "null" 문자열 처리
      const validStartDate =
        startDate && startDate !== "null" ? startDate : null;
      const validEndDate = endDate && endDate !== "null" ? endDate : null;

      if (validStartDate && validEndDate) {
        return `${validStartDate} ~ ${validEndDate}`;
      } else if (validStartDate) {
        return `시작일 ${validStartDate}`;
      } else if (validEndDate) {
        return `종료일 ${validEndDate}`;
      }

      return "날짜 정보 없음";
    },
    []
  );

  return {
    formatDatePeriod,
  };
};
