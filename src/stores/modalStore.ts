import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  text: string;
  cancelText: string;
  confirmText: string;
  onConfirm?: () => void;
  openModal: (
    text: string,
    cancelText?: string,
    confirmText?: string,
    onConfirm?: () => void
  ) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: true,
  text: "",
  cancelText: "취소하기",
  confirmText: "삭제하기",
  onConfirm: undefined,

  openModal: (
    text,
    cancelText = "취소하기",
    confirmText = "삭제하기",
    onConfirm
  ) => set({ isOpen: true, text, cancelText, confirmText, onConfirm }),

  closeModal: () => set({ isOpen: false }),
}));
