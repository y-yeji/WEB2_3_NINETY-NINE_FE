import { useState, useEffect, useRef } from "react";

const useScrollToTop = () => {
  const [showScroll, setShowScroll] = useState(false);
  const scrollTriggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowScroll(!entry.isIntersecting);
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
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { showScroll, scrollToTop, scrollTriggerRef };
};

export default useScrollToTop;
