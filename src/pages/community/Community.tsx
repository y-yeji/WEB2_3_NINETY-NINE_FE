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
  const [posts, setPosts] = useState(Temp_PostCard);

  const handleLikeChange = (postId: number, newLikeCount: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.postId === postId ? { ...post, like: newLikeCount } : post
      )
    );
  };

  return (
    <div>
      <h1>Community</h1>
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
  );
};

export default Community;
