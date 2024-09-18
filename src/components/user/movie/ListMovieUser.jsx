import React, { useEffect, useState } from 'react';
import { getLatestMovie } from '../../../services/movieService';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Link } from 'react-router-dom';
import Loading from '../../loading/Loading';
import { ImageUpload } from '../../admin/movie/list-movie/MovieCardList';

export default function ListMovieUser() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from API
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await getLatestMovie();
      if(data){
        setMovies(data);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  // Column Definitions: Defines the columns to be displayed.
  const colDefs = [
    {headerName: "Tên", field: "mov_name"},
    {headerName: "Năm",valueGetter: (params) => params.data.Year.year_name},
    {headerName: "Tình trạng",field: "episode_current"},
    {headerName: "Thể loại",valueGetter: (params) => params.data.Type.type_name},
    {headerName: "Quốc gia",valueGetter: (params) => params.data.Countries.map(country => country.ctr_name).join(', ')},
    {headerName: "Ngày cập nhật",field: "updatedAt"},
  ];

  if (isLoading || !movies) {
    return (
        <div className="flex justify-center items-center h-screen text-white">
            <Loading />
        </div>
    );
  }

  return (
    <div class="relative overflow-x-auto mt-2 pb-2">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden">
        <thead class="text-xs text-white uppercase bg-[#202c3c] dark:bg-gray-700 dark:text-gray-400">
          <tr>{colDefs.map((col) => {
              return (
                <th scope="col" class="px-6 py-3">{col.headerName}</th>
              )
            })}
          </tr>
        </thead>

        <hr />

        <tbody>
          {movies.map((movie) => {
            return (
              <tr key={movie.mov_id} class="bg-[#202c3c] border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="px-6 py-2">
                  <Link to={{pathname: `/movie/${movie.mov_slug}`}} className='flex items-center'>
                    <ImageUpload url={movie.poster_url} width={70} height={110}/>
                    <div className='cursor-pointer'>
                      <p className='text-[16px] text-[#8b5cf6] font-bold hover:text-blue-700'>{movie.mov_name}</p>
                      <p className='text-white'>{movie.ori_name}</p>
                    </div>
                  </Link>
                </td>
                <td class="px-6 py-2 text-white">{movie.Year.year_name}</td>
                <td class="px-6 py-2">
                  <span className='text-green-400 bg-[#202c3c] rounded-full px-3 py-1'>
                    {movie.episode_current}
                  </span>
                </td>
                <td class="px-6 py-2 text-white">{movie.Type.type_name}</td>
                <td class="px-6 py-2 text-white">{movie.Countries[0].ctr_name}</td>
                <td class="px-6 py-2 text-red-600">{movie.updatedAt}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
  </div>
  )
}