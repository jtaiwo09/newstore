import React from "react";
// import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import Products from "../components/Products";

const Home = () => {
  return (
    <div className="relative">
      {/* <Banner /> */}
      <Navbar />
      <Products />
    </div>
  );
};

export default Home;
