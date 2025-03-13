import { useEffect, useState } from "react";
import api from "../../api/api";
import ScrollToTopButton from "../../components/ui/ScrollToTopButton";
import ProfileHeader from "../../components/common/ProfileHeader";
import { UserData } from "../../types/user";
import PostCard from "../../components/common/PostCard";
import { PostCardProps } from "../../types/Post";
import { TabNavigation } from "../../components/ui/TabNavigation";
import { BookMarkProps } from "../../types/bookmark";
import InformationCard from "../../components/common/InformationCard";

const MyPage = () => {
  const [activeTab, setActiveTab] = useState("myposts");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [postData, setPostData] = useState<PostCardProps["post"][]>([]);
  const [bookmarkData, setBookMarkData] = useState<BookMarkProps["post"][]>([]);

  const getUserData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.get("/api/profile", {
        headers: { Authorization: token },
      });
      setUserData(response.data.data);
    } catch (error) {
      console.error("데이터를 불러오는 중 오류 발생:", error);
    }
  };

  const getPostsData = async () => {
    try {
      if (!userData) return;
      const response = await api.get(
        `/api/users/${userData.id}/socialPosts?pageNum=0&pageSize=100`
      );
      setPostData(response.data.data.posts);
    } catch (error) {
      console.error("마이 포스트 데이터 불러오기 실패:", error);
    }
  };

  const getBookMarkData = async () => {
    try {
      if (!userData) return;
      const token = localStorage.getItem("accessToken");
      const response = await api.get(
        "/api/bookmarks/my-events?pageNum=0&pageSize=100",
        {
          headers: { Authorization: token },
        }
      );
      setBookMarkData(response.data.data.posts);
    } catch (error) {
      console.error("북마크 데이터 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (activeTab === "myposts") {
      getPostsData();
      setBookMarkData([]);
    } else if (activeTab === "bookmark") {
      getBookMarkData();
      setPostData([]);
    }
  }, [activeTab, userData]);
  const cleanImageUrl = (url: string): string => {
    if (!url) return "/default-image.png";

    // 대괄호 제거
    return url.replace(/^\[|\]$/g, "");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "myposts":
        return (
          <div className="grid grid-cols-3 gap-10 mt-15">
            {postData.length > 0 ? (
              postData.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLikeToggle={async () => {}}
                />
              ))
            ) : (
              <div className="col-span-3 flex justify-center items-center h-[200px]">
                <p className="text-gray-40 text-center">
                  아직 작성한 포스트가 없습니다.
                  <span className="block mt-3">포스트를 작성해보세요.</span>
                </p>
              </div>
            )}
          </div>
        );
      case "bookmark":
        return (
          <div className="grid grid-cols-3 gap-10 mt-15">
            {bookmarkData.length > 0 ? (
              bookmarkData.map((post) => {
                // 한글 카테고리를 영문으로 변환하는 함수
                const getCategoryFromKorean = (koreanGenre: string): string => {
                  const categoryMap: Record<string, string> = {
                    팝업스토어: "popups",
                    전시회: "exhibit",
                    연극: "performances",
                    축제: "festivals",
                  };
                  return categoryMap[koreanGenre] || "popups"; // 기본값 설정
                };

                // API 카테고리 변환
                const getApiCategoryFromKorean = (
                  koreanGenre: string
                ): string => {
                  const categoryMap: Record<string, string> = {
                    팝업스토어: "popupstores",
                    전시회: "exhibits",
                    연극: "performances",
                    축제: "festivals",
                  };
                  return categoryMap[koreanGenre] || "popupStore"; // 기본값 설정
                };

                const englishCategory = getCategoryFromKorean(post.genre);
                const apiCategory = getApiCategoryFromKorean(post.genre);

                return (
                  <InformationCard
                    id={post.id}
                    category={englishCategory}
                    apiCategory={apiCategory}
                    key={post.id}
                    imageUrl={cleanImageUrl(post.postUrl)}
                    title={post.title}
                    startDate={post.startDate}
                    endDate={post.endDate}
                    location={post.location}
                    isBookmarked={post.bookmarked}
                  />
                );
              })
            ) : (
              <div className="col-span-3 flex justify-center items-center h-[200px]">
                <p className="text-gray-40 text-center">
                  북마크한 포스트가 없습니다.
                  <span className="block mt-3">
                    마음에 드는 포스트를 북마크해보세요.
                  </span>
                </p>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex flex-col mx-auto">
      <div className="mt-[108px] max-w-[1280px] mx-auto p-6 mb-20">
        {userData && (
          <ProfileHeader
            nickname={userData.nickname}
            description={userData.description}
            interests={userData.interests}
            profileImage={userData.s3Bucket}
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
        {renderContent()}
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default MyPage;
