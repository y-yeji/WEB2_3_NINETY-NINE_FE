import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import api from "../api/api";

interface LikeState {
  likedPosts: Record<number, { isLiked: boolean; likeId?: number }>;
  toggleLike: (postId: number) => Promise<void>;
  getLikeStatus: (postId: number) => { isLiked: boolean; likeId?: number };
  // updateLikeCount: (postId: number, count: number) => void;
  likeCounts: Record<number, number>;
}

const useLikeStore = create(
  persist<LikeState>(
    (set, get) => ({
      likedPosts: {},
      likeCounts: {},

      toggleLike: async (postId: number) => {
        const { likedPosts, likeCounts } = get();
        const currentStatus = likedPosts[postId] || { isLiked: false };

        try {
          if (currentStatus.isLiked) {
            await api.delete(
              `/api/socialPosts/${postId}/likes/${currentStatus.likeId}`
            );
            set((state) => ({
              likedPosts: {
                ...state.likedPosts,
                [postId]: { isLiked: false },
              },
              likeCounts: {
                ...state.likeCounts,
                [postId]: (state.likeCounts[postId] || 0) - 1,
              },
            }));
          } else {
            const response = await api.post(`api/socialPosts/${postId}/likes`);
            set((state) => ({
              likedPosts: {
                ...state.likedPosts,
                [postId]: { isLiked: true, likeId: response.data.id },
              },
              likeCounts: {
                ...state.likeCounts,
                [postId]: (state.likeCounts[postId] || 0) + 1,
              },
            }));
          }
        } catch (error) {
          console.error("좋아요 로직 오류 발생", error);
        }
      },

      getLikeStatus: (postId: number) => {
        return get().likedPosts[postId] || { isLiked: false };
      },
      // 유저의 좋아요누른 포스트 배열 api가 구현된 후 다시 구현하기
      // updateLikeCount: (postId: number, count: number) => {
      //   set((state) => ({
      //     likeCounts: {
      //       ...state.likeCounts,
      //       [postId]: count,
      //     },
      //   }));
      // },
    }),
    {
      name: "like-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useLikeStore;
