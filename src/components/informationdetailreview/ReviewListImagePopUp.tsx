import React from "react";

interface ImagePopupProps {
  imageUrl: string;
  onClose: () => void;
}

const ReviewListImagePopUp: React.FC<ImagePopupProps> = ({
  imageUrl,
  onClose,
}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="relative">
        <img src={imageUrl} alt="Review" className="w-[600px] rounded-lg" />
        <button
          className="absolute top-2 right-2 text-white bg-black bg-opacity-75 rounded-full w-7 h-7 flex items-center justify-center"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ReviewListImagePopUp;
