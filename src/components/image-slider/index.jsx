import { useState } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextImage = (index) => {
    if (index < images.length - 1) setCurrentIndex(index + 1);
    else setCurrentIndex(0);
  };

  const handleBeforeImage = (index) => {
    if (index > 0) setCurrentIndex(index - 1);
    else setCurrentIndex(images.length - 1);
  };

  return (
    <div className="mx-auto relative">
      {images && images.length > 0 ? (
        images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={image}
            className="object-cover h-full "
            style={{
              display: currentIndex === index ? "block" : "none",
            }}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}
      <button
        onClick={() => handleNextImage(currentIndex)}
        className="absolute bg-white p-1 rounded-full text-2xl right-0 m-2 top-1/2 drop-shadow-4xl cursor-pointer "
      >
        <MdNavigateNext />
      </button>
      <button
        onClick={() => handleBeforeImage(currentIndex)}
        className="absolute bg-white p-1 rounded-full text-2xl left-0 m-2 top-1/2 drop-shadow-4xl cursor-pointer"
      >
        <MdNavigateBefore />
      </button>
      <div className="absolute bottom-0 flex justify-center  w-full">
        {images && images.length > 0
          ? images.map((_, index) => (
              <button
                key={index}
                className=" h-[15px] w-[15px] rounded-full m-1 cursor-pointer bg-gray-800"
                onClick={() => setCurrentIndex(index)}
                style={{
                  opacity: currentIndex === index ? "100%" : "30%",
                }}
              ></button>
            ))
          : null}
      </div>
    </div>
  );
};

export default ImageSlider;
