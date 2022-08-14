import React from "react";
import Navbar from "../components/Navbar";
import { FaUser, FaShuttleVan } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import CurrencyFormatter from "../components/CurrencyFormatter";
import {
  useGetOrderQuery,
  usePayOrderMutation,
} from "../apps/services/product";
import Loader from "../components/reuseables/Loader";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { usePaystackPayment } from "react-paystack";
import { format } from "date-fns";
import Toast from "../components/reuseables/Toast";
import { useRef } from "react";
import { toast } from "react-toastify";

const Order = () => {
  const user = useSelector((state) => state.user.user);
  const payment = useSelector((state) => state.cart.payment.payment);
  const orderDetails = useSelector((state) => state.products.order);
  const { id } = useParams();
  const { data: order, isError, isLoading } = useGetOrderQuery(id);
  const [payOrder] = usePayOrderMutation();
  const toastId = useRef(null);

  const toastObj = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: true,
    autoClose: 2000,
  };

  const total = order?.orderItems.reduce(
    (initial, item) => initial + item.price * item.quantity,
    0
  );

  const flutterwaveConfig = {
    public_key: import.meta.env.VITE_FLW_PUBLIC,
    tx_ref: Date.now(),
    amount: order?.totalPrice,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: order?.user.email,
      phonenumber: user.phone,
      name: `${order?.user.firstname} ${order?.user.lastname}`,
    },
    customizations: {
      title: "Item Purchased",
      description: "Payment for items in cart",
      logo: "https://res.cloudinary.com/citi-tasker/image/upload/v1660304830/STORE/webImages/brand_ivdqul.png",
    },
  };

  const paystackConfig = {
    reference: new Date().getTime().toString(),
    email: order?.user.email,
    amount: order?.totalPrice,
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC,
  };

  const onSuccess = (reference) => {
    const data = {
      id: reference.trxref,
      status: "Paid",
      updated_time: Date.now(),
      email_address: user.email,
      transactionDetail: reference,
    };
    payOrder({ id, data })
      .unwrap()
      .then()
      .catch((error) => {
        toastId.current = toast.error(error.data.message, toastObj);
      });
  };

  const onClose = () => {};

  const handleFlutterPayment = useFlutterwave(flutterwaveConfig);
  const initializePayment = usePaystackPayment(paystackConfig);

  const handlePayment = () => {
    if (payment === "paystack") {
      initializePayment(onSuccess, onClose);
    } else {
      handleFlutterPayment({
        callback: (response) => {
          if (response.status === "successful") {
            const data = {
              id: response.tx_ref,
              status: "Paid",
              updated_time: Date.now(),
              email_address: user.email,
              transactionDetail: response,
            };
            payOrder({ id, data })
              .unwrap()
              .then(() => {
                //
              })
              .catch((error) => {
                toastId.current = toast.error(error.data.message, toastObj);
              });
          }
          closePaymentModal();
        },
        onClose: () => {},
      });
    }
  };

  return (
    <div>
      <Navbar />
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Toast />
      ) : (
        <div className="container">
          <div className="bg-[#e5fee9] py-[30px] flex flex-col md:flex-row items-center md:items-start">
            <div className="w-full md:w-1/3 mb-6 px-3 flex flex-col space-y-3 md-x:space-y-0 md-x:flex-row items-center md:items-start">
              <div className="w-[80px] h-[80px] shrink-0 px-4 rounded-full flex items-center justify-center bg-[#d1e7dd] border border-solid border-[#badbcc]">
                <FaUser className="text-[#0f5132] text-[25px]" />
              </div>
              <div className="px-3 w-full text-center md:text-left">
                <h5 className="mb-[6px] font-[700]">Customer</h5>
                <p className="mt-0.5">{`${order.user.firstname} ${order.user.lastname}`}</p>
                <p className="mt-0.5">{order.user.email}</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 mb-6 px-3 flex flex-col space-y-3 md-x:space-y-0 md-x:flex-row items-center md:items-start">
              <div className="w-[80px] h-[80px] shrink-0 px-4 rounded-full flex items-center justify-center bg-[#d1e7dd] border border-solid border-[#badbcc]">
                <FaShuttleVan className="text-[#0f5132] text-[25px]" />
              </div>
              <div className="px-3 w-full text-center md:text-left">
                <h5 className="mb-[6px] font-[700]">Order info</h5>
                <p className="mt-0.5">Ship to: {order.shippingAddress.state}</p>
                <p className="mt-0.5">Payment Method: {order.payment}</p>
                {orderDetails?.isPaid ? (
                  <div className="p-[0.25rem] bg-blue-500">
                    <p className="mt-[2px] text-white text-sm">
                      Paid:{" "}
                      {orderDetails &&
                        format(new Date(orderDetails.paidAt), "PPpp")}
                    </p>
                  </div>
                ) : (
                  <div className="p-[0.25rem] bg-[#DC3545] ">
                    <p className="mt-[2px] text-white text-sm">Not Paid</p>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full md:w-1/3 mb-6 px-3 flex flex-col space-y-3 md-x:space-y-0 md-x:flex-row items-center md:items-start">
              <div className="w-[80px] h-[80px] shrink-0 px-4 rounded-full flex items-center justify-center bg-[#d1e7dd] border border-solid border-[#badbcc]">
                <MdLocationPin className="text-[#0f5132] text-[25px]" />
              </div>
              <div className="px-3 w-full text-center md:text-left">
                <h5 className="mb-[6px] font-[700]">Deliver to</h5>
                <p className="mt-0.5">{order.shippingAddress.address}</p>
                {orderDetails?.isDelivered ? (
                  <div className="p-[0.25rem] bg-blue-500 ">
                    <p className="mt-[2px] text-white text-sm">
                      Item Delivered
                    </p>
                  </div>
                ) : (
                  <div className="p-[0.25rem] bg-[#DC3545]">
                    <p className="mt-[2px] text-white text-sm">Not Delivered</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col md-x:flex-row justify-between">
            <div className="flex flex-col justify-between !w-full md:w-[65%]">
              {order &&
                order.orderItems?.map((product) => (
                  <div key={product._id} className="px-3 w-full">
                    <div className="my-10">
                      <div className="my-10 p-5 flex items-center relative border-b-2 border-solid border-[#f3f3f3] flex-col md:flex-row">
                        <div className="w-full max-w-full shrink-0 md:shrink-1 md:w-1/4 px-3">
                          <img
                            src={product.image}
                            alt=""
                            className="w-full h-[150px] object-contain"
                          />
                        </div>
                        <div className="px-3 w-full max-w-full shrink-0 md:w-[40%] my-4 md:my-0 text-center md:text-left">
                          <Link to={`/product/${product._id}`}>
                            {product.name}
                          </Link>
                        </div>
                        <div className="flex w-full justify-between">
                          <div className="text-center">
                            <h6 className="uppercase font-[300] mb-[8px]">
                              Quantity
                            </h6>
                            <p>{product.quantity}</p>
                          </div>
                          <div className="text-center">
                            <h6 className="uppercase font-[300] mb-[8px]">
                              Subtotal
                            </h6>
                            <h4 className="font-[500] text-[17px]">
                              <CurrencyFormatter
                                price={product.price * product.quantity}
                              />
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="px-3 mt-[3rem] w-full md-x:w-1/4">
              <table className="bg-[#f3f3f3] text-[#212529] border-[#dee2e6] w-full mb-4 table-fixed">
                <tbody>
                  <tr>
                    <td className="p-2 font-[600] border border-solid border-collapse border-[#dee2e6]">
                      Products
                    </td>
                    <td className="p-2 border border-solid border-collapse border-[#dee2e6]">
                      <CurrencyFormatter price={total} />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 font-[600] border border-solid border-collapse border-[#dee2e6]">
                      Shipping
                    </td>
                    <td className="p-2 border border-solid border-collapse border-[#dee2e6]">
                      <CurrencyFormatter price={order.shippingPrice} />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 font-[600] border border-solid border-collapse border-[#dee2e6]">
                      Tax
                    </td>
                    <td className="p-2 border border-solid border-collapse border-[#dee2e6]">
                      <CurrencyFormatter price={order.taxPrice} />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 font-[600] border border-solid border-collapse border-[#dee2e6]">
                      Total
                    </td>
                    <td className="p-2 border border-solid border-collapse border-[#dee2e6]">
                      <CurrencyFormatter price={order.totalPrice} />
                    </td>
                  </tr>
                </tbody>
              </table>
              {!orderDetails?.isPaid && (
                <button
                  onClick={handlePayment}
                  className="py-[15px] font-semibold text-white bg-primary rounded-[5px] uppercase w-full text-xs mb-[30px]"
                >
                  Make Payment
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
