export const formatNotificationTime = (createdAt: string): string => {
  const createdAtDate = new Date(createdAt);
  const now = new Date();

  const isSameDay =
    createdAtDate.getFullYear() === now.getFullYear() &&
    createdAtDate.getMonth() === now.getMonth() &&
    createdAtDate.getDate() === now.getDate();

  if (isSameDay) {
    return new Intl.DateTimeFormat("ko-KR", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(createdAtDate);
  } else {
    return new Intl.DateTimeFormat("ko-KR", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    }).format(createdAtDate);
  }
};
