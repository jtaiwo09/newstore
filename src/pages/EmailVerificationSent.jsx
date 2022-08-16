import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const EmailVerificationSent = () => {
  return (
    <div>
      <>
        <div className="bg-green-50 w-full h-screen flex justify-center items-center">
          <div className="mx-auto max-w-[450px] w-full -mt-[10%] animate__animated animate__slideInUp">
            <div className=" mx-6 px-4 sm:px-9 py-10 rounded-[5px] bg-white text-center shadow-md">
              <img
                className="w-[80px] mb-5 block mx-auto"
                src="https://res.cloudinary.com/citi-tasker/image/upload/v1660605068/STORE/webImages/envelope_ddl3bx.png"
                alt=""
              />
              <h1 className="text-[20px] font-bold mb-4">
                We’ve sent you an email.
              </h1>
              <p className="font-[400]">
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
      </>
    </div>
  );
};

export default EmailVerificationSent;
