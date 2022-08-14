import React, { useState } from "react";
import { Link } from "react-router-dom";
import Brand from "../assets/brand.png";
import { FaShoppingBag } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";
import ClickAwayListener from "react-click-away-listener";

const Navbar = () => {
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user.user);
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    const cookies = new Cookies();
    cookies.remove("user");
    localStorage.removeItem("persist:root");
    location.href = "/login";
  };
  return (
    <header className="py-2.5 sticky top-0 bg-white shadow-sm z-50">
      <div className="container px-4">
        <div className="mobile"></div>
        <div className="flex items-center justify-between md:justify-items-start flex-wrap md:flex-nowrap">
          <div className="shrink-0">
            <Link to="/" className="mr-4 py-[5px] flex items-center">
              <img src={Brand} alt="" className="w-[100px]" />
            </Link>
          </div>
          <div className="h-[40px] md:h-[50px] w-full md:flex-1 md:px-3 flex items-center order-1 md:-order-none">
            <form
              action=""
              className="h-[100%] m-auto w-[100%] max-w-[560px] flex"
            >
              <input
                type="text"
                placeholder="Search"
                className="text-[1rem] rounded-l-[4px] w-[80%] text-[#212529] focus:outline-none px-3 border border-solid border-[#ced4da] h-full"
              />
              <button
                type="submit"
                className="h-full bg-black w-[20%] text-white rounded-r-[4px]"
              >
                Search
              </button>
            </form>
          </div>
          <div className="flex shrink-0 justify-end items-center space-x-4">
            {user ? (
              <ClickAwayListener onClickAway={() => setShowMenu(false)}>
                <div className="relative">
                  <button
                    className="py-2.5 px-[15px] border border-solid border-[#e4e4e4] mx-[15px] bg-white flex items-center"
                    onClick={() => setShowMenu((prevState) => !prevState)}
                  >
                    {" "}
                    <FaUserAlt className="sm:hidden" />
                    <span className="hidden sm:block">
                      {" "}
                      Hi, {user.firstname}
                    </span>
                    <MdKeyboardArrowDown className="ml-1 inline-block" />
                  </button>

                  {showMenu && (
                    <div className="absolute top-[100%] left-[15px] rounded-[0.25rem] z-[70] bg-black min-w-[9rem]  sm:min-w-[10rem] mt-0.5 overflow-hidden">
                      <Link
                        to="/profile"
                        className="py-2.5 px-5 text-white uppercase text-[15px] block hover:bg-primary"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="py-2.5 px-5 text-white uppercase text-[15px] block hover:bg-primary w-full text-left"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </ClickAwayListener>
            ) : (
              <>
                <Link to="/login" className="text-[12px]">
                  LOGIN
                </Link>
                <Link to="/register" className="text-[12px]">
                  REGISTER
                </Link>
              </>
            )}

            <Link to="/cart">
              <div className="relative mr-5">
                <FaShoppingBag />
                {cart.length ? (
                  <div className="text-xs absolute -top-4 -right-4 rounded-full w-[20px] h-[20px] bg-red-500 text-white flex justify-center items-center">
                    {cart.length}
                  </div>
                ) : null}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
