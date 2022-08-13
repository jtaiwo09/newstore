import React from "react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import TextField from "../components/TextField";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddShippingDetailsMutation,
  useGetShippingDetailsQuery,
} from "../apps/services/cart";
import { BiLoaderCircle } from "react-icons/bi";
import Loader from "../components/reuseables/Loader";

const Shipping = () => {
  const shipping = useSelector((state) => state.cart.shipping);
  const navigateTo = useNavigate();
  const [addShippingDetails, result] = useAddShippingDetailsMutation();
  const { data, error, isError, isLoading } = useGetShippingDetailsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="relative">
          <Navbar />
          <div className="py-[50px] px-[20px] flex justify-center">
            <Formik
              initialValues={{
                address: shipping ? shipping.address : "",
                city: shipping ? shipping.city : "",
                state: shipping ? shipping.state : "",
                landmark: shipping ? shipping.landmark : "",
                phone: shipping ? shipping.phone : "",
              }}
              validationSchema={Yup.object({
                address: Yup.string().required("Address is required"),
                city: Yup.string().required("City is required"),
                state: Yup.string().required("State is required"),
                phone: Yup.string().required("Phone number is required"),
              })}
              onSubmit={(values, { setSubmitting }) => {
                addShippingDetails(values)
                  .unwrap()
                  .then(() => navigateTo("/payment"))
                  .catch((error) => alert(error));

                setSubmitting(false);
              }}
            >
              <Form className="max-w-[500px] shadow-lg py-[35px] px-[30px] bg-white rounded-[5px] w-full flex flex-col">
                <TextField
                  name="address"
                  type="text"
                  placeholder="Enter Address"
                  className="w-full focus:outline-none border border-solid border-[#e4e4e4] p-[20px] rounded-[5px] text-[#8a8a8a]"
                />
                <TextField
                  name="city"
                  type="text"
                  placeholder="Enter City"
                  className="w-full mt-[10px] focus:outline-none border border-solid border-[#e4e4e4] p-[20px] rounded-[5px] text-[#8a8a8a]"
                />
                <TextField
                  name="state"
                  type="text"
                  placeholder="Enter State"
                  className="w-full mt-[10px] focus:outline-none border border-solid border-[#e4e4e4] p-[20px] rounded-[5px] text-[#8a8a8a]"
                />
                <TextField
                  name="landmark"
                  type="text"
                  placeholder="LandMark"
                  className="w-full mt-[10px] focus:outline-none border border-solid border-[#e4e4e4] p-[20px] rounded-[5px] text-[#8a8a8a]"
                />
                <TextField
                  name="phone"
                  type="text"
                  placeholder="Phone Number"
                  className="w-full mt-[10px] focus:outline-none border border-solid border-[#e4e4e4] p-[20px] rounded-[5px] text-[#8a8a8a]"
                />
                <button
                  type="submit"
                  className="w-full mt-[10px] p-[20px] rounded-[5px] text-white bg-primary flex justify-center items-center uppercase"
                >
                  {result.isLoading ? (
                    <BiLoaderCircle className="text-[30px] animate-spin duration-1000" />
                  ) : (
                    "Continue"
                  )}
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default Shipping;
