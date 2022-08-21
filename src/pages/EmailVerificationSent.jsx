import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const EmailVerificationSent = () => {
  return (
    <div className="bg-green-50 fixed w-full">
      <div className="container h-screen w-full">
        <div className="px-5">
          <div className="mx-auto bg-white max-w-[380px] w-full mt-[40%] sm:mt-[10%] p-[30px] text-center rounded-[8px] border border-solid border-black/20 shadow-[0_0_20px_0_rgba(0,0,0,0.0.05)] animate__animated animate__slideInUp">
            <img
              className="w-[80px] mb-5 block mx-auto"
              src="https://res.cloudinary.com/citi-tasker/image/upload/v1660605068/STORE/webImages/envelope_ddl3bx.png"
              alt=""
            />
            <h1 className="text-[18px] sm:text-[25px] font-bold mb-4">
              We’ve sent you an email.
            </h1>
            <p className="font-[400] text-[14px]">
              Click the link we’ve sent to your email. If you don’t see it,
              please be sure to check your spam folder.
            </p>

            <Link
              to="/login"
              className="bg-green-400 hover:bg-green-500 transition-all duration-300 text-white py-3 w-full rounded-[5px] mt-5 inline-block"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationSent;
