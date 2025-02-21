import { useState } from "react";
import PostCard from "../../components/common/PostCard";

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
  const postCount = 9;
  const [posts, setPosts] = useState(Array(postCount).fill(Temp_PostCard[0]));

  const handleLikeChange = (postId: number, newLikeCount: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.postId === postId ? { ...post, like: newLikeCount } : post
      )
    );
  };

  return (
    <div>
      <div className="flex justify-end mt-[188px]">정렬</div>
      <div className="grid grid-cols-3 grid-rows-3 gap-[70px] place-items-center mt-9 ">
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
        페이지 네이션
      </div>
    </div>
  );
};

export default Community;
