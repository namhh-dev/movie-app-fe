import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Pagination({
  currentPage,
  totalDatas,
  totalPages,
  onPageChange,
  handlePagination,
}) {
  // Logic to show only 5 pages at a time
  const getPageRange = () => {
    const range = [];

    // Start by calculating the startPage and endPage
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    // Adjust startPage if we're near the end to always show 5 pages
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    return range;
  };

  const pageRange = getPageRange();

  return (
    <div className="flex tablet-s:items-center tablet-s:justify-between justify-center">
      <p className="hidden tablet-s:block text-sm text-white">
        Trang <span className="font-medium">{currentPage}</span> | Tổng{" "}
        <span className="font-medium">{totalDatas}</span> Kết quả
      </p>
      <nav
        aria-label="Pagination"
        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
      >
        {/* Previous */}
        <button onClick={() => handlePagination("prev")} disabled={currentPage == 1} className="relative inline-flex items-center rounded-l-md p-1 tablet-s:p-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
          <span className="">
            <svg class="w-6 h-6 text-white hover:text-black dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/>
            </svg>
          </span>
        </button>

        {pageRange.map((page) => {
          return (
            <a key={page} href="#" aria-current={page == currentPage ? "page" : undefined}
              className={`relative z-10 inline-flex items-center px-3 py-1 tablet-s:px-4 tablet-s:py-2 text-sm font-semibold 
                ${page == currentPage
                  ? "bg-indigo-600 text-white border focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  : "text-white border hover:bg-gray-200 hover:text-black"
              }`}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(page);
              }}>
              {page}
            </a>
          );
        })}
        {/* Next */}
        <button onClick={() => handlePagination("next")} disabled={currentPage == totalPages} className="relative inline-flex items-center rounded-r-md p-1 tablet-s:p-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
          <span className="">
            <svg class="w-6 h-6 text-white hover:text-black dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
            </svg>
          </span>
        </button>
      </nav>
    </div>
  );
}
