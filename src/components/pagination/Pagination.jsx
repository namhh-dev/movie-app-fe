import React from 'react'

export default function Pagination({ currentPage, totalDatas, totalPages, onPageChange, handlePagination }) {
    return(
        <div className="flex flex-1 sm:items-center justify-between">
            <p className="text-sm text-white">
              Trang <span className="font-medium">{currentPage}</span> | Tổng <span className="font-medium">{totalDatas}</span> Kết quả
            </p>
            <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
              {/* Previous */}
              <button onClick={()=>{handlePagination("prev")}} className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span className="">
                  <svg class="w-6 h-6 text-white hover:text-black dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/>
                  </svg>
                </span>
              </button>
    
              {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  return (
                    <a key={page} href="#" aria-current={page === currentPage ? 'page' : undefined}
                      className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold ${
                        page === currentPage
                          ? 'bg-indigo-600 text-white border focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                          : 'text-white border hover:bg-gray-200 hover:text-black'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        onPageChange(page);
                      }}
                    >
                      {page}
                    </a>
                  );
                })}
              {/* Next */}
              <button onClick={()=>{handlePagination("next")}} className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span className="">
                  <svg class="w-6 h-6 text-white hover:text-black dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
                  </svg>
                </span>
              </button>
            </nav>
      </div>
    )
}
