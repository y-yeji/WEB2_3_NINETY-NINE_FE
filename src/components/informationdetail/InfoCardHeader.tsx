import Icon from "../../assets/icons/Icon";
import ShareButton from "../../components/informationdetail/ShareButton";
import { ShowInfo } from "../../types/Informationdetail";

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
  return (
    <div className="w-[1120px] h-[470px] mx-auto mt-[130px] rounded-[10px] bg-[#f9f9f9] border border-blue-7 p-9 flex relative">
      <img
        src={showInfo.posterUrl}
        alt="전시 포스터"
        className="w-[300px] h-[400px] ml-20"
      />
      <div className="flex flex-col justify-between ml-32">
        <p className="h3-b font-bold text-left text-gray-80 mb-24 mt-3">
          {showInfo.title}
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-1.5">
            <Icon name="UsersRound" className="w-[18px] h-[18px] ml-0.5" />
            <p className="body-normal-r text-left text-gray-80">
              {showInfo.audience}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon name="CalendarRange" className="w-5 h-5" />
            <p className="body-normal-r text-left text-gray-80">
              {showInfo.period}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon name="MapPin" className="w-5 h-5" />
            <p className="body-normal-r text-left text-gray-80">
              {showInfo.location}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon name="Clock" className="w-[18px] h-[18px] ml-0.5" />
            <p className="body-normal-r text-left text-gray-80">
              {showInfo.times}
            </p>
          </div>
          <div className="flex items-center gap-[5px]">
            <Icon
              name="Pin"
              className="w-[18px] h-[18px] ml-0.5"
              style={{ transform: "rotate(-22.23deg)" }}
            />
            <p className="body-normal-r text-left text-gray-80">
              {showInfo.links}
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
            posterUrl={`http://localhost:5173${showInfo.posterUrl}`}
          />
        </div>
      </div>
    </div>
  );
};

export default InfoCardHeader;
