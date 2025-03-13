import { useState } from "react";
import api from "../api/api";

interface NotificationItem {
  notiId: number;
  userId: number;
  senderId: number;
  type: string;
  content: string;
  relatedId: number;
  relatedType: string;
  read: boolean;
  createdAt: string;
  success: boolean;
}

const useNotificationManager = (
  token: string,
  currentUserNickname: string,
  userPosts: number[]
) => {
  const [notificationList, setNotificationList] = useState<NotificationItem[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isDeletingAll, setIsDeletingAll] = useState(false);

  const fetchNotifications = async () => {
    // 알림 목록 가져오기
    if (!token) return;
    setIsLoading(true);
    try {
      const response = await api.get(`/api/notifications`, {
        headers: { Authorization: token },
      });

      if (response.data && response.data.data) {
        const filteredNotifications = response.data.data.filter(
          (notification: NotificationItem) => {
            const regex = /([^님]+)님/;
            const match = notification.content.match(regex);
            const senderNickname = match ? match[1] : null;
            return (
              senderNickname !== currentUserNickname &&
              !userPosts.includes(notification.relatedId)
            );
          }
        );

        setNotificationList(filteredNotifications);
      }
    } catch (error) {
      console.error("알림 목록을 가져오는 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 특정 알림 읽기
  const markAsRead = async (notiId: number) => {
    if (!token) return;
    try {
      const response = await api.patch(
        `/api/notifications/${notiId}/status`,
        {},
        {
          headers: { Authorization: token },
        }
      );
      if (response.data.success === true) {
        setNotificationList((prevList) =>
          prevList.map((notification) =>
            notification.notiId === notiId
              ? { ...notification, read: true }
              : notification
          )
        );
        // fetchNotifications();
      }
    } catch (error) {
      console.error("특정 알림 읽음 처리 실패:", error);
    }
  };

  // 모든 알림 읽기
  const markAllAsRead = async () => {
    if (!token) return;
    try {
      const response = await api.patch(
        `/api/notifications/all/status`,
        {},
        {
          headers: { Authorization: token },
        }
      );
      if (response.data.success === true) {
        setNotificationList((prevList) =>
          prevList.map((notification) => ({ ...notification, read: true }))
        );
      }
    } catch (error) {
      console.error("모든 알림 읽음 처리 실패:", error);
    }
  };

  // 전체 삭제
  const deleteAllNotifications = async () => {
    if (!token) return;
    setIsDeletingAll(true);
    try {
      const response = await api.delete(`/api/notifications`, {
        headers: { Authorization: token },
      });
      if (response.data.success === true) {
        setNotificationList([]);
      }
    } catch (error) {
      console.error("전체 알림 삭제 실패:", error);
    } finally {
      setIsDeletingAll(false);
    }
  };

  return {
    notificationList,
    isLoading,
    isDeletingAll,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteAllNotifications,
  };
};

export default useNotificationManager;
