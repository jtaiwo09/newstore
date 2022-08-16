import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useVerifyEmailQuery } from "../apps/services/auth";
import Navbar from "../components/Navbar";
import Loader from "../components/reuseables/Loader";

const VerifyEmail = () => {
  const { userId, uniqueString } = useParams();

  const { data, error, isError, isLoading } = useVerifyEmailQuery({
    userId,
    uniqueString,
  });

  console.log(isLoading, error);

  console.log(userId, uniqueString);
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <div
            className={`${
              isError ? "bg-red-50" : "bg-green-50"
            } w-full h-[calc(100vh-90px)] relative`}
          >
            <div className="mx-auto max-w-[450px] w-full  absolute top-[20%] left-[50%] translate-x-[-50%]">
              <div className=" mx-4 px-4 sm:px-9 py-10 rounded-[5px] bg-white text-center shadow-md">
                <img
                  className="w-[80px] mb-5 block mx-auto"
                  src="https://res.cloudinary.com/citi-tasker/image/upload/v1660605068/STORE/webImages/envelope_ddl3bx.png"
                  alt=""
                />
                <h1 className="text-[20px] font-bold mb-4">
                  {isError
                    ? "Email Verification Failed"
                    : "Verification Successful"}
                </h1>
                {isError ? (
                  <p className="font-[400]">{error?.data.message}</p>
                ) : (
                  <p className="font-[400]">{data.message}</p>
                )}
                {!isError ? (
                  <Link
                    to="/login"
                    className="bg-primary text-white py-3 w-full rounded-[5px] mt-5 inline-block"
                  >
                    Login
                  </Link>
                ) : (
                  <div className="flex space-x-4">
                    <Link
                      to="/login"
                      className="bg-red-300 hover:bg-red-400 transition-all duration-300 text-white py-3 w-full rounded-[5px] mt-5 inline-block"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="bg-red-300 hover:bg-red-400 transition-all duration-300 text-white py-3 w-full rounded-[5px] mt-5 inline-block"
                    >
                      Signup
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VerifyEmail;
