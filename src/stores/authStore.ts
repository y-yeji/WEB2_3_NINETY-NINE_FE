import { create } from "zustand";
import api from "../api/api";

interface AuthState {
  user: any;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
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
      const token = response.data.data.accessToken;
      if (token) {
        localStorage.setItem("accessToken", token);
        await useAuthStore.getState().checkAuth();
        return Promise.resolve(); 
      }
    } catch (error) {
      console.error("로그인 실패", error);
      return Promise.reject(error); 
    }
  },

  logout: async () => {
    try {
      await api.get("/api/logout");
      localStorage.removeItem("accessToken");
      set({ user: null, isLoggedIn: false });
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  },

  checkAuth: async () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const response = await api.get("/api/profile", {
          headers: {
            Authorization: token,
          },
        });
        set({ user: response.data.data, isLoggedIn: true });
      } catch (error) {
        console.error("인증 확인 실패:", error);
        localStorage.removeItem("accessToken");
        set({ user: null, isLoggedIn: false });
      }
    } else {
      set({ user: null, isLoggedIn: false });
    }
  },
}));
