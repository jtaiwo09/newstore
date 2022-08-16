import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Register from "./pages/Register";
import ScrollToTop from "./components/ScrollToTop";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Order from "./pages/Order";
import "./App.css";
import VerifyEmail from "./pages/VerifyEmail";
import EmailNotVerified from "./pages/EmailNotVerified";
import EmailVerificationSent from "./pages/EmailVerificationSent";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/search/:keyword" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/verify/:userId/:uniqueString" element={<VerifyEmail />} />
        <Route path="/email-notverified" element={<EmailNotVerified />} />

        <Route
          path="/email-verification-sent"
          element={<EmailVerificationSent />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route exact path="/profile" element={<Profile />} />
        </Route>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/payment" element={<Payment />} />
        </Route>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/shipping" element={<Shipping />} />
        </Route>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/placeorder" element={<PlaceOrder />} />
        </Route>
        <Route path="/" element={<ProtectedRoute />}>
          <Route exact path="/orders/:id" element={<Order />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
