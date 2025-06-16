import React, { useState } from "react";
import InfoCardDetailInfoMap from "../informations/InfoCardDetailInfoMap";

interface InfoCardDetailInfoProps {
  description?: string | null;
  location?: string;
  venue?: string;
  detailImage?: string | null;
}

const InfoCardDetailInfo: React.FC<InfoCardDetailInfoProps> = ({
  description = null,
  location = "",
  venue = "",
  detailImage = null,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(true);

  // Prepare location data for the map component
  // This is a placeholder - you'll need to get actual coordinates
  const locationData = {
    lat: 37.5665,
    lng: 126.978,
    address: location,
    venue: venue,
  };

  return (
    <div className="w-full max-w-[375px] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1120px] flex flex-col items-center px-4 sm:px-0">
      <div className="w-full mt-10">
        <p className="h4-b text-gray-80 sm:ml-10">상세 정보</p>
        <div className="w-full border-t border-blue-7 mt-4"></div>

        {description && (
          <div className="w-full flex flex-col items-center mt-10 mb-10">
            <div className="w-full sm:w-[746px] text-center">
              <div className="body-small-m text-gray-80 mt-2 whitespace-pre-wrap">
                {description}
              </div>
            </div>
          </div>
        )}

        {/* API에서 가져온 이미지가 있는 경우에만 이미지 표시 */}
        {detailImage && isImageLoaded && (
          <div className="flex justify-center mt-8">
            <img
              src={detailImage}
              alt="이벤트 이미지"
              className="w-full sm:w-[746px] h-auto"
              onError={() => setIsImageLoaded(false)}
            />
          </div>
        )}
      </div>

      <div className="w-full mt-20 mb-28">
        <p className="h4-b text-gray-80 sm:ml-10">찾아가는 길</p>
        <div className="w-full border-t border-blue-7 mt-4"></div>
        <div className="flex justify-center mt-8">
          <div className="w-full sm:w-[746px] px-4 sm:px-0">
            {venue && (
              <p className="body-large-b font-semibold text-gray-80 mb-4">
                🧭 {venue}
              </p>
            )}

            <InfoCardDetailInfoMap location={locationData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCardDetailInfo;
