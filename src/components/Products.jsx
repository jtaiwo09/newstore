import React from "react";
import Product from "./Product";
import { useProductsQuery } from "../apps/services/product";
import Loader from "./reuseables/Loader";
import Alert from "./reuseables/Alert";

const Products = () => {
  const { data, isLoading, isError, error } = useProductsQuery();

  return (
    <section className="container" id="product">
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Alert type="error" show={isError}>
          {error.data.message}
        </Alert>
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
