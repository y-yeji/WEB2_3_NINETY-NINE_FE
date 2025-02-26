import React, { useState } from "react";
import Icon from "../../assets/icons/Icon";

interface ImageUploaderProps {
  onUpload: (images: string[]) => void;
}

const ImageUploader = ({ onUpload }: ImageUploaderProps) => {
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files).slice(
        0,
        4 - images.length
      );
      const newImages = filesArray.map((file) => URL.createObjectURL(file));

      const updatedImages = [...images, ...newImages].slice(0, 4);
      setImages(updatedImages);
      onUpload(updatedImages);
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
