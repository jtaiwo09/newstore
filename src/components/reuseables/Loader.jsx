import React from "react";
import { useLottie } from "lottie-react";
import loader from "../../static/loading.json";

const Loader = () => {
  const style = {
    height: "150px",
    width: "150px",
    background: "transparent",
  };
  const options = {
    animationData: loader,
    loop: true,
  };
  const { View } = useLottie(options, style);
  return (
    <div className="h-screen w-screen flex justify-center items-center fixed bg-[#000]/30 top-0 bottom-0 left-0 right-0 z-[99]">
      {View}
    </div>
  );
};

export default Loader;
