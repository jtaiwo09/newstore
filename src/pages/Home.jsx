import React from "react";
import CarouselSlider from "../components/CarouselSlider";
// import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import Products from "../components/Products";

const Home = () => {
  return (
    <div className="relative">
      {/* <Banner /> */}
      <Navbar />
      <CarouselSlider />
      <Products />
    </div>
  );
};

export default Home;
