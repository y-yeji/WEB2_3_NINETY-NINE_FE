import React, { useState } from "react";
import trash from "../../assets/trash.svg";
import imagePlus from "../../assets/image-plus.svg";
import imagePlusHover from "../../assets/image-plus2.svg";

interface ImageUploaderProps {}

const ImageUploader = ({}: ImageUploaderProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [plusIcon, setPlusIcon] = useState(imagePlus);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files).slice(
        0,
        4 - images.length
      );
      const newImages = filesArray.map((file) => URL.createObjectURL(file));

      setImages((prevImages) => [...prevImages, ...newImages].slice(0, 4));
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="w-[1200px] h-[362px] mt-5 flex flex-col justify-between items-center mx-auto border border-gray-5 rounded-lg p-6 bg-white">
      <div className="flex gap-[54px]">
        {images.map((src, index) => (
          <div
            key={index}
            className="relative w-60 h-60 overflow-hidden rounded-lg border"
          >
            <img
              src={src}
              alt={`uploaded-${index}`}
              className="w-full h-full object-cover"
            />

            <button
              onClick={() => handleRemoveImage(index)}
              className="absolute top-2 right-2 "
            >
              <img src={trash} alt="delete" className="w-5 h-5" />
            </button>
          </div>
        ))}
        {images.length < 4 && (
          <label className="relative w-60 h-60 flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer">
            <button
              type="button"
              onMouseEnter={() => setPlusIcon(imagePlusHover)}
              onMouseLeave={() => setPlusIcon(imagePlus)}
              onClick={() => document.getElementById("file-upload")?.click()}
              className="w-full h-full flex items-center justify-center"
            >
              <img src={plusIcon} alt="add" className="w-16 h-16" />
            </button>

            <input
              id="file-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload} // 파일 선택 시 실행
              className="hidden"
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
