export const formatNotificationTime = (createdAt: string): string => {
  // Parse the createdAt string into a Date object
  const createdAtDate = new Date(createdAt);
  const now = new Date();

  // Check if the notification was created on the same day
  if (
    createdAtDate.getFullYear() === now.getFullYear() &&
    createdAtDate.getMonth() === now.getMonth() &&
    createdAtDate.getDate() === now.getDate()
  ) {
    // Format as '오전 11:30' or '오후 7:44'
    const hours = createdAtDate.getHours();
    const minutes = createdAtDate.getMinutes();
    const period = hours < 12 ? "오전" : "오후";
    const formattedHour = hours % 12 || 12; // Convert 0 to 12 for AM/PM
    return `${period} ${formattedHour}:${minutes.toString().padStart(2, "0")}`;
  } else {
    // Format as '25.3.10'
    const year = createdAtDate.getFullYear() % 100; // Get last two digits of the year
    const month = createdAtDate.getMonth() + 1; // Months are zero-based
    const day = createdAtDate.getDate();
    return `${year}.${month}.${day}`;
  }
};
