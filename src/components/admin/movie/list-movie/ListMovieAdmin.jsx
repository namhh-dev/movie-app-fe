import React, { useEffect, useState } from 'react';
import { getAllMovie, getMovieByNameOrSlug, filterMovie } from '../../../../services/movieService';
import Loading from '../../../loading/Loading';
import MovieCardList from './MovieCardList';
import Pagination from '../../../pagination/Pagination';
import useDebounce from '../../../../hooks/useDebounce';
import Filter from '../../../fillter/Filter';
import { IconSearch } from '../../../icon/Icon';
import { useStore } from '../../../../hooks/useStore';

export default function ListMovieAdmin() {
  const [movies, setMovies] = useState([]); // state movies data
  const [query, setQuery] = useState("");   // state query input
  const { categories, countries, years, types } = useStore();

  const [currentPage, setCurrentPage] = useState(1);  // state current page
  const [totalPages, setTotalPages] = useState(1);    // state total page
  const [totalMovies, setTotalMovies] = useState(0);  // state total result response

  // state -> handle loading status and search
  const [isLoading, setIsLoading] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isFilter, setIsFilter] = useState(false);

  // Initial state for filters
  const [filters, setFilters] = useState({
    category: null,
    country: null,
    year: null,
    type: null,
    actor: '',
    director: '',
  });

  // Debounced values for actor, director, query to prevent multiple calls
  const actorDebouncedValue = useDebounce(filters.actor, 500);
  const directorDebouncedValue = useDebounce(filters.director, 500);
  const debouncedValue = useDebounce(query, 500);

  // Function to update filter state for select inputs
  const updateState = (key, value) => {
    setIsFilter(true); // Set filter state to true
    setFilters(prev => ({ ...prev, [key]: value })); // Update filters
  };

  // General function to fetch movies
  const fetchMovies = async (page, fetchFunction, params = {}) => {
    setIsLoading(true); // Set loading status to true
    try {
      // Fetch movies using the provided function
      const data = await fetchFunction(params, page);

      // Update state with fetched data
      setMovies(data.movies);           // Set fetched movies to state
      setTotalPages(data.totalPages);   // Update total pages
      setTotalMovies(data.totalMovies); // Update total movies count
    } catch (error) {
      console.error(error); // Log error if the API call fails
    } finally {
      setIsLoading(false);  // Set loading status to false once complete
    }
  };

  // Function to fetch all movies
  const fetchAllMovies = (page) => {
    setIsSearch(false); // Reset search state
    fetchMovies(page, getAllMovie); // Call the general fetch function
  };

  // Function to handle movie search based on query
  const searchMovies = (page) => {
    setIsSearch(true); // Set search state
    setIsFilter(false);
    fetchMovies(page, getMovieByNameOrSlug, { query: debouncedValue }); // Call the general fetch function
  };

  // Function to handle movie search based on filters
  const filterMovies = (page) => {
    setIsSearch(false);
    fetchMovies(page, filterMovie, {
      year: filters.year, 
      type: filters.type, 
      category: filters.category, 
      country: filters.country,
      actor: actorDebouncedValue, 
      director: directorDebouncedValue,
    }); // Call the general fetch function
  };


  // Handle page changes for both search and fetch
  const onPageChange = (page) => {
    if(page !== currentPage){   // Check if the new page is different from the current page
      setCurrentPage(page);     // Update current page
      if (isSearch) {
        searchMovies(page);           // Perform search if in search mode
      } else if (isFilter) {
        filterMovies(page);           // Perform filter if in filter mode
      } else {
        fetchAllMovies(page);    // Fetch all movies otherwise
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
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

  // useEffect to fetch movies when the query or debounced value changes
  useEffect(() => {
    if(!query && !isSearch){  // If no query and not in search mode
      fetchAllMovies(currentPage);  // Fetch all movies
    } else if (!query && isSearch){  // If search mode is active but no query
      fetchAllMovies(1);  // Reset and fetch all movies from page 1
    } else {
      setCurrentPage(1);  // Reset current page to 1
      searchMovies(1);  // Perform search from page 1
    }
  }, [debouncedValue]);  // Run when debouncedValue changes
  

  // Effect to filter data when filters change
  useEffect(() => {
    if (isFilter) {
      setCurrentPage(1);
      filterMovies(1); // Call filterData if filters are applied
    }
  }, [filters.year, filters.type, filters.category, filters.country, actorDebouncedValue, directorDebouncedValue]);

  // Tìm công việc của người dùng dựa vào jobId
  const resultFilter = {
    cat: categories.find(cat => cat.cat_slug === filters.category)?categories.find(cat => cat.cat_slug === filters.category).cat_name:categories.find(cat => cat.cat_slug === filters.category),
    ctr: countries.find(ctr => ctr.ctr_slug === filters.country)?countries.find(ctr => ctr.ctr_slug === filters.country).ctr_name:countries.find(ctr => ctr.ctr_slug === filters.country),
    year: years.find(year => year.year_name == filters.year)?years.find(year => year.year_name == filters.year).year_name:years.find(year => year.year_name == filters.year),
    type: types.find(type => type.type_slug === filters.type)?types.find(type => type.type_slug === filters.type).type_name:types.find(type => type.type_slug === filters.type),
    act: filters.actor,
    dir: filters.director
  }

  const validEntries = Object.entries(resultFilter).filter(
    ([key, value]) => value !== null && value !== undefined && value !== ''
  );

  return (
    <div className="h-full min-h-[567px]">
      {/* Search input */}
      <div className="relative w-full">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400"> <IconSearch /> </span>
        
        <input type="text"
          className="bg-gray-700 placeholder-slate-300 text-white text-sm w-full rounded-full block p-2 pl-10" // Adjust padding-left to make space for the icon
          placeholder="Tìm kiếm phim..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <Filter filters={filters} updateState={updateState} setIsFilter={setIsFilter} />

      {isLoading || !movies
      ?
        // Render loading screen if data is being fetched
        <div className="flex justify-center items-center h-screen text-white">
          <Loading />
        </div>
      :
        <>
          <p className='text-white mt-3'><strong>{totalMovies}</strong> Kết quả 
            <span>{validEntries.length>0
                ?
                  ` lọc cho: ${Object.entries(resultFilter)
                  .filter(([key, value]) => value !== null && value !== undefined && value !== '')
                  .map(([key, value]) => value)
                  .join(', ')}`
                :isSearch
                ? ` tìm kiếm: ${debouncedValue}`
                :''
              }
            </span>
          </p>
          
          {/* Movies list */}
          {movies.map((movie) => (
            <MovieCardList key={movie.mov_id} movie={movie} />
          ))}
        </>
      }

      {/* pagination */}
      {(!isLoading&&totalMovies!==0)&&<Pagination currentPage={currentPage} totalDatas={totalMovies} totalPages={totalPages} onPageChange={onPageChange} handlePagination={handlePagination}/>}
    </div>
  )
}