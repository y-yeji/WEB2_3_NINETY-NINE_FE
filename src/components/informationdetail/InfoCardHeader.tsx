import Icon from "../../assets/icons/Icon";
import ShareButton from "../../components/informationdetail/ShareButton";
import { ShowInfo } from "../../types/Informationdetail";
import { useDateFormatter } from "../../hooks/useInformationDateFormatter";

interface InfoCardHeaderProps {
  showInfo: ShowInfo;
  isBookmarked: boolean;
  toggleBookmark: () => void;
}

const InfoCardHeader = ({
  showInfo,
  isBookmarked,
  toggleBookmark,
}: InfoCardHeaderProps) => {
  const { formatDatePeriod } = useDateFormatter();

  // 시작일, 종료일 추출 (period에서 분리)
  const extractDates = () => {
    if (!showInfo.period) return { startDate: null, endDate: null };

    // "2023-01-01 ~ 2023-01-31" 형식에서 추출
    if (showInfo.period.includes("~")) {
      const [startDate, endDate] = showInfo.period
        .split("~")
        .map((d) => d.trim());
      return { startDate, endDate };
    }

    // "시작일 2023-01-01" 형식에서 추출
    if (showInfo.period.startsWith("시작일")) {
      return {
        startDate: showInfo.period.replace("시작일", "").trim(),
        endDate: null,
      };
    }

    // "종료일 2023-01-31" 형식에서 추출
    if (showInfo.period.startsWith("종료일")) {
      return {
        startDate: null,
        endDate: showInfo.period.replace("종료일", "").trim(),
      };
    }

    return { startDate: null, endDate: null };
  };

  const { startDate, endDate } = extractDates();

  // 재포맷된 날짜 정보
  const formattedPeriod = formatDatePeriod(startDate, endDate);

  // links 데이터 처리
  const renderLinks = () => {
    // 배열 형태인 경우 (새로운 형식)
    if (Array.isArray(showInfo.links)) {
      if (showInfo.links.length === 0) {
        return "-";
      }

      return showInfo.links.map((link, index) => (
        <span key={index}>
          {index > 0 && <span className="mx-1">|</span>}
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-6 hover:underline"
          >
            {link.siteName}
          </a>
        </span>
      ));
    }

    // 문자열인 경우 (기존 형식)
    return showInfo.links;
  };

  return (
    <div className="w-[1120px] h-[470px] mx-auto mt-[130px] rounded-[10px] bg-[#f9f9f9] border border-blue-7 p-9 flex relative">
      <img
        src={showInfo.posterUrl}
        alt="전시 포스터"
        className="w-[300px] h-[400px] ml-20"
        onError={(e) => {
          e.currentTarget.src = "/default-image.png";
        }}
      />
      <div className="flex flex-col justify-between ml-32">
        <p className="h3-b font-bold text-left text-gray-80 mb-12 md:mb-16 lg:mb-2 mt-3">
          {showInfo.title}
        </p>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1.5">
            <Icon name="UsersRound" className="w-[18px] h-[18px] ml-0.5" />
            <p className="body-normal-r text-left text-gray-80">
              {showInfo.audience}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon name="CalendarRange" className="w-5 h-5" />
            <p className="body-normal-r text-left text-gray-80">
              {formattedPeriod}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon name="MapPin" className="w-5 h-5" />
            <p className="body-normal-r text-left text-gray-80">
              {showInfo.location}
            </p>
          </div>
          <div className="flex items-start gap-1.5">
            <Icon
              name="Clock"
              className="w-[18px] h-[18px] ml-0.5 flex-shrink-0 mt-1"
            />
            <p className="body-normal-r text-left text-gray-80">
              {showInfo.times}
            </p>
          </div>

          <div className="flex items-start gap-[5px]">
            <Icon
              name="Pin"
              className="w-[18px] h-[18px] ml-0.5 flex-shrink-0 mt-1"
              style={{ transform: "rotate(-22.23deg)" }}
            />
            <p className="body-normal-r text-left text-gray-80">
              {renderLinks()}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon name="Tickets" className="w-[18px] h-[18px] ml-0.5" />
            <p className="body-normal-r text-left text-gray-80">
              {showInfo.price}
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-2 absolute bottom-7 right-7">
        <button
          className="w-8 h-8 rounded-[8px] bg-blue-6 hover:bg-blue-6/80 flex justify-center items-center"
          onClick={toggleBookmark}
        >
          <Icon
            name="Bookmark"
            className="w-6 h-6 text-white"
            fill={isBookmarked ? "white" : "none"}
          />
        </button>
        <div className="flex justify-center items-center">
          <ShareButton
            url={window.location.href}
            title={showInfo.title}
            posterUrl={showInfo.posterUrl}
          />
        </div>
      </div>
    </div>
  );
};

export default InfoCardHeader;
