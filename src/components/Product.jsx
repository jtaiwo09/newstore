import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import CurrencyFormatter from "./CurrencyFormatter";
// import imge from "../assets/images/2.png";

const Product = ({ product }) => {
  return (
    <div className="mb-[50px] px-4 w-full sm:w-1/2  md-s:w-1/3">
      <div className="p-[15px] rounded-[5px] border border-solid border-[#f3f3f3]">
        <Link to={`/product/${product._id}`}>
          <div className="h-[250px] overflow-hidden w-full bg-[#f3fbf7]">
            <img
              src={product.image}
              alt={product.name}
              className="h-[250px] w-full object-contain"
            />
          </div>
          <div>
            <p className="text-[#252525]">{product.name}</p>
            <div className="flex items-center my-[5px]">
              {product.rating > 0 && (
                <div className="flex items-center mr-2.5">
                  {Array(product.rating)
                    .fill(0)
                    .map((_, i) => (
                      <FaStar
                        key={i}
                        className="text-[#ebb450] text-xs mr-0.5"
                      />
                    ))}
                  {Array(5 - product.rating)
                    .fill(0)
                    .map((_, i) => (
                      <FaRegStar
                        key={i}
                        className="text-[#ebb450] text-xs mr-0.5"
                      />
                    ))}
                </div>
              )}
              <span className="">
                {product.numReviews > 0 ? product.numReviews : "No"} reviews
              </span>
            </div>
            <h3 className="mt-[13px] font-semibold text-[19px]">
              <CurrencyFormatter price={product.price} />
            </h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Product;
