import { useParams } from "react-router-dom";

export const useTitleFormatter = () => {
  const { category } = useParams<{ category: string }>();

  const formatTitle = (title: string, categoryOverride?: string): string => {
    const currentCategory = categoryOverride || category;

    // 팝업스토어 카테고리인 경우에만 처리
    if (currentCategory === "popups" || currentCategory === "popupstores") {
      // 해시태그가 있는 경우
      if (title.includes("#")) {
        // 문자열 끝에 있는 해시태그들 추출
        const hashtagPart = title.substring(title.indexOf("#"));

        // 공백으로 분리된 해시태그들을 배열로 만듦
        const hashtags = hashtagPart
          .split(/\s+/)
          .filter((tag) => tag.startsWith("#"));

        // 해시태그가 하나만 있는 경우
        if (hashtags.length === 1) {
          // 유일한 해시태그 사용
          return hashtags[0].substring(1); // '#' 제거
        } else if (hashtags.length >= 2) {
          // "#광고" 확인
          if (hashtags.includes("#광고") && hashtags.length >= 3) {
            // "#광고"가 있으면 3번째 해시태그 사용
            const thirdHashtag = hashtags[2];
            return thirdHashtag.substring(1); // '#' 제거
          } else {
            // 그렇지 않으면 2번째 해시태그 사용
            const secondHashtag = hashtags[1];
            return secondHashtag.substring(1); // '#' 제거
          }
        }
      }
      // 해시태그가 없지만 물음표가 있는 경우
      else if (title.includes("?")) {
        // 첫 번째 물음표까지의 텍스트 추출
        return title.substring(0, title.indexOf("?") + 1);
      }
    }

    // 팝업스토어가 아니거나 해시태그와 물음표가 모두 없는 경우 원래 제목 반환
    return title;
  };

  return { formatTitle };
};
