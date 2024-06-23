''
import Link from "next/link"
import { products } from "../../../utils/products";
import { useState } from "react";

interface Props {
    currentPage: number;
    totalPages: number
    onPageChange: (page: number) => void
}

const Pagination = ({currentPage, totalPages, onPageChange}: Props) => {

    const handlePageChange = (page: number) =>{
        if(page > 0 && page <= totalPages) {
            onPageChange(page)
        }
    }
 

  return (
    <div>
           <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-4 py-2 mx-1 border rounded disabled:opacity-50"
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-4 py-2 mx-1 border rounded ${page === currentPage ? 'bg-blue-500 text-white' : ''}`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-4 py-2 mx-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
