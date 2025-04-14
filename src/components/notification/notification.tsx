import { forwardRef } from "react";
import Icon from "../../assets/icons/Icon";
import NotificationItem from "./NotificationItem";
import NotificationHeader from "./NotificationHeader";

interface NotificationProps {
  isOpen: boolean;
  onClose: () => void;
  notificationList: Array<{
    notiId: number;
    type: string;
    content: string;
    createdAt: string;
    read: boolean;
    relatedId?: number;
    relatedType?: string;
  }>;
  onRead: (notiId: number) => void;
  onMarkAllAsRead: () => void;
  onDeleteAllNotifications: () => void;
  isLoading?: boolean;
}

const Notification = forwardRef<HTMLDivElement, NotificationProps>(
  (
    {
      isOpen,
      onClose,
      notificationList,
      onRead,
      onMarkAllAsRead,
      onDeleteAllNotifications,
      isLoading,
    },
    ref
  ) => {
    if (!isOpen) return null;

    const isScrollable = notificationList.length >= 6;

    const sortNotifications = notificationList.slice().sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return (
      <article
        ref={ref}
        className="fixed top-[-25px] right-[352px] z-30 w-[460px] h-[486px] mt-[84px] pt-[22px] px-[25px] bg-blue-7 border border-base-2 rounded text-blue-1 shadow-user-postcard-shadow"
      >
        <button onClick={onClose} className="absolute top-4 right-5">
          <Icon name="X" size={20} />
        </button>

        {/* 헤더 */}
        <NotificationHeader
          onMarkAllAsRead={onMarkAllAsRead}
          onDeleteAllNotifications={onDeleteAllNotifications}
        />

        {/* 내용 */}
        <section className="notification-container">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <p className="body-small-r text-center text-base-2">
                알림 목록을 로딩 중 입니다.
              </p>
            </div>
          ) : notificationList.length === 0 ? (
            <div className="flex justify-center items-center w-[380px] h-[360px]">
              <p className="body-small-r text-center text-base-2">
                알림이 없습니다.
              </p>
            </div>
          ) : (
            <ul>
              {sortNotifications.map((notification) => (
                <NotificationItem
                  key={notification.notiId}
                  notification={notification}
                  onRead={onRead}
                  isScrollable={isScrollable}
                />
              ))}
            </ul>
          )}
        </section>
      </article>
    );
  }
);

export default Notification;
