import { useState } from "react";
import PostCard from "../../components/common/PostCard";
import Dropdown from "../../components/ui/Dropdown";
import Pagination from "../../components/ui/Pagination";

const Temp_PostCard = [
  {
    postId: 1,
    user: {
      profileImage: "/default-image.png",
      username: "NINETY9",
    },
    post: {
      postId: 1,
      date: "2025.02.27",
      title: "우연히 웨스 앤더슨 2 같이 가실분!",
      content: "게시글 내용",
      thumbnail: "/default-image.png",
    },
    like: 0,
    comment: 10,
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

  const handleLikeChange = (postId: number, newLikeCount: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.postId === postId ? { ...post, like: newLikeCount } : post
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
            initialLike={post.like}
            initialComment={post.comment}
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
