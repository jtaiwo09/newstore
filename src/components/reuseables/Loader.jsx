import React from "react";
import { useLottie } from "lottie-react";
import loader from "../../static/loader.json";

const Loader = () => {
  // const style = {
  //   maxHeight: "150px",
  //   maxWidth: "150px",
  //   background: "transparent",
  // };
  const options = {
    animationData: loader,
    loop: true,
  };
  const { View } = useLottie(options);
  return (
    <div className="h-screen w-screen flex justify-center items-center fixed bg-[#000]/80 top-0 bottom-0 left-0 right-0 z-[99]">
      <div className="max-w-[120px] max-h-[120px] sm:max-w-[150px] sm:max-h-[150px]">
        {View}
      </div>
    </div>
  );
};

export default Loader;
