import React, { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import CreateMovieApi from "../../components/admin/movie/create-movie/CreateMovieApi";
import ListMovieAdmin from "../../components/admin/movie/list-movie/ListMovieAdmin";

const childComponent = [<ListMovieAdmin />, <CreateMovieApi />];

export default function Movie() {
  const [index, setIndex] = useState(0);

  return (
    <>
      <AdminLayout >
        <div className="bg-[rgb(16,20,44)] w-full h-full">
          <div class="sm:p-4 sm:ml-48">
            <AdminNavbar setIndex={setIndex} />
          </div>
          <div class="sm:p-4 sm:mt-12 pt-16 sm:ml-52">
            <div class="p-2 rounded-lg backdrop-blur-lg">
              {childComponent[index]}
            </div>
          </div>
        </div>
      </AdminLayout >
    </>
  );
}
