import { Carousel } from "@material-tailwind/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CarouselDefault() {
  const [activeIndex, setActiveIndex] = useState(2);

  const images = ["/Login-bg.jpg", "/Dark.jpg", "/Ikan.jpg", "/bedDark.jpg", "/Office.jpg", "/DinningTable.jpg"];

  const handleIndexChange = (index) => {
    setActiveIndex(index);
  };

  return (
    <Carousel
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => handleIndexChange(i)}
            />
          ))}
        </div>
      )}
      className="h-screen max-h-screen w-full top-0 left-0 overflow-hidden fixed"
      autoplay={true}
      autoplayDelay={4000}
      onChange={handleIndexChange} 
      loop={true} 
    >
      {images.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt={`Slide ${index}`}
          width={3000}
          height={3000}
          priority={true}
          className="h-screen w-full object-cover"
        />
      ))}
    </Carousel>
  );
}
