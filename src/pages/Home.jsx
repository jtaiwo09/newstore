import React from "react";
import { useParams } from "react-router";
import CarouselSlider from "../components/CarouselSlider";
// import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import Products from "../components/Products";

const Home = () => {
  const keyword = useParams().keyword;
  console.log(keyword);
  return (
    <div className="relative">
      {/* <Banner /> */}
      <Navbar />
      <CarouselSlider />
      <Products keyword={keyword} />
    </div>
  );
};

export default Home;
