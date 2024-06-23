import React, { useState } from "react";
import { products } from "../../../utils/products";
import Pagination  from '../Pagination/Pagination';

const ProductTableItem = () => {

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / 10);
  const startIndex = (currentPage - 1) * 10;
  const data = products.slice(startIndex, startIndex + 10)

  return (
    <div className="">
      <table className="table-auto">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 font-bold text-left">
              Name
            </th>
            <th scope="col" className="px-6 py-3 font-bold text-left">
              Brand
            </th>
            <th scope="col" className="px-6 py-3 font-bold text-left">
              Category
            </th>
            <th scope="col" className="px-6 py-3 font-bold text-left">
              Stock
            </th>
            <th scope="col" className="px-6 py-3 font-bold text-left">
              Price
            </th>
            <th scope="col" className="px-6 py-3 font-bold text-left">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                {product.brand}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                {product.category}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                {product.countInStock}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                ${product.price}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                {(product.countInStock >= 1) ? "Active" : "Not available"}
              </td>

            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center">
        <Pagination currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page: number) => setCurrentPage(page)} />
      </div>
    </div>
  );
};

export default ProductTableItem;
