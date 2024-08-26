import React from "react";
import Product from "./Product";
// import { useProductContext } from "../context/productContext";
import { useFilterContext } from "../context/filterContext";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  //   const { products } = useProductContext();
  const { filterProducts, gridView } = useFilterContext();

  if (gridView) return <GridView products={filterProducts} />;

  if (!gridView) return <ListView products={filterProducts} />;

  return (
    <>
      {filterProducts.map((ele) => {
        return <Product key={ele.id} {...ele}></Product>;
      })}
    </>
  );
};

export default ProductList;
