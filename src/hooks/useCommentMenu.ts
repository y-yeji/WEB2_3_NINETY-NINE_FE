import { useEffect, useRef, useState } from "react";

export function useCommentMenu() {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const toggleCommentMenu = (commentId: number) => {
    setOpenMenuId(openMenuId === commentId ? null : commentId);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      let clickedInsideAnyMenu = false;

      Object.values(menuRefs.current).forEach((ref) => {
        if (ref && ref.contains(target)) {
          clickedInsideAnyMenu = true;
        }
      });

      if (!clickedInsideAnyMenu) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return { openMenuId, toggleCommentMenu, menuRefs };
}
