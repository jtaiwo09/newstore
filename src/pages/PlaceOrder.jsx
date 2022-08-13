import React from "react";
import Navbar from "../components/Navbar";
import { FaUser, FaShuttleVan } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CurrencyFormatter from "../components/CurrencyFormatter";
import { usePlaceOrderMutation } from "../apps/services/product";
import { BiLoaderCircle } from "react-icons/bi";
import { useRef } from "react";
import Toast from "../components/reuseables/Toast";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PlaceOrder = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.user);
  const [PlaceOrder, { error, isError, isLoading }] = usePlaceOrderMutation();
  const navigateTo = useNavigate();
  const toastId = useRef(null);

  const total = cart.cart.reduce(
    (initial, item) => initial + item.price * item.quantity,
    0
  );
  const data = {};

  const toastObj = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: true,
    autoClose: 2000,
  };

  data.orderItems = cart.cart;
  data.shippingAddress = cart.shipping;
  data.payment = cart.payment.payment;
  data.itemsPrice = total;
  data.shippingPrice = 200;
  data.taxPrice = total * 0.15;
  data.totalPrice = Math.round(total + data.shippingPrice + data.taxPrice);

  const handlePlaceOrder = (e) => {
    e.preventDefault;
    PlaceOrder(data)
      .unwrap()
      .then((order) => {
        navigateTo(`/orders/${order._id}`);
      })
      .catch((error) => {
        toastId.current = toast.error(error.data.message, toastObj);
      });
  };

  return (
    <div>
      <Navbar />
      <Toast />
      <div className="container">
        <div className="bg-[#e5fee9] py-[30px] flex flex-col md:flex-row items-center md:items-start">
          <div className="w-full md:w-1/3 mb-6 px-3 flex flex-col space-y-3 md-x:space-y-0 md-x:flex-row items-center md:items-start">
            <div className="w-[80px] h-[80px] px-4 rounded-full flex items-center justify-center bg-[#d1e7dd] border border-solid border-[#badbcc]">
              <FaUser className="text-[#0f5132] text-[25px]" />
            </div>
            <div className="px-3 w-full md:w-fit text-center md:text-left">
              <h5 className="mb-[6px] font-[700]">Customer</h5>
              <p className="mt-0.5">{`${user.firstname} ${user.lastname}`}</p>
              <p className="mt-0.5">{user.email}</p>
            </div>
          </div>
          <div className="w-full md:w-1/3 mb-6 px-3 flex flex-col space-y-3 md-x:space-y-0 md-x:flex-row items-center md:items-start">
            <div className="w-[80px] h-[80px] px-4 rounded-full flex items-center justify-center bg-[#d1e7dd] border border-solid border-[#badbcc]">
              <FaShuttleVan className="text-[#0f5132] text-[25px]" />
            </div>
            <div className="px-3 w-full md:w-fit text-center md:text-left">
              <h5 className="mb-[6px] font-[700]">Order info</h5>
              <p className="mt-0.5">Ship to: {cart.shipping.state}</p>
              <p className="mt-0.5">Payment Method: {cart.payment.payment}</p>
            </div>
          </div>
          <div className="w-full md:w-1/3 mb-6 px-3 flex flex-col space-y-3 md-x:space-y-0 md-x:flex-row items-center md:items-start">
            <div className="w-[80px] h-[80px] px-4 rounded-full flex items-center justify-center bg-[#d1e7dd] border border-solid border-[#badbcc]">
              <MdLocationPin className="text-[#0f5132] text-[25px]" />
            </div>
            <div className="px-3 w-full md:w-fit text-center md:text-left">
              <h5 className="mb-[6px] font-[700]">Deliver to</h5>
              <p className="mt-0.5">{cart.shipping.address}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col md-x:flex-row justify-between">
          <div className="flex flex-col justify-between !w-full md:w-[65%]">
            {cart.cart &&
              cart.cart.map((product) => (
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
                    <CurrencyFormatter price={data.shippingPrice} />
                  </td>
                </tr>
                <tr>
                  <td className="p-2 font-[600] border border-solid border-collapse border-[#dee2e6]">
                    Tax
                  </td>
                  <td className="p-2 border border-solid border-collapse border-[#dee2e6]">
                    <CurrencyFormatter price={data.taxPrice} />
                  </td>
                </tr>
                <tr>
                  <td className="p-2 font-[600] border border-solid border-collapse border-[#dee2e6]">
                    Total
                  </td>
                  <td className="p-2 border border-solid border-collapse border-[#dee2e6]">
                    <CurrencyFormatter price={data.totalPrice} />
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              onClick={handlePlaceOrder}
              className="py-[15px] text-white bg-primary uppercase w-full text-xs mb-[30px] flex items-center justify-center"
            >
              {isLoading ? (
                <BiLoaderCircle className="text-[30px] animate-spin duration-1000" />
              ) : (
                "Place Order"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
