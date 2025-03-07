// commentDateUtils.ts
export const formatCommentDate = (
  dateString: string,
  currentTime: Date = new Date()
) => {
  const parsedDate = new Date(dateString);

  // 현재 시간을 UTC로 가져오기
  const currentTimeUTC = new Date(
    Date.UTC(
      currentTime.getUTCFullYear(),
      currentTime.getUTCMonth(),
      currentTime.getUTCDate(),
      currentTime.getUTCHours(),
      currentTime.getUTCMinutes(),
      currentTime.getUTCSeconds()
    )
  );

  // 댓글 시간을 UTC로 변환
  const commentDateUTC = new Date(
    Date.UTC(
      parsedDate.getUTCFullYear(),
      parsedDate.getUTCMonth(),
      parsedDate.getUTCDate(),
      parsedDate.getUTCHours(),
      parsedDate.getUTCMinutes(),
      parsedDate.getUTCSeconds()
    )
  );

  const diffInMs = currentTimeUTC.getTime() - commentDateUTC.getTime();

  if (diffInMs < 0) {
    return "방금 전";
  }

  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) {
    return "방금 전";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  } else if (diffInDays < 2) {
    return "어제";
  } else {
    return commentDateUTC
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\. /g, ".")
      .replace(/\.$/, "");
  }
};
