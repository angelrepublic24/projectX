"use client";
import ButtonItem from "@/app/components/ButtonItem/ButtonItem";
import Pagination from "@/app/components/Pagination/Pagination";
import ProductTableItem from "@/app/components/ProductTableItem/ProductTableItem";
import { useState } from "react";

const ProductTable = () => {
  const [value, setValue] = useState<string>("");

  return (
    <div className="product flex flex-col">
      <div className=" bg-gray-900 py-3">
        <h3 className="flex justify-center text-white text-lg">Products</h3>
      </div>
        <div className="py-3 justify-center flex flex-row">
          <ButtonItem value={"Edit"} />
          <ButtonItem value={"New"} />
          <ButtonItem value={"View"} />
          <ButtonItem value={"Remove"} />
        </div>
        <div className="flex justify-center ml-12 px-10">
          <ProductTableItem />
        </div>
        {/* <div className="flex justify-center ml-12 px-10">
          < Pagination />
        </div> */}
    </div>
  );
};

export default ProductTable;
