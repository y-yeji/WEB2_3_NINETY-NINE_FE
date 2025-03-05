import { useCallback, useEffect, useState } from "react";
import PostCard from "../../components/common/PostCard";
import Dropdown from "../../components/ui/Dropdown";
import Pagination from "../../components/ui/Pagination";
import api from "../../api/api";
import { PostsData, SocialCommunityResponse } from "../../types/postApi";

const sortOptionMap: { [key: string]: string | undefined } = {
  전체: undefined,
  최신순: "latest",
  인기순: "popular",
  댓글순: "comments",
};

const Community: React.FC = () => {
  const [posts, setPosts] = useState<PostsData["posts"]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const postCardSortOptionLabels = ["전체", "최신순", "인기순", "댓글순"];
  const [currentSortOption, setCurrentSortOption] = useState(
    postCardSortOptionLabels[0]
  );
  const [currentPage, setCurrentPage] = useState(1);
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
        console.log("data", response.data);
      } else {
        console.error("Posts 배열", response.data);
      }
    } catch (error) {
      console.error("포스트목록을 불러오는데 실패했습니다.", error);
    }
  }, []);

  useEffect(() => {
    fetchPostList(currentPage, currentSortOption);
  }, [currentPage, currentSortOption, fetchPostList]);

  const handleSortChange = (selected: string) => {
    setCurrentSortOption(selected);
    setCurrentPage(1);
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
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
    <div className="mt-[188px]">
      <div className="flex items-center justify-end mr-[39px] bg-white">
        <Dropdown
          data={postCardSortOptionLabels}
          onSelect={handleSortChange}
          sizeClassName="w-[114px] h-[30px]"
        />
      </div>
      <div className="grid grid-cols-3 grid-rows-3 gap-[70px] place-items-center mt-9">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onLikeToggle={handleLikeToggle} />
        ))}
      </div>
      <div className="flex justify-center mt-[104px] mb-[108px]">
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
