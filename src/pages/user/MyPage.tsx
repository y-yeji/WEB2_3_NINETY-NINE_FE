import { useEffect, useState } from "react";
import api from "../../api/api";
import ScrollToTopButton from "../../components/ui/ScrollToTopButton";
import ProfileHeader from "../../components/common/ProfileHeader";
import { UserData } from "../../types/User";
import PostCard from "../../components/common/PostCard";
import { PostCardProps } from "../../types/Post";
import { TabNavigation } from "../../components/ui/TabNavigation";

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
            isMyPage={true}
          />
        )}
        <TabNavigation
          tabs={[
            { key: "myposts", label: "마이 포스트" },
            { key: "bookmark", label: "북마크" },
          ]}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <div className="grid grid-cols-3 gap-10 mt-15">
          {postData && postData.length > 0 ? (
            postData.map((post, index) => (
              <PostCard
                key={post.id}
                post={post}
                onLikeUpdate={async () => {}}
              />
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
