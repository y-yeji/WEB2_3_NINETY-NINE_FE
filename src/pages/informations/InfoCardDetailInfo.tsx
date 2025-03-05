import InfoCardDetailInfoMap from "../informations/InfoCardDetailInfoMap";

interface InfoData {
  images?: string[];
  title?: string;
  description?: string;
  location?: { lat: number; lng: number };
}

const dummyInfoData: InfoData = {
  images: ["/info-ex-image.png"],
  title: "유의 사항",
  description:
    "화,목,금 7시 30분│수 2시 30분, 7시 30분 │ 토,일, 공휴일 2시, 7시│월 공연 없음",
  location: { lat: 37.5665, lng: 126.978 }, // 서울 시청의 위도와 경도
};

const InfoCardDetailInfo = () => {
  return (
    <div className="w-[1125px] flex flex-col items-center">
      <div className="w-full mt-10">
        <p className="h4-b text-gray-80 ml-10">상세 정보</p>
        <div className="w-full border-t border-blue-7 mt-4"></div>

        {(dummyInfoData.title || dummyInfoData.description) && (
          <div className="w-full flex flex-col items-center mt-10 mb-10">
            <div className="w-[746px] text-center">
              {dummyInfoData.title && (
                <p className="body-large-b font-semibold text-gray-80">
                  {dummyInfoData.title}
                </p>
              )}
              {dummyInfoData.description && (
                <p className="body-small-m text-gray-80 mt-2">
                  {dummyInfoData.description}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-center">
          {dummyInfoData.images && dummyInfoData.images.length > 0 && (
            <img
              src={dummyInfoData.images[0]}
              alt="예시 포스터"
              className="w-[746px] h-auto"
            />
          )}
        </div>
      </div>

      <div className="w-full mt-20 mb-28">
        <p className="h4-b text-gray-80 ml-10">찾아가는 길</p>
        <div className="w-full border-t border-blue-7 mt-4"></div>
        <div className="flex justify-center">
          <InfoCardDetailInfoMap />
        </div>
      </div>
    </div>
  );
};

export default InfoCardDetailInfo;
