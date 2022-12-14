import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const CarouselSlider = () => {
  const images = [
    {
      id: 1,
      image:
        "https://res.cloudinary.com/citi-tasker/image/upload/v1660487968/STORE/webImages/carousel2_v0l1qq.jpg",
      title: "Nike Shoe",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit Voluptatem temporibus vitae magnam totam dolores",
    },
    {
      id: 2,
      image:
        "https://res.cloudinary.com/citi-tasker/image/upload/v1660488100/STORE/webImages/carousel3_imregg.jpg",
      title: "Adiddas",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit Voluptatem temporibus vitae magnam totam dolores",
    },
    {
      id: 3,
      image:
        "https://res.cloudinary.com/citi-tasker/image/upload/v1660488598/STORE/webImages/carousel4_zvfknf.jpg",
      title: "Air Force",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit Voluptatem temporibus vitae magnam totam dolores",
    },
    {
      id: 4,
      image:
        "https://res.cloudinary.com/citi-tasker/image/upload/v1660488862/STORE/webImages/carousel5_fibu86.jpg",
      title: "Dior",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit Voluptatem temporibus vitae magnam totam dolores",
    },
    {
      id: 5,
      image:
        "https://res.cloudinary.com/citi-tasker/image/upload/v1660489388/STORE/webImages/carousel7_zlz7dd.jpg",
      title: "Dior",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit Voluptatem temporibus vitae magnam totam dolores",
    },
    {
      id: 6,
      image:
        "https://res.cloudinary.com/citi-tasker/image/upload/v1660490296/STORE/webImages/carousel8_glajuk.jpg",
      title: "Dior",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit Voluptatem temporibus vitae magnam totam dolores",
    },
  ];
  return (
    <Carousel
      autoPlay
      infiniteLoop
      // transitionTime={3000}
      interval={6000}
      showThumbs={false}
      showStatus={false}
      className="container"
    >
      {images.map((item) => (
        <div
          key={item.id}
          className="flex flex-col md:flex-row h-[50vh] md:h-[70vh]"
        >
          <div className="w-full h-[50vh] md:h-[70vh] md:w-1/2 px-5 flex items-center justify-center">
            <img
              className="w-full h-full object-contain md:object-contain"
              src={item.image}
              alt=""
            />
            {/* <a
              href="#product"
              className="absolute uppercase mt-5 md:mt-10 inline-block border border-solid border-white text-white rounded-[5px] bg-[#000]/50 w-[160px] px-2 py-4 text-center"
            >
              Buy Now
            </a> */}
          </div>
          <div className="hidden md:flex w-1/2 items-center px-4 md:px-[50px]">
            <div className="w-full text-left">
              <h2 className="text-[60px] font-semibold">{item.title}</h2>
              <p className="max-w-[400] tracking-wide text-[20px] font-[300]">
                {item.desc}
              </p>
              <a
                href="#product"
                className="uppercase mt-5 md:mt-10 inline-block bg-primary rounded-[5px] text-white w-[160px] px-2 py-4 text-center"
              >
                Buy Now
              </a>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselSlider;
