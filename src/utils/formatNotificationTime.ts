export const formatNotificationTime = (createdAt: string): string => {
  const createdAtDate = new Date(createdAt);

  const kstDate = new Date(createdAtDate.getTime() + 9 * 60 * 60 * 1000);
  const now = new Date();
  const nowKST = new Date(now.getTime() + 9 * 60 * 60 * 1000);

  if (
    kstDate.getFullYear() === nowKST.getFullYear() &&
    kstDate.getMonth() === nowKST.getMonth() &&
    kstDate.getDate() === nowKST.getDate()
  ) {
    const hours = kstDate.getHours();
    const minutes = kstDate.getMinutes();
    const period = hours < 12 ? "오전" : "오후";
    const formattedHour = hours % 12 || 12;
    return `${period} ${formattedHour}:${minutes.toString().padStart(2, "0")}`;
  } else {
    const year = kstDate.getFullYear() % 100;
    const month = kstDate.getMonth() + 1;
    const day = kstDate.getDate();
    return `${year}.${month}.${day}`;
  }
};
