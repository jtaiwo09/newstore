import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import ProfileCover from "../assets/cover-profile.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TextField from "../components/TextField";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { format } from "date-fns";
import { useUpdateProfileMutation } from "../apps/services/user";
import { BiLoaderCircle } from "react-icons/bi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toast from "../components/reuseables/Toast";
import { useGetAllOrdersQuery } from "../apps/services/product";
import Loader from "../components/reuseables/Loader";
import CurrencyFormatter from "../components/CurrencyFormatter";

const Profile = () => {
  const [toggle, setToggle] = useState(true);
  const user = useSelector((state) => state.user.user);
  const [updateProfile, { error, isError, isLoading, isSuccess }] =
    useUpdateProfileMutation();
  const toastId = useRef(null);
  const {
    data: orderList,
    isLoading: loading,
    isError: isErr,
  } = useGetAllOrdersQuery();

  const toastObj = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: true,
    autoClose: 2000,
  };
  return (
    <div>
      <Toast />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <div className="container mt-[3rem]">
            <div className="flex flex-col md-s:flex-row space-y-10 md-s:space-y-0">
              <div className="shadow-lg h-fit w-full md-s:w-[30%]">
                <div className="pb-4">
                  <div>
                    <img
                      src={ProfileCover}
                      className="w-full h-[100px] bg-cover "
                      alt=""
                    />
                  </div>
                  <div className="py-5 px-2.5 flex items-center relative">
                    <div className="w-1/2 -mt-[5rem]">
                      <img
                        src={user.image}
                        alt="profile image"
                        className="w-[100px] h-[100px] drop-shadow-sm object-cover rounded-full"
                      />
                    </div>
                    <div className="w-[60%] px-3">
                      <h5 className="mb-2">{`${user.firstname} ${user.lastname}`}</h5>
                      <span>
                        Joined {format(new Date(user.createdAt), "MMMM d, y")}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-col">
                  <button
                    className={`text-left py-[15px] px-[20px] ${
                      toggle === true ? "bg-[#e5fee9]" : "bg-white"
                    } text-[13px] text-black uppercase rounded-none border-t border-solid border-[#e4e4e4] transition-all duration-200`}
                    onClick={() => setToggle(true)}
                  >
                    Profile Settings
                  </button>
                  <button
                    className={`flex justify-between items-center py-[15px] px-[20px] ${
                      toggle === false ? "bg-[#e5fee9]" : "bg-white"
                    } text-[13px] text-black uppercase rounded-none border-t border-solid border-[#e4e4e4] transition-all duration-200`}
                    onClick={() => setToggle(false)}
                  >
                    Order List
                    <span className="w-6 h-6 flex rounded-full items-center justify-center text-white bg-red-500">
                      {orderList.length}
                    </span>
                  </button>
                </div>
              </div>
              {toggle ? (
                <div className="md:px-4 pb-[3rem] w-[100%] md-s:w-[70%] animate__animated animate__backInUp">
                  <Formik
                    initialValues={
                      user
                        ? {
                            firstname: user.firstname,
                            lastname: user.lastname,
                            email: user.email,
                            phone: user.phone,
                            password: "",
                            confirmPassword: "",
                          }
                        : {
                            firstname: "",
                            lastname: "",
                            email: "",
                            phone: "",
                            password: "",
                            confirmPassword: "",
                          }
                    }
                    validationSchema={Yup.object({
                      firstname: Yup.string().required("Firstname is required"),
                      lastname: Yup.string().required("Lastname is required"),
                      phone: Yup.string().required("Phone Number is required"),
                      email: Yup.string()
                        .email("Must be a valid email")
                        .required("email is required"),
                      password: Yup.string().required("Password is required"),
                      confirmPassword: Yup.string()
                        .required("Confirm password is required")
                        .oneOf(
                          [Yup.ref("password"), null],
                          "Passwords must match"
                        ),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                      updateProfile({ ...values, id: user._id })
                        .unwrap()
                        .then(
                          () =>
                            (toastId.current = toast.success(
                              "Profile Updated",
                              toastObj
                            ))
                        )
                        .catch(
                          (error) =>
                            (toastId.current = toast.error(
                              error.data.message,
                              toastObj
                            ))
                        );

                      setSubmitting(false);
                    }}
                  >
                    <Form className="w-full flex flex-col">
                      <div className="flex w-full space-y-5 md:space-y-0 md:space-x-5 px-2.5 pb-4 flex-col md:flex-row">
                        <TextField
                          name="firstname"
                          type="text"
                          placeholder="Enter Firstname"
                          className="py-4 px-2.5 w-full text-[17px] bg-[#e5fee9] focus:outline-none"
                        />
                        <TextField
                          name="lastname"
                          type="text"
                          placeholder="Enter Lastname"
                          className="py-4 px-2.5 w-full text-[17px] bg-[#e5fee9] focus:outline-none"
                        />
                      </div>
                      <div className="flex w-full space-y-5 md:space-y-0 md:space-x-5 px-2.5 pb-4 flex-col md:flex-row">
                        <TextField
                          name="phone"
                          type="text"
                          placeholder="Enter Phone number"
                          className="py-4 px-2.5 w-full text-[17px] bg-[#e5fee9] focus:outline-none"
                        />
                        <TextField
                          name="email"
                          type="email"
                          placeholder="Enter Email"
                          className="py-4 px-2.5 w-full text-[17px] bg-[#e5fee9] focus:outline-none"
                        />
                      </div>
                      <div className="flex w-full space-y-5 md:space-y-0 md:space-x-5 px-2.5 pb-4 flex-col md:flex-row">
                        <TextField
                          name="password"
                          type="password"
                          placeholder="Enter Password"
                          className="py-4 px-2.5 w-full text-[17px] bg-[#e5fee9] focus:outline-none"
                        />
                        <TextField
                          name="confirmPassword"
                          type="password"
                          placeholder="Confirm Password"
                          className="py-4 px-2.5 w-full text-[17px] bg-[#e5fee9] focus:outline-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="py-[15px] mt-5 bg-primary text-white text-[13px] border-0 uppercase text-4 flex justify-center w-full"
                      >
                        {isLoading ? (
                          <BiLoaderCircle className="text-[20px] animate-spin duration-1000" />
                        ) : (
                          "Update Profile"
                        )}
                      </button>
                    </Form>
                  </Formik>
                </div>
              ) : (
                <>
                  {orderList.length ? (
                    <div className="!mb-[3rem] md-s:px-3 w-full md-s:w-[70%] overflow-x-scroll">
                      <table className="w-[100%] min-w-[516px] max-h-fit">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>STATUS</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          {orderList.map((order) => (
                            <tr
                              key={order._id}
                              className={`bg-[#f8d7da] border-b border-solid border-[#f5c2c7] ${
                                order.isPaid ? "bg-green-50" : "bg-[#f8d7da]"
                              }`}
                            >
                              <td>
                                <Link
                                  className="text-blue-500 underline"
                                  to={`/orders/${order._id}`}
                                >
                                  {order._id}
                                </Link>
                              </td>
                              <td
                                className={`p-[0.5rem] ${
                                  order.isPaid
                                    ? "text-green-800"
                                    : "text-[#842029]"
                                } `}
                              >
                                {order.isPaid ? "Paid" : "Not Paid"}
                              </td>
                              <td
                                className={`${
                                  order.isPaid
                                    ? "text-green-800"
                                    : "text-[#842029]"
                                } `}
                              >
                                {format(new Date(order.createdAt), "PP")}
                              </td>
                              <td
                                className={`${
                                  order.isPaid
                                    ? "text-green-800"
                                    : "text-[#842029]"
                                } `}
                              >
                                <CurrencyFormatter price={order.totalPrice} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="mx-4 h-fit w-full md-s:w-[70%] text-center text-[#055160] bg-[#cff4fc] border border-solid border-[#b6effb] p-4 rounded-[5px] animate__animated animate__headShake">
                      No Order
                      <Link
                        to="/"
                        className="uppercase rounded-md text-xs bg-[#198754] text-white py-4 px-[3rem] mx-[3rem]"
                      >
                        Shop Now
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
