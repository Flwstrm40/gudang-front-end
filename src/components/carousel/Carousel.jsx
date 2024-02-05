import { Carousel } from "@material-tailwind/react";
import Image from "next/image";
 
export default function CarouselDefault() {
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
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      <Image
                src="/Login-bg.jpg"
                // src="/Front-Offo.jpg"
                alt="Logo Offo"
                width={3000}
                height={3000}
                priority={true}
                className="w-full h-full overflow-hidden object-cover z-0 top-0 left-0 opacity-100 fixed sm:hidden"
                />
      <Image
                src="/Dark.jpg"
                // src="/Front-Offo.jpg"
                alt="Logo Offo"
                width={3000}
                height={3000}
                priority={true}
                className="w-full h-full overflow-hidden object-cover z-0 top-0 left-0 opacity-100 fixed sm:hidden"
                />
       <Image
                src="/Ikan.jpg"
                // src="/Front-Offo.jpg"
                alt="Logo Offo"
                width={3000}
                height={3000}
                priority={true}
                className="w-full h-full overflow-hidden object-cover z-0 top-0 left-0 opacity-100 fixed sm:hidden"
                />
    </Carousel>
  );
}