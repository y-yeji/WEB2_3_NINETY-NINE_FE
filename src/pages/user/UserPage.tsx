import Main2 from "../../assets/Main2.svg";
import setting from "../../assets/setting.svg";
import concert from "../../assets/concert.svg";
import play from "../../assets/play.svg";
import musical from "../../assets/musical.svg";

const UserPage = () => {
  return (
    <div className="w-full flex flex-col mx-auto ">
      <div className="mt-[108px] max-w-[1280px] mx-auto p-6">
        <div className="w-full flex flex-col items-center mt-[50px]">
          <div className="flex items-center gap-[54px]">
            <div className="w-[150px] h-[150px] bg-blue-1 text-white flex items-center justify-center rounded-full text-lg font-bold">
              On culture
            </div>
            <div className="flex flex-col justify-center h-[150px]">
              <div className="flex items-center">
                <h2 className="text-lg font-semibold w-[240px]">NINETY9</h2>
                <img src={setting} alt="로고" className="w-6 h-6 ml-[15px]" />
              </div>
              <div className="flex justify-start gap-[10px] mt-[24px] w-[280px]">
                <img src={concert} alt="콘서트" />
                <img src={play} alt="연극" />
                <img src={musical} alt="뮤지컬" />
              </div>
              <p className="text-gray-40 body-n-r w-[280px] mt-[24px]">
                자신을 한 문장으로 소개해주세요.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-[135px] mb-[95px]">
          <div className="w-[1000px] flex justify-center relative">
            <button className="text-center pb-5 ">
              <p className="h3-b text-blue-6">NINETY9의 포스트</p>
            </button>
          </div>

          <div className="relative w-[1000px] h-[4px] bg-blue-6 flex justify-center"></div>
        </div>

        <div className="grid grid-cols-3 gap-10 mt-15">
          {[...Array(20)].map((_, index) => (
            <div
              key={index}
              className="w-[300px] h-[300px] border rounded-[10px] bg-cover bg-center"
              style={{ backgroundImage: `url(${Main2})` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
