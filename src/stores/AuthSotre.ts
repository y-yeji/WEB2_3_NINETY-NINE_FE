import { create } from "zustand";
import Cookies from "js-cookie";
import api from "../api/api";

interface AuthState {
  user: any;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,

  login: async (email, password) => {
    try {
      const response = await api.post(
        "/api/login",
        { email, password },
        { withCredentials: true }
      );
      const token = Cookies.get("accessToken");
      console.log(token);
      if (token) {
        set({ user: response.data.user, isLoggedIn: true });
        console.log("성공");
      }
    } catch (error) {
      console.error("로그인 실패", error);
      alert("이메일 또는 비밀번호가 잘못되었습니다.");
    }
  },

  logout: async () => {
    try {
      await api.get("/api/logout");
      set({ user: null, isLoggedIn: false });
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  },

  checkAuth: async () => {
    const token = Cookies.get("accessToken");

    if (token) {
      try {
        const response = await api.get("/api/profile");
        set({ user: response.data, isLoggedIn: true });
      } catch (error) {
        console.error("인증 확인 실패", error);
        set({ user: null, isLoggedIn: false });
      }
    }
  },
}));
