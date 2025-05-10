import React, { useEffect, useState } from "react";

const DEFAULT_IMAGE = "/default-image.png";
interface PostImageTabsProps {
  images: string[];
}

const PostImageTabs: React.FC<PostImageTabsProps> = ({ images }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const imageUrls = images.length > 0 ? images : [DEFAULT_IMAGE];
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex items-center lg:justify-center lg:flex-row max-xm:flex-col xm:flex-col lg:gap-5 max-xm:gap-10 xm:gap-10 xm:mb-[30px] xl:mb-[60px] max-xm:py-8 xm:py-8 max-xm:bg-base-1 xm:bg-base-1 lg:bg-transparent max-xm:rounded-lg xm:rounded-lg">
      <div className="lg:w-[950px] max-xm:w-auto xm:w-auto max-xm:h-auto xm:h-auto h-[402px] bg-base-1 lg:rounded-lg flex lg:items-center lg:justify-center overflow-hidden">
        <img
          className="max-xm:w-auto max-xm:h-auto xm:w-auto xm:h-[354px] max-xm:object-contain max-xm:bg-center xm:object-cover xm:bg-center"
          src={imageUrls[selectedTab]}
          alt={`게시글 이미지 ${selectedTab + 1}`}
          onError={(e) => {
            e.currentTarget.src = "/default-image.png";
          }}
        />
      </div>
      {imageUrls.length > 1 && (
        <div className="lg:w-[150px] lg:h-[402px] max-xm:w-auto xm:w-auto max-xm:h-auto xm:h-auto flex lg:justify-center lg:items-center bg-base-1 rounded-lg">
          <div className="flex lg:flex-col max-xm:flex-row xm:flex-row gap-4">
            {imageUrls.map((img, tabIndex) => (
              <div
                key={tabIndex}
                className={`sm:w-[74px] sm:h-[74px] mb-2 cursor-pointer ${
                  tabIndex === selectedTab ? "" : "opacity-50"
                }`}
                onClick={() => setSelectedTab(tabIndex)}
              >
                {screenWidth < 640 ? (
                  <div
                    className={`w-[10px] h-[10px] rounded-full ${tabIndex === selectedTab ? "bg-blue-7" : "bg-base-1 border border-blue-7"}`}
                  />
                ) : (
                  <img
                    className="w-full h-full overflow-hidden rounded object-cover bg-center"
                    src={img}
                    alt={`게시글 이미지 ${tabIndex + 1}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default PostImageTabs;
