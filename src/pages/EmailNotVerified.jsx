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
    <div>
      <>
        <Navbar />
        <div className="bg-red-50 w-full h-[calc(100vh-90px)] relative">
          <div className="mx-auto max-w-[450px] w-full  absolute top-[20%] left-[50%] translate-x-[-50%]">
            <div className=" mx-4 px-4 sm:px-9 py-10 rounded-[5px] bg-white text-center shadow-md">
              <img
                className="w-[80px] mb-5 block mx-auto"
                src="https://res.cloudinary.com/citi-tasker/image/upload/v1660605068/STORE/webImages/envelope_ddl3bx.png"
                alt=""
              />
              <h1 className="text-[20px] font-bold mb-4">Not Verified</h1>
              <p className="font-[400]">
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
      </>
    </div>
  );
};

export default EmailNotVerified;
