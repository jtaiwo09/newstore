import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { BiLoaderCircle } from "react-icons/bi";
import { useResendVerificationMutation } from "../apps/services/auth";

const EmailNotVerified = () => {
  const navigate = useNavigate();
  const [resendVerification, { error, isError, isLoading, isSuccess }] =
    useResendVerificationMutation();

  if (isSuccess) {
    navigate("/email-verification-sent");
  }

  const handleClick = () => {
    const email = localStorage.getItem("email");
    resendVerification({ email });
  };
  return (
    <div className="bg-red-50 h-screen fixed w-full">
      <div className="container w-full">
        <div className="px-5">
          <div className="mx-auto max-w-[400px] text-center bg-white w-full mt-[40%] sm:mt-[10%] rounded-[8px] p-[30px] border border-solid border-black/20 shadow-[0_0_20px_0_rgba(0,0,0,0.0.05)] animate__animated animate__animated animate__slideInUp">
            <img
              className="w-[80px] mb-5 block mx-auto"
              src="https://res.cloudinary.com/citi-tasker/image/upload/v1660605068/STORE/webImages/envelope_ddl3bx.png"
              alt=""
            />
            <h1 className="text-[18px] sm:text-[25px] font-bold mb-4">
              Not Verified
            </h1>
            <p className="font-[400] text-[14px]">
              Your email is yet to be verified. Please check your email for a
              verification link or click the button below to resend a new
              verification link.
            </p>

            <button
              type="click"
              onClick={handleClick}
              className="flex justify-center bg-red-300 hover:bg-red-400 transition-all duration-300 text-white py-3 w-full rounded-[5px] mt-5"
            >
              {isLoading ? (
                <BiLoaderCircle className="text-[30px] animate-spin duration-1000" />
              ) : (
                "Resend"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailNotVerified;
