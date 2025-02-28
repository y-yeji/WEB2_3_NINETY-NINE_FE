import useScrollToTop from "../../hooks/useScrollToTop";
import Icon from "../../assets/icons/Icon";

const ScrollToTopButton = () => {
  const { showScroll, scrollToTop, scrollTriggerRef } = useScrollToTop();

  return (
    <>
      <div
        ref={scrollTriggerRef}
        style={{
          position: "absolute",
          top: "300px",
          left: "0",
          opacity: 0,
          pointerEvents: "none",
        }}
      ></div>
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed z-20 bottom-6 right-6 w-[45px] h-[45px] p-0  rounded-full transition-all"
        >
          <Icon
            name="ChevronUp"
            className="h-[42px] w-[42px] bg-blue-7 rounded-lg text-base-1"
          />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
