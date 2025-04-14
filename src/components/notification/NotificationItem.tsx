import { NavLink } from "react-router-dom";
import { formatNotificationTime } from "../../utils/formatNotificationTime";

const NotificationItem = ({
  notification,
  onRead,
  isScrollable = false,
}: {
  notification: {
    type: string;
    relatedId?: number;
    relatedType?: string;
    notiId: number;
    read: boolean;
    createdAt: string;
    content: string;
  };
  onRead: (notiId: number) => void;
  isScrollable?: boolean;
}) => {
  const getNotificationLabel = (type: string) => {
    switch (type) {
      case "comment":
        return "댓글";
      case "like":
        return "좋아요";
      case "ticket":
        return "티켓 오픈";
      case "opening":
        return "행사 시작";
      case "closing":
        return "행사 종료";
      default:
        return "알림";
    }
  };

  const getNotificationPath = (
    type: string,
    relatedId?: number,
    relatedType?: string
  ): string => {
    if (!type || !relatedId || !relatedType) {
      console.error("유효하지 않은 알림 데이터:", {
        type,
        relatedId,
        relatedType,
      });
      return `/notification/${relatedId}`;
    }

    switch (relatedType) {
      case "POST":
        return `/community/${relatedId}`;
      case "EXHIBIT":
        return `/informations/exhibits/${relatedId}`;
      case "PERFORMANCE":
        return `/api/events/performances/${relatedId}`;
      case "FESTIVAL":
        return `/informations/festivals/${relatedId}`;
      case "POPUPSTORE":
        return `/informations/popupstores/${relatedId}`;
      default:
        console.warn("알 수 없는 관련 타입:", relatedType);
        return `/notification/${relatedId}`;
    }
  };

  return (
    <li
      className={`${
        isScrollable ? "w-[376px]" : "w-[400px]"
      } h-[60px] px-[10px] py-2 rounded mb-[10px] ${
        !notification.read ? "bg-white" : "bg-base-1"
      }`}
      onClick={() => onRead(notification.notiId)}
    >
      <NavLink
        to={getNotificationPath(
          notification.type,
          notification.relatedId,
          notification.relatedType
        )}
      >
        <div className={notification.read ? "text-gray-30" : ""}>
          <p
            className={`flex items-center justify-between mb-1 ${
              notification.read ? "text-gray-30" : "text-blue-1"
            }`}
          >
            <span className="body-small-m">
              {getNotificationLabel(notification.type)}
            </span>
            <span className="body-small-r">
              {formatNotificationTime(notification.createdAt)}
            </span>
          </p>
          <p
            className={`body-small-r ${
              notification.read ? "text-gray-30" : "text-blue-5"
            }`}
          >
            {notification.content}
          </p>
        </div>
      </NavLink>
    </li>
  );
};

export default NotificationItem;
