import React, { useState } from "react";
import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../apps/features/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {
  useGetProductReviewsQuery,
  usePostReviewMutation,
  useProductQuery,
} from "../apps/services/product";
import Loader from "../components/reuseables/Loader";
import CurrencyFormatter from "../components/CurrencyFormatter";
import { BiLoaderCircle } from "react-icons/bi";
import { format } from "date-fns";
import Alert from "../components/reuseables/Alert";

const ProductDetails = () => {
  const { id } = useParams();
  const {
    data: product,
    error: productErr,
    isError,
    isLoading,
  } = useProductQuery(id);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(false);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const [
    postReview,
    {
      isLoading: reviewIsLoader,
      isError: postReviewIsError,
      error: postReviewError,
    },
  ] = usePostReviewMutation();
  const [review, setReview] = useState({ rating: "", comment: "" });
  const reviews = useSelector((state) => state.products.reviews);
  const user = useSelector((state) => state.user.user);
  useGetProductReviewsQuery(id);
  const [reviewErr, setReviewErr] = useState("");

  const addItemToCart = () => {
    const checIfItemInCart = cart.some((product) => product._id == id);
    if (!checIfItemInCart) {
      dispatch(
        addToCart({
          ...product,
          quantity: Number(quantity),
          total: product.price * quantity,
        })
      );
      navigateTo("/cart");
    } else {
      setError(true);
      setTimeout(() => setError(false), 0);
    }
  };

  const handleForm = (e) => {
    setReview((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      ...review,
      fullname: `${user.firstname} ${user.lastname.charAt(0)}`,
      image: user.image,
    };

    postReview({ id, data })
      .unwrap()
      .then(() => {
        setReview({ rating: "", comment: "" });
      })
      .catch((error) => {
        setReviewErr(error.data.message);
      });
  };

  return (
    <>
      <Navbar />
      <section className="container mt-[50px] mb-[50px]">
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Alert show={isError} type="error">
            {productErr.data.message}
          </Alert>
        ) : (
          <>
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 px-3 mb-[50px] md:mb-0">
                <div className="flex md:mr-5 h-[400px] md-s:h-[700px] justify-center items-center bg-[#f3fbf7]">
                  <img
                    src={product.image}
                    alt=""
                    className="w-[90%] h-full object-contain"
                  />
                </div>
              </div>
              <div className="flex-1 px-3">
                <Alert show={error} type="error">
                  {product.name} is already added to your cart
                </Alert>
                <div className="text-[25px] font-semibold leading-5 mb-[30px]">
                  {product.name}
                </div>
                <p className="text-[#7a7a7a] leading-6">
                  {product.description}
                </p>

                <div className="border-2 border-solid border-[#f3f3f3] rounded-[5px] mt-10 lg:w-1/2 md-s:w-full">
                  <div className="border-b-2 border-solid border-[#f3f3f3] py-[15px] px-[25px] flex justify-between">
                    <h6 className="text-[16px]">Price</h6>
                    <span className="font-semibold text-black">
                      <CurrencyFormatter price={product.price} />
                    </span>
                  </div>
                  <div className="border-b-2 border-solid border-[#f3f3f3] py-[15px] px-[25px] flex justify-between">
                    <h6 className="text-[16px]">Status</h6>
                    <span className="font-semibold text-black">
                      {product.countInStock > 0 ? "In Stock" : "Out of stock"}
                    </span>
                  </div>
                  <div className="border-b-2 border-solid border-[#f3f3f3] py-[15px] px-[25px] flex justify-between">
                    <h6 className="text-[16px]">Review</h6>
                    <div className="font-semibold text-black flex justify-between items-center">
                      <div className="mr-2 flex">
                        {Array(product.rating)
                          .fill(0)
                          .map((_, i) => (
                            <FaStar
                              key={i}
                              className="text-[#ebb450] text-xs mr-0.5"
                            />
                          ))}
                        {Array(5 - product.rating)
                          .fill(0)
                          .map((_, i) => (
                            <FaRegStar
                              key={i}
                              className="text-[#ebb450] text-xs mr-0.5"
                            />
                          ))}
                      </div>
                      {product.numReviews} reviews
                    </div>
                  </div>
                  {product.countInStock > 0 && (
                    <div className="border-b-2 border-solid border-[#f3f3f3] py-[15px] px-[25px] flex justify-between">
                      <h6 className="text-[16px]">Quantity</h6>
                      <select
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="text-center font-semibold text-black w-[100px] h-10 bg-[#f3f3f3] rounded-[5px] focus:outline-none"
                      >
                        {Array(product.countInStock)
                          .fill(0)
                          .map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}
                  <button
                    disabled={product.countInStock === 0}
                    onClick={addItemToCart}
                    className={`h-[50px] w-full text-white font-semibold rounded-bl-[5px] rounded-br-[5px] uppercase text-[15px]  transition duration-200 ${
                      !product.countInStock
                        ? "cursor-not-allowed bg-black/40"
                        : "hover:bg-primary bg-black"
                    }`}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-[3rem]">
              <h3 className="mb-4 pl-3 uppercase font-[300]">Reviews</h3>
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 px-3">
                  {reviews.length ? (
                    reviews.map((review) => (
                      <div
                        key={review._id}
                        className="p-4 shadow-sm bg-[#f8f9fa] mb-4"
                      >
                        <div className="flex">
                          <img
                            src={review.image}
                            className="w-[60px] h-[60px] object-contain"
                            alt=""
                          />
                          <div className="ml-3">
                            <strong className="font-normal">
                              {review.name}.
                            </strong>
                            <div className="flex my-1">
                              {Array(review.rating)
                                .fill(0)
                                .map((_, i) => (
                                  <FaStar
                                    key={i}
                                    className="text-[#ebb450] text-xs mr-0.5"
                                  />
                                ))}
                              {Array(5 - review.rating)
                                .fill(0)
                                .map((_, i) => (
                                  <FaRegStar
                                    key={i}
                                    className="text-[#ebb450] text-xs mr-0.5"
                                  />
                                ))}
                            </div>
                            <span className="text-xs">
                              {format(new Date(review.createdAt), "Pp")}
                            </span>
                          </div>
                        </div>
                        <div className="my-4 text-[#055160] bg-[#cff4fc] border border-solid border-[#b6effb] p-4">
                          {review.comment}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="w-full px-3 py-4 rounded-[4px] font-[300] bg-orange-100 mb-5">
                      No Reviews
                    </div>
                  )}
                </div>
                <div className="flex-1 px-3">
                  {user ? (
                    <>
                      {postReviewIsError && (
                        <Alert show={postReviewIsError} type="error">
                          {reviewErr}
                        </Alert>
                      )}
                      <h3 className="mb-4 uppercase font-[300]">
                        WRITE A CUSTOMER REVIEW
                      </h3>
                      <form onSubmit={handleSubmit}>
                        <div className="my-6">
                          <label htmlFor="rating">Rating</label>
                          <select
                            required
                            name="rating"
                            value={review.rating}
                            onChange={handleForm}
                            className="p-4 mt-2 w-full bg-[#f8f9fa] focus:outline-none"
                            id="rating"
                          >
                            <option value="">Select</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                          </select>
                        </div>
                        <div className="mb-6">
                          <label htmlFor="rating">Comment</label>
                          <textarea
                            required
                            name="comment"
                            value={review.comment}
                            onChange={handleForm}
                            className="w-full h-[120px] mt-2 p-4 bg-[#f8f9fa] focus:outline-none"
                          ></textarea>
                        </div>
                        <button
                          type="submit"
                          className="bg-black text-white w-full uppercase p-4 rounded-[4px] flex items-center justify-center"
                        >
                          {reviewIsLoader ? (
                            <BiLoaderCircle className="text-[30px] animate-spin duration-1000" />
                          ) : (
                            "Submit"
                          )}
                        </button>
                      </form>
                    </>
                  ) : (
                    <div className="bg-[#ffecb5] mb-5 rounded-[5px] py-5 px-3 flex">
                      <span className=" text-[#664d03] font-[300]">
                        Please{" "}
                        <Link className="text-black font-[500]" to="/login">
                          " Login "
                        </Link>{" "}
                        to write a review
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default ProductDetails;
