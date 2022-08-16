import React from "react";
import { useParams } from "react-router";
import {
  useChangePasswordMutation,
  useResetPasswordQuery,
} from "../apps/services/auth";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "../components/TextField";
import { BiLoaderCircle } from "react-icons/bi";
import Alert from "../components/reuseables/Alert";
import { Link } from "react-router-dom";
import Loader from "../components/reuseables/Loader";

const ResetPassword = () => {
  const { userId, uniqueString } = useParams();
  const { data, error, isError, isLoading, isSuccess } = useResetPasswordQuery({
    userId,
    uniqueString,
  });
  const [changePassword, result] = useChangePasswordMutation();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div className="bg-red-50 h-screen fixed w-full">
          <div className="container w-full">
            <div className="px-5">
              <div className="mx-auto max-w-[400px] text-center bg-white w-full mt-[40%] sm:mt-[10%] rounded-[8px] p-[30px] border border-solid border-black/20 shadow-[0_0_20px_0_rgba(0,0,0,0.0.5)] animate__animated animate__animated animate__slideInUp">
                <img
                  className="w-[80px] mb-5 block mx-auto"
                  src="https://res.cloudinary.com/citi-tasker/image/upload/v1660679747/STORE/webImages/lock_s53k5j.png"
                  alt=""
                />
                <h1 className="text-[20px] sm:text-[25px] font-bold mb-4">
                  Password reset failed
                </h1>
                <p className="font-[400] text-[14px]">{error.data.message}</p>

                <Link
                  to="/forgot-password"
                  className="flex justify-center bg-red-300 hover:bg-red-400 transition-all duration-300 text-white py-3 w-full rounded-[5px] mt-5"
                >
                  Resend
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container px-[20px] py-[50px]">
          <div className="px-5 mb-40">
            <div className="max-w-[380px] w-full mx-auto mt-[10%] sm:mt-[5%] animate__animated animate__slideInUp">
              {isSuccess && (
                <Alert type="success" show={isSuccess}>
                  Profile Updated
                </Alert>
              )}
              <h2 className="uppercase text-center mb-2 font-[500] text-[24px] sm:text-[36px]">
                Reset Password
              </h2>
              <p className="mx-auto max-w-[380px] text-[14px] w-full mb-[24px] text-center space-x-6">
                Sorry, happens to the best of us. Give us your email address and
                we’ll fix this together.
              </p>
              <Formik
                initialValues={{
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={Yup.object({
                  password: Yup.string()
                    .min(6, "Password must be at least 6 characters")
                    .required("Password is required"),
                  confirmPassword: Yup.string()
                    .required("Confirm password is required")
                    .oneOf([Yup.ref("password"), null], "Passwords must match"),
                })}
                onSubmit={(values, { setSubmitting }) => {
                  const { password, ...others } = values;
                  // console.log(password);
                  changePassword({ userId, password });
                  setSubmitting(false);
                }}
              >
                <Form className="border border-solid border-[#000]/20 p-[30px] bg-white rounded-[8px] shadow-[0_0_20px_0_rgba(0,0,0,0.0.5)]">
                  <div className="mb-[20px]">
                    <TextField
                      name="password"
                      type="password"
                      placeholder="Enter Password"
                    />
                  </div>
                  <TextField
                    name="confirmPassword"
                    type="password"
                    placeholder="Comfirm Password"
                  />
                  <button
                    type="submit"
                    className="w-full uppercase h-[50px] mt-[20px] px-4 rounded-[5px] text-white bg-primary flex justify-center items-center box-border"
                  >
                    {result.isLoading ? (
                      <BiLoaderCircle className="text-[30px] animate-spin duration-1000" />
                    ) : (
                      "Submit"
                    )}
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
