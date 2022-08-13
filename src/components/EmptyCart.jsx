import React from "react";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="my-4 text-center text-[#055160] bg-[#cff4fc] border border-solid border-[#b6effb] p-4 rounded-[5px]">
      Your cart is empty
      <Link
        to="/"
        className="uppercase text-xs bg-[#198754] text-white py-4 px-[3rem] mx-[3rem]"
      >
        Shop Now
      </Link>
    </div>
  );
};

export default EmptyCart;
