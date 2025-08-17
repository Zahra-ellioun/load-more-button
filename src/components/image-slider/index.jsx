import { useState } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleBeforeImage = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  // برای تعویض خودکار عکس ها
  // useEffect(() => {
  //   const timer = setInterval(handleNextImage, 3000);
  //   return () => clearInterval(timer);
  // }, [images]);

  return (
    <div className="mx-auto relative">
      {images && images.length > 0 ? (
        images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={image}
            // loading="lazy"
            className="object-cover h-[260px] w-[260px]  "
            style={{
              display: currentIndex === index ? "block" : "none",
            }}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}
      <button
        onClick={() => handleNextImage()}
        className="absolute bg-white p-1 rounded-full text-2xl right-0 m-2 top-1/2 drop-shadow-4xl cursor-pointer "
      >
        <MdNavigateNext />
      </button>
      <button
        onClick={() => handleBeforeImage()}
        className="absolute bg-white p-1 rounded-full text-2xl left-0 m-2 top-1/2 drop-shadow-4xl cursor-pointer"
      >
        <MdNavigateBefore />
      </button>
      <div className="absolute bottom-0 flex justify-center  w-full">
        {images && images.length > 0
          ? images.map((_, index) => (
              <button
                key={index}
                className=" h-[10px] w-[10px] rounded-full m-1 cursor-pointer bg-gray-800"
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
