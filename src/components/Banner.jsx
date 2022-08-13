import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="bg-primary py-2">
      <div className="container flex align-center">
        <div className="flex-1 px-3 flex items-center text-white">
          <p className="text-[10px] mr-[6rem]">+234 706 772 9362</p>
          <p className="text-[10px] mr-[6rem]">taiwokelvin@gmail.com</p>
        </div>
        <div className="flex-1 px-3">
          <div className="text-white h-full flex justify-end items-center space-x-4">
            <FaFacebookF className="banner_icons" />
            <FaInstagram className="banner_icons" />
            <FaLinkedinIn className="banner_icons" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
