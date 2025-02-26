import { useState } from "react";
import Main2 from "../../assets/Main2.svg";
import Icon from "../../assets/icons/Icon";

const MyPage = () => {
  const [activeTab, setActiveTab] = useState("myposts");

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
                <Icon name="Settings" />
              </div>
              <div className="flex justify-start mt-[24px] w-[280px]">
                <p className="text-gray-40 body-n-r w-[280px]">
                  관심있는 문화생활 카테고리를 설정해보세요.
                </p>
              </div>
              <p className="text-gray-40 body-n-r w-[280px] mt-[24px]">
                자신을 한 문장으로 소개해주세요.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-[135px] mb-[95px]">
          <div className="w-[1000px] flex justify-center relative">
            <button
              onClick={() => setActiveTab("myposts")}
              className={`flex-1 text-center pb-5 ${
                activeTab === "myposts" ? "text-blue-6" : "text-gray-20"
              }`}
            >
              <p className="h3-b"> 마이 포스트</p>
            </button>
            <button
              onClick={() => setActiveTab("bookmark")}
              className={`flex-1 text-center pb-5 ${
                activeTab === "bookmark" ? "text-blue-6" : "text-gray-20"
              }`}
            >
              <p className="h3-b"> 북마크</p>
            </button>
          </div>
          <div className="relative w-[1000px] h-[4px] bg-gray-20 ">
            <div
              className={`absolute h-full bg-blue-6 transition-all duration-300 ${
                activeTab === "myposts" ? "left-0 w-1/2" : "left-1/2 w-1/2"
              }`}
            />
          </div>
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

export default MyPage;
