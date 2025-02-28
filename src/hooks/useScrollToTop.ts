import { useEffect, useRef, useState, useCallback } from "react";

const useScrollToTop = () => {
  const showScrollRef = useRef(false);
  const [showScroll, setShowScroll] = useState(false);
  const scrollTriggerRef = useRef<HTMLDivElement | null>(null);

  const updateShowScroll = useCallback((isVisible: boolean) => {
    if (showScrollRef.current !== isVisible) {
      showScrollRef.current = isVisible;
      setShowScroll(isVisible);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        updateShowScroll(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (scrollTriggerRef.current) {
      observer.observe(scrollTriggerRef.current);
    }

    return () => {
      if (scrollTriggerRef.current) {
        observer.unobserve(scrollTriggerRef.current);
      }
    };
  }, [updateShowScroll]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return { showScroll, scrollToTop, scrollTriggerRef };
};

export default useScrollToTop;
