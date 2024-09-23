import React, { useEffect, useState } from 'react';
import { getLatestMovie } from '../../../services/movieService';
import Loading from '../../loading/Loading';
import Pagination from '../../pagination/Pagination';
import TableMovie from './TableMovie';

export default function ListMovieUser() {
  const [movies, setMovies] = useState([]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalMovies, setTotalMovies] = useState(0);
  
  // state -> handle loading status and search
  const [isLoading, setIsLoading] = useState(false);
  
  // Fetch data from API
  const fetchLatestMovie = async () => {
    setIsLoading(true);
    try {
      const data = await getLatestMovie(currentPage);
      
      setMovies(data.movies);
      setTotalPages(data.totalPages);
      setTotalMovies(data.totalMovies);
    } catch (error) {
      console.error(error);
    }finally{
      setIsLoading(false);
    }
  };
  
  // Handle page changes for both search and fetch
  const onPageChange = (page) => {
    if(page !== currentPage){   // Check if the new page is different from the current page
      setCurrentPage(page);     // Update current page
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

  // useEffect to fetch movies
  useEffect(() => {
    fetchLatestMovie(currentPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

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
    isLoading || !movies 
    ?
      <div className="flex justify-center items-center h-screen text-white">
          <Loading />
      </div>
    :
    <div class="relative overflow-x-auto mt-2 pb-2">
      {/* movie list */}
      <TableMovie colDefs={colDefs} movies={movies}/>

      {/* pagination */}
      {(!isLoading&&totalMovies!==0)&&<Pagination currentPage={currentPage} totalDatas={totalMovies} totalPages={totalPages} onPageChange={onPageChange} handlePagination={handlePagination}/>}
    </div>
  )
}