import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import CartItem from "../components/CartItem";
import { Link, useNavigate } from "react-router-dom";
import EmptyCart from "../components/EmptyCart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CurrencyFormatter from "../components/CurrencyFormatter";

const cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user.user);
  const navigateTo = useNavigate();

  const total = cart
    .reduce((i, item) => i + item.quantity * item.price, 0)
    .toFixed(2);

  const handleCheckout = (e) => {
    e.preventDefault();
    user ? navigateTo("/shipping") : navigateTo("/login?redirect=shipping");
  };

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <section className="container">
        {cart.length ? (
          <>
            <div className="w-full text-center border border-solid border-[#b6effb] bg-[#cff4fc] text-[#055160] rounded-[4px] p-4 my-4">
              {`Total Cart Products `}
              <span className="text-[#198754]">({cart.length})</span>
            </div>
            {cart
              ? cart.map((product) => (
                  <CartItem key={product._id} product={product} />
                ))
              : null}
            <div className="mt-[50px] mb-2.5 px-[30px] text-right">
              <span className="text-5 text-[#8c8c8c] uppercase mr-5">
                Total:
              </span>
              <span className="text-[20px] font-[500]">
                <CurrencyFormatter price={total} />
              </span>
            </div>
            <hr className="h-[1px] my-4" />
            <div className="my-[90px] flex flex-col md:flex-row items-center space-y-4 md:space-y-0">
              <Link to="/" className="flex-1 w-full px-3">
                <button className="w-full md:w-[80%] py-[15px] bg-black text-white uppercase rounded-[5px]">
                  Continue Shopping
                </button>
              </Link>
              <div className="flex-1 w-full flex justify-end px-3">
                <button
                  onClick={handleCheckout}
                  className="w-full md:w-[80%] py-[15px] bg-primary text-white uppercase rounded-[5px]"
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        ) : (
          <EmptyCart />
        )}
      </section>
    </div>
  );
};

export default cart;
