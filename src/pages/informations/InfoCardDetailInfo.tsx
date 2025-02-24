interface InfoData {
  imageUrl: string;
  title?: string;
  description?: string;
}

const dummyInfoData: InfoData = {
  imageUrl: "/info-ex-image.png",
  title: "유의 사항",
  description:
    "화,목,금 7시 30분│수 2시 30분, 7시 30분 │ 토,일, 공휴일 2시, 7시│월 공연 없음",
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
          <img
            src={dummyInfoData.imageUrl}
            alt="예시 포스터"
            className="w-[746px] h-auto"
          />
        </div>
      </div>

      <div className="w-full mt-20 mb-28">
        <p className="h4-b text-gray-80 ml-10">찾아가는 길</p>
        <div className="w-full border-t border-blue-7 mt-4"></div>
        <div className="flex justify-center">
          <img
            src="/map-ex-image.png"
            alt="맵"
            className="w-[1080px] h-auto mt-10 shadow-inner border border-gray-20"
          />
        </div>
      </div>
    </div>
  );
};

export default InfoCardDetailInfo;
