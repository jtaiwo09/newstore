import React from "react";
import Product from "./Product";
import { useProductsQuery } from "../apps/services/product";
import Loader from "./reuseables/Loader";

const Products = () => {
  const { data, isLoading, isError } = useProductsQuery();

  return (
    <section className="container" id="product">
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <h1>Error</h1>
      ) : (
        <div className="flex flex-wrap mt-[2%] mb-[6%]">
          {data?.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Products;
