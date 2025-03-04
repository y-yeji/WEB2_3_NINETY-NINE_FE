import { useEffect, useState } from "react";
import api from "../../api/api";
import ScrollToTopButton from "../../components/ui/ScrollToTopButton";
import ProfileHeader from "../../components/common/ProfileHeader";
import { UserData } from "../../types/User";
import PostCard from "../../components/common/PostCard";
import { PostCardProps } from "../../types/Post";

const MyPage = () => {
  const [activeTab, setActiveTab] = useState("myposts");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [postData, setPostData] = useState<PostCardProps["post"][]>([]);

  const getUserData = async () => {
    try {
      const response = await api.get("/api/profile");
      setUserData(response.data.data);
    } catch (error) {
      console.error(`데이터를 불러오는 중 오류 발생:`, error);
      return [];
    }
  };

  const getPostsData = async () => {
    try {
      if (!userData) return;
      const endpoint = `/api/users/1/socialPosts`; // 임시 userId 지정 = 1
      const response = await api.get(endpoint);
      setPostData(response.data.posts);
    } catch (error) {
      console.error(`데이터 불러오기 실패:`, error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (activeTab === "myposts") {
      getPostsData();
    } else {
      setPostData([]);
    }
  }, [activeTab, userData]);
  
  return (
    <div className="w-full flex flex-col mx-auto ">
      <div className="mt-[108px] max-w-[1280px] mx-auto p-6">
        {userData && (
          <ProfileHeader
            nickname={userData.nickname}
            description={userData.description}
            interests={userData.interests}
            profileImage={userData.profileImage}
          />
        )}
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
          {postData && postData.length > 0 ? (
            postData.map((post, index) => (
              <PostCard key={index} post={post} onLikeUpdate={async () => {}} />
            ))
          ) : (
            <p className="text-gray-40">해당 데이터가 없습니다.</p>
          )}
        </div>
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default MyPage;
