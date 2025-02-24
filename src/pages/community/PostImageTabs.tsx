import React, { useState } from "react";

const DEFAULT_IMAGE = "/default-image.png";
interface PostImageTabsProps {
  images: string[];
}

const PostImageTabs: React.FC<PostImageTabsProps> = ({ images }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const imageUrls = images.length > 0 ? images : [DEFAULT_IMAGE];

  return (
    <div className="flex items-center gap-5 mb-[60px]">
      <div className="w-[950px] h-[402px] bg-base-1 rounded-lg flex items-center justify-center overflow-hidden">
        <img
          className="w-auto h-[354px] object-cover bg-center"
          src={imageUrls[selectedTab]}
          alt={`게시글 이미지 ${selectedTab + 1}`}
        />
      </div>
      {imageUrls.length > 1 && (
        <div className="w-[150px] h-[402px] flex justify-center items-center bg-base-1 rounded-lg">
          <div className="flex flex-col">
            {imageUrls.map((img, index) => (
              <div
                key={index}
                className={`w-[74px] h-[74px] mb-2 cursor-pointer ${
                  index === selectedTab ? "" : "opacity-50"
                }`}
                onClick={() => setSelectedTab(index)}
              >
                <img
                  className="w-full h-full overflow-hidden rounded object-cover bg-center"
                  src={img}
                  alt={`게시글 이미지 ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default PostImageTabs;
