import React, { useCallback, useEffect, useState } from "react";
import PostCard from "../../components/common/PostCard";
import Dropdown from "../../components/ui/Dropdown";
import Pagination from "../../components/ui/Pagination";
import api from "../../api/api";
import { PostsData, SocialCommunityResponse } from "../../types/postApi";
import { useSearchParams } from "react-router-dom";

const sortOptionMap: { [key: string]: string | undefined } = {
  전체: undefined,
  최신순: "latest",
  인기순: "popular",
  댓글순: "comments",
};

const Community: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState<PostsData["posts"]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const postCardSortOptionLabels = ["전체", "최신순", "인기순", "댓글순"];
  const currentSortOption =
    searchParams.get("sort") || postCardSortOptionLabels[0];
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const fetchPostList = useCallback(async (page: number, sort: string) => {
    try {
      const response = await api.get<SocialCommunityResponse>(
        `/api/socialPosts`,
        {
          params: {
            pageNum: page - 1,
            pageSize: 9,
            sort: sortOptionMap[sort],
          },
        }
      );
      if (response.data && Array.isArray(response.data.data.posts)) {
        setPosts(response.data.data.posts);
        setTotalItems(response.data.data.totalElements);
      } else {
        console.error("Posts 배열", response.data);
      }
    } catch (error) {
      console.error("포스트목록을 불러오는데 실패했습니다.", error);
    }
  }, []);

  useEffect(() => {
    fetchPostList(currentPage, currentSortOption);

    const intervalId = setInterval(() => {
      fetchPostList(currentPage, currentSortOption);
    }, 30000);

    return () => clearInterval(intervalId);
  }, [currentPage, currentSortOption, fetchPostList]);

  const handleSortChange = (selected: string) => {
    setSearchParams({ sort: selected, page: "1" });
  };

  const onPageChange = (page: number) => {
    setSearchParams({ sort: currentSortOption, page: page.toString() });
  };

  const handleLikeToggle = useCallback(
    (postId: number, newLikeStatus: boolean, newLikeCount: number) => {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                likeStatus: newLikeStatus,
                likeCount: newLikeCount,
              }
            : post
        )
      );
    },
    []
  );

  return (
    <div className="mt-[168px]">
      <h2 className="ml-[22px] max-xm:ml-0 h1-b">소셜 커뮤니티</h2>
      <div className="mr-[22px] max-xm:mr-0 flex items-center justify-end bg-white max-xm:mt-5 xm:mt-5">
        <Dropdown
          data={postCardSortOptionLabels}
          onSelect={handleSortChange}
          selectedOption={currentSortOption}
          sizeClassName="w-[114px] h-[30px]"
        />
      </div>
      <div className=" grid lg:grid-cols-3 sm:grid-cols-2 xm:grid-cols-1 lg:gap-[70px] xm:gap-[35px] max-xm:gap-[35px] max-xm: mb-[82px] place-items-center mt-9">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onLikeToggle={handleLikeToggle} />
        ))}
      </div>
      <div className="sm:flex justify-center mt-[104px] mb-[108px] xm:hidden max-xm:hidden">
        <Pagination
          totalItems={totalItems}
          itemsPerPage={9}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default Community;
