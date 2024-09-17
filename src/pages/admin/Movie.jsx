import React, { useState } from "react";
import AdminSidebar from "../../components/navbar/AdminSidebar";
import CreateMovieApi from "../../components/admin/movie/CreateMovieApi";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import ListMovie from "../../components/admin/movie/ListMovie";

const childComponent = [<ListMovie />, <CreateMovieApi/>];

export default function Movie() {
  const [index, setIndex] = useState(0);

  return (
    <>
      <AdminSidebar />
      <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% w-full h-full">
        <div class="sm:p-4 sm:ml-48">
          <AdminNavbar setIndex={setIndex} />
        </div>
        <div class="sm:p-4 sm:mt-12 pt-16 sm:ml-52">
          <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg backdrop-blur-lg">
            {childComponent[index]}
          </div>
        </div>
      </div>
    </>
  );
}
