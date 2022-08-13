import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Flutterwave from "../assets/Flutterwave-icon.png";
import Paystack from "../assets/paystack-icon.png";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addPayment } from "../apps/features/cartSlice";
import { useNavigate } from "react-router";

const Payment = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const payment = useSelector((state) => state.cart.payment.payment);
  return (
    <div>
      <Navbar />
      <div className="py-[50px] px-[20px] flex justify-center">
        <div className="w-[500px] shadow-lg py-[35px] px-[30px] bg-white rounded-[5px]">
          <h2 className="text-center font-[400]">SELECT PAYMENT METHOD</h2>
          <Formik
            initialValues={{
              payment: payment ? payment : "",
            }}
            validationSchema={Yup.object({
              payment: Yup.string().required("Payment method is required"),
            })}
            onSubmit={(value, { setSubmitting }) => {
              dispatch(addPayment(value));
              navigateTo("/placeorder");
              setSubmitting(false);
            }}
          >
            {({ values }) => (
              <Form>
                <div className="mt-5 flex space-x-5">
                  <label
                    htmlFor="flutterwave"
                    className={`shadow-md p-4 rounded-[5px] bg-white w-1/2 ring-2 ring-solid ${
                      payment === "flutterwave" && "ring-primary bg-green-100"
                    }`}
                  >
                    <Field
                      id="flutterwave"
                      type="radio"
                      name="payment"
                      value="flutterwave"
                    />
                    <div className="flex items-center w-full">
                      <img
                        src={Flutterwave}
                        alt=""
                        className="w-[30px] mr-3 flutter"
                      />
                      Flutterwave
                    </div>
                  </label>
                  <label
                    htmlFor="paystack"
                    className={`shadow-md p-4 rounded-[5px] bg-white w-1/2 ring-2 ring-solid ${
                      payment === "flutterwave" && "ring-primary bg-green-100"
                    }`}
                  >
                    <Field
                      id="paystack"
                      type="radio"
                      name="payment"
                      value="paystack"
                    />
                    <div className="flex items-center w-full">
                      <img
                        src={Paystack}
                        alt=""
                        className="w-[30px] mr-3 flutter"
                      />
                      Paystack
                    </div>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full mt-[20px] p-[20px] rounded-[5px] text-white bg-primary uppercase"
                >
                  Continue
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Payment;
