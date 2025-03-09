import React from "react";
import InfoCardDetailInfoMap from "../informations/InfoCardDetailInfoMap";

interface InfoCardDetailInfoProps {
  description?: string | null;
  location?: string;
  venue?: string;
  detailImage?: string | null; // API에서 받아온 이미지 URL을 위한 prop 추가
}

const InfoCardDetailInfo: React.FC<InfoCardDetailInfoProps> = ({
  description = null,
  location = "",
  venue = "",
  detailImage = null, // 기본값은 null로 설정
}) => {
  // Prepare location data for the map component
  // This is a placeholder - you'll need to get actual coordinates
  const locationData = {
    lat: 37.5665,
    lng: 126.978,
    address: location,
    venue: venue,
  };

  return (
    <div className="w-[1120px] flex flex-col items-center">
      <div className="w-full mt-10">
        <p className="h4-b text-gray-80 ml-10">상세 정보</p>
        <div className="w-full border-t border-blue-7 mt-4"></div>

        {description && (
          <div className="w-full flex flex-col items-center mt-10 mb-10">
            <div className="w-[746px] text-center">
              <p className="body-large-b font-semibold text-gray-80 mb-4">
                유의 사항
              </p>
              <div className="body-small-m text-gray-80 mt-2 whitespace-pre-wrap">
                {description}
              </div>
            </div>
          </div>
        )}

        {/* API에서 가져온 이미지가 있는 경우에만 이미지 표시 */}
        {detailImage && (
          <div className="flex justify-center mt-8">
            <img
              src={detailImage}
              alt="이벤트 이미지"
              className="w-[746px] h-auto"
            />
          </div>
        )}
      </div>

      <div className="w-full mt-20 mb-28">
        <p className="h4-b text-gray-80 ml-10">찾아가는 길</p>
        <div className="w-full border-t border-blue-7 mt-4"></div>
        <div className="flex justify-center mt-8">
          <div className="w-[746px]">
            {venue && (
              <p className="body-large-b font-semibold text-gray-80 mb-2">
                {venue}
              </p>
            )}
            {location && (
              <p className="body-small-m text-gray-80 mb-6">{location}</p>
            )}
            <InfoCardDetailInfoMap location={locationData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCardDetailInfo;
