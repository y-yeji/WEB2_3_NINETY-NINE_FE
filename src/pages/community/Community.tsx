import { useState } from "react";
import PostCard from "../../components/common/PostCard";
import Dropdown from "../../components/ui/Dropdown";
import Pagination from "../../components/ui/Pagination";

const Temp_PostCard = [
  {
    post: {
      id: 1,
      title: "우연히 웨스 앤더슨 2 같이 가실분!",
      content: "우연히 웨스 앤더슨 2 같이 가실분!...",
      imageUrl: "/default-image.png",
      createdAt: "2025-02-24",
      viewCount: 100,
      commentCount: 5,
      likeCount: 10,
    },
    user: {
      id: 1,
      username: "NINETY9",
      profileImage: "/default-image.png",
    },
    isLiked: false,
    onLikeChange: (postId: number, liked: boolean) => {
      console.log(`Post ${postId} liked status changed to ${liked}`);
    },
  },
];
const Community = () => {
  const sortOptions = ["전체", "최신순", "인기순", "댓글순"];
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const handleSortChange = (selected: string) => {
    setSelectedSort(selected);
  };

  const postCount = 9;
  const [posts, setPosts] = useState(Array(postCount).fill(Temp_PostCard[0]));

  const handleLikeChange = (postId: number, liked: boolean) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              post: {
                ...post.post,
                likeCount: liked
                  ? post.post.likeCount + 1
                  : post.post.likeCount - 1,
              },
              isLiked: liked,
            }
          : post
      )
    );
  };

  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mt-[188px]">
      <div className=" flex items-center justify-end mr-[39px] bg-white">
        <Dropdown
          data={sortOptions}
          onSelect={handleSortChange}
          sizeClassName="w-[114px] h-[30px]"
        />
      </div>
      <div className="grid grid-cols-3 grid-rows-3 gap-[70px] place-items-center mt-9">
        {posts.map((post) => (
          <PostCard
            key={post.postId}
            user={post.user}
            post={post.post}
            isLiked={post.isLiked}
            onLikeChange={handleLikeChange}
          />
        ))}
      </div>
      <div className="flex justify-center mt-[104px] mb-[108px]">
        <Pagination
          totalItems={posts.length}
          itemsPerPage={9}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default Community;
