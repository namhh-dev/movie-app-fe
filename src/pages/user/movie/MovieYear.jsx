import React, { useEffect, useState } from "react";
import Layout from "../../../components/user/movie/Layout";
import { Link, useParams } from "react-router-dom";
import { getMovieByYear } from "../../../services/movieService";
import Loading from "../../../components/loading/Loading";
import TableMovie from "../../../components/user/movie/TableMovie";
import Pagination from "../../../components/pagination/Pagination";
import { useStore } from "../../../hooks/useStore";
import { IconHome } from "../../../components/icon/Icon";

export default function MovieYear() {
  const context = useStore();

  const [movies, setMovies] = useState();
  const { year } = useParams();

  const yearName = context.years.filter((y)=>y.year_name==year);
  
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalMovies, setTotalMovies] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const fetchMovie = async(page) => {
    setIsLoading(true);
      try {
          const data = await getMovieByYear(year, page);
          setMovies(data.movies);
          setTotalPages(data.totalPages);
          setTotalMovies(data.totalMovies);
      } catch (error) {
        console.error(error);
      }finally{
          setIsLoading(false);
      }
  }

  useEffect(()=>{
    fetchMovie();
  },[]);
  

  // Handle page changes for both search and fetch
  const onPageChange = (page) => {
    if(page !== currentPage){   // Check if the new page is different from the current page
      setCurrentPage(page);     // Update current page
      fetchMovie(page);
    }
  };

  // Handle pagination navigation (next/previous page)
  const handlePagination = (direction) => {
    let newPage = currentPage;
    if (direction === "next" && currentPage < totalPages) {
      newPage = currentPage + 1;
    } else if (direction === "prev" && currentPage > 1) {
      newPage = currentPage - 1;
    }
    onPageChange(newPage);  // Update to the new page
  };

  // Column Definitions: Defines the columns to be displayed.
  const colDefs = [
    {headerName: "Tên", field: "mov_name"},
    {headerName: "Năm",valueGetter: (params) => params.data.Year.year_name},
    {headerName: "Tình trạng",field: "episode_current"},
    {headerName: "Thể loại",valueGetter: (params) => params.data.Type.type_name},
    {headerName: "Quốc gia",valueGetter: (params) => params.data.Countries.map(country => country.ctr_name).join(', ')},
    {headerName: "Ngày cập nhật",field: "updatedAt"},
  ];
  
  return (
    <Layout>
      {isLoading
      ?
        <div className="flex justify-center items-center h-screen text-white">
          <Loading />
        </div>
      :!movies
      ?
      <div className="flex flex-col justify-center items-center h-full text-white">
          <div className="flex gap-2 mb-4">
            <IconHome />
            <Link to="/">Trang chủ</Link>
          </div>
          <p>Không tìm thấy dữ liệu</p>
      </div>
      :
        <div class="relative overflow-x-auto mt-2 pb-2">
            <Breadcrumbs year={yearName[0]} />
          {/* movie list */}
          <TableMovie colDefs={colDefs} movies={movies}/>

          {/* pagination */}
          {(!isLoading&&totalMovies!==0)&&<Pagination currentPage={currentPage} totalDatas={totalMovies} totalPages={totalPages} onPageChange={onPageChange} handlePagination={handlePagination}/>}
        </div>
      }
    </Layout>
  );
}

const Breadcrumbs = ({ year }) => (
  <div className="flex gap-2 items-center text-gray-300 text-sm mb-4">
    <IconHome />
    <Link to="/">Trang chủ</Link>
    <span>{">"}</span>
    <span>{year.year_name}</span>
  </div>
);
