import React, { useEffect, useState } from 'react';
import { getLatestMovie } from '../../../../services/movieService';
import Loading from '../../../loading/Loading';
import MovieCardList from './MovieCardList';

export default function ListMovieAdmin() {
  const [movies, setMovies] = useState([]);

  const [listEp, setListEp] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch data from API
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await getLatestMovie();
      
      if(data){
        setMovies(data);
        setListEp(data.map((movie)=>movie.Episodes));
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

  // if loading or data null reuturn loading button
  if (isLoading || !movies || movies.length<0 || !listEp) {
    return (
      <div className="h-full min-h-[700px]">
        <SearchInput />
        <div className="flex justify-center items-center h-screen text-white">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full min-h-[700px]">
      <SearchInput />
      {/* Movies list */}
      {movies.map((movie) => (
          <MovieCardList key={movie.mov_id} movie={movie} />
      ))}
    </div>
  )
}

const SearchInput = () => {
  return(
    <div className='flex justify-between'>
      <div className="rounded-lg">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm"></span>
        </div>
        <input id="search" name="search" type="text" placeholder="Tìm kiếm phim..." className="block w-[20rem] rounded-3xl border-0 py-1.5 px-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
      </div>
    </div>
  )
}