import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart, setQuantity } from "../apps/features/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CurrencyFormatter from "./CurrencyFormatter";

const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  // const [quantity, setQuantity] = useState(product.quantity);
  const cart = useSelector((state) => state.cart.cart);
  const cartQuantity = cart.find((item) => item._id == product._id);

  const removeItemFromCart = () => {
    dispatch(removeFromCart({ id: product._id }));
    toast.success(`${product.name} removed from cart`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <div className="my-10 p-5 flex items-center relative shadow-md flex-col md:flex-row">
      <div
        onClick={removeItemFromCart}
        className="text-red cursor-pointer w-6 h-6 flex justify-center items-center bg-red-500 rounded-full absolute -top-3 -left-2"
      >
        <FaTimes className="text-white" />
      </div>
      <div className="w-full max-w-full shrink-0 md:shrink-1 md:w-1/4 px-3">
        <img
          src={product.image}
          alt=""
          className="w-full h-[150px] object-contain"
        />
      </div>
      <div className="px-3 w-full max-w-full shrink-0 md:w-[40%] text-center my-4 md:my-0">
        <Link to={`/product/${product._id}`}>{product.name}</Link>
      </div>
      <div className="flex w-full justify-between">
        <div className="flex flex-col h-full">
          <h6 className="uppercase font-[300] mb-[15px]">Quantity</h6>
          <select
            value={cartQuantity.quantity}
            onChange={(e) =>
              dispatch(
                setQuantity({ quantity: e.target.value, id: product._id })
              )
            }
            className="border border-solid border-[#c5c5c5] font-semibold text-black w-[140px] p-[15px] rounded-[5px] focus:outline-none"
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
        <div className="flex flex-col items-end h-full">
          <h6 className="uppercase font-[300] mb-[15px]">Price</h6>
          <h4 className="font-[500] text-[17px]">
            <CurrencyFormatter price={product.price} />
          </h4>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
