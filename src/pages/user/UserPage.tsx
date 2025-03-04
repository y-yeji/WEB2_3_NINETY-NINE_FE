import { useEffect, useState } from "react";
import PostCard from "../../components/common/PostCard";
import ProfileHeader from "../../components/common/ProfileHeader";
import ScrollToTopButton from "../../components/ui/ScrollToTopButton";
import { TitleBar } from "../../components/ui/TitleBar";
import { PostCardProps } from "../../types/Post";
import api from "../../api/api";
import { UserData } from "../../types/User";

const UserPage = () => {
  const [postData, setPostData] = useState<PostCardProps["post"][]>([]);
  const [userData, setUserData] = useState<UserData>();

  const getUserData = async () => {
    try {
      const response = await api.get("/api/user/1/profile");
      setUserData(response.data.data);
    } catch (error) {
      console.error(`데이터를 불러오는 중 오류 발생:`, error);
      return [];
    }
  };

  const getPostsData = async () => {
    try {
      const endpoint = `/api/users/1/socialPosts`; // 임시 userId 지정 = 1
      const response = await api.get(endpoint);
      setPostData(response.data.posts);
    } catch (error) {
      console.error(`데이터 불러오기 실패:`, error);
    }
  };
  useEffect(() => {
    getUserData();
    getPostsData();
  }, []);

  console.log(userData);
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
        <TitleBar
          title={`${(userData && userData.nickname) || "유저"}의 포스트`}
        />
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

export default UserPage;
