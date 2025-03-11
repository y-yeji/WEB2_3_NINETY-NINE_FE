export const formatCommentDate = (utcDate: string): string => {
  const commentDate = new Date(utcDate);
  const now = new Date();

  const kstCommentDate = new Date(commentDate.getTime() + 9 * 60 * 60 * 1000);

  const diffInMs = now.getTime() - kstCommentDate.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 0) {
    return "방금 전";
  }

  if (diffInSeconds < 60) {
    return `${diffInSeconds}초 전`;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  } else if (diffInDays === 1) {
    return "어제";
  } else {
    return kstCommentDate
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\./g, ".")
      .trim();
  }
};
