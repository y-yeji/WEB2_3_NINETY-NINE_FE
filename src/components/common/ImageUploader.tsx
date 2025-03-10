import React, { useState, useEffect } from "react";
import Icon from "../../assets/icons/Icon";

interface ImageUploaderProps {
  onUpload: (images: string[]) => void;
  initialImages?: string[];
}

const ImageUploader = ({
  onUpload,
  initialImages = [],
}: ImageUploaderProps) => {
  const [images, setImages] = useState<string[]>(initialImages);

  useEffect(() => {
    setImages(initialImages);
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);

      if (images.length + filesArray.length > 4) {
        alert("최대 4개의 이미지만 업로드할 수 있습니다."); // 추후 모달창 작성 예정
        return;
      }

      const newImages = filesArray.map((file) => URL.createObjectURL(file));
      const updatedImages = [...images, ...newImages].slice(0, 4);

      setImages(updatedImages);
      onUpload(updatedImages);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onUpload(updatedImages);
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
              <Icon
                name="Trash2"
                size={20}
                strokeWidth={2}
                className="text-blue-1 bg-base-1 border border-blue-1 rounded-full p-[3px] hover:text-base-1 hover:bg-blue-1 "
              />
            </button>
          </div>
        ))}
        {images.length < 4 && (
          <label className="relative w-60 h-60 flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer">
            <button
              type="button"
              onClick={() => document.getElementById("file-upload")?.click()}
              className="w-full h-full flex items-center justify-center"
            >
              <Icon
                name="ImagePlus"
                size={80}
                strokeWidth={1}
                className="text-gray-20 hover:text-blue-1"
              />
            </button>

            <input
              id="file-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
