import React, { useEffect, useState } from 'react';
import { getAllMovie, filterMovie } from '../../../../services/movieService';
import Loading from '../../../loading/Loading';
import MovieCardList from './MovieCardList';
import Pagination from '../../../pagination/Pagination';
import Filter from '../../../fillter/Filter';
import { IconReFresh, IconSearch } from '../../../icon/Icon';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import DropDownFilter from '../../../common/DropDownFilter';
import { useStore } from '../../../../hooks/useStore';

export default function ListMovieAdmin() {
  const navigate = useNavigate();
  const location = useLocation();
  const context = useStore();

  const [filterParams] = useSearchParams();
  const keys = ['query', 'year', 'type', 'cat', 'ctr', 'lang', 'qua', 'act', 'dir'];
  
  const { query, year, type, cat, ctr, lang, qua, act, dir } = keys.reduce((acc, key) => {
    acc[key] = filterParams.get(key);
    return acc;
  }, {});
  
  const { categories, countries, years, types, actors, directors, isLoading } = context;

  const [movies, setMovies] = useState([]); // state movies data
  

  const params = new URLSearchParams(location.search);
  const currentPage = parseInt(params.get("page")) || 1;

  const [totalPages, setTotalPages] = useState(1);    // state total page
  const [totalMovies, setTotalMovies] = useState(0);  // state total result response

  // state -> handle loading status and search
  const [isLoadings, setIsLoadings] = useState(false);
  const [isFilter, setIsFilter] = useState(false);

  // Initial state for filters
  const [filters, setFilters] = useState({
    year: year,
    type: type,
    category: cat,
    country: ctr,
    query: query,
    lang: lang,
    quality: qua,
    actor: act,
    director: dir
  });

  const updateSortParameter = (sortValue) => {
    const url = new URL(window.location);
    url.searchParams.set('sort', sortValue); // Cập nhật hoặc thêm giá trị sort
    return url.pathname + url.search; // Trả về URL mới
  };

  const sortOptions = [
    { name: 'Mới nhất', href: updateSortParameter(1), value: 1 },
    { name: 'Cũ nhất', href: updateSortParameter(2), value: 2 },
    { name: 'A-Z', href: updateSortParameter(3), value: 3 },
  ];

  const sort = params.get("sort") || 1;

  // Function to update filter state for select inputs
  const updateState = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value })); // Update filters
  };

  // General function to fetch movies
  const fetchMovies = async (page, fetchFunction, params = {}) => {
    setIsLoadings(true); // Set loading status to true
    try {
      // Fetch movies using the provided function
      const data = await fetchFunction(params, page);
      if(data.movies.length>0){
        if(page>data.totalPages){
          const params = new URLSearchParams(location.search);
          params.set("page", data.totalPages); // update page value
          navigate(`${location.pathname}?${params.toString()}`);
        }else{
          // Update state with fetched data
          setMovies(data.movies);           // Set fetched movies to state
          setTotalPages(data.totalPages);   // Update total pages
          setTotalMovies(data.totalMovies); // Update total movies count
        }
      }else{
        // Update state with fetched data
        setMovies(data.movies);           // Set fetched movies to state
        setTotalPages(data.totalPages);   // Update total pages
        setTotalMovies(data.totalMovies); // Update total movies count
      }
    } catch (error) {
      console.error(error); // Log error if the API call fails
    } finally {
      setIsLoadings(false);  // Set loading status to false once complete
    }
  };

  // Function to fetch all movies
  const fetchAllMovies = (page) => {
    fetchMovies(page, getAllMovie, {sort: sort}); // Call the general fetch function
  };

  // Function to handle movie search based on filters
  const filterMovies = (page) => {
    setIsFilter(true);
    fetchMovies(page, filterMovie, {
      sort: sort,
      year: year,
      type: type,
      category: cat,
      country: ctr,
      query: query,
      lang: lang,
      quality: qua,
      actor: act,
      director: dir,
    }); // Call the general fetch function
  };

  // Handle page changes for both search and fetch
  const onPageChange = (page) => {
    if(page !== currentPage){   // Check if the new page is different from the current page
      const params = new URLSearchParams(location.search);
      params.set("page", page); // Cập nhật giá trị page
      navigate(`${location.pathname}?${params.toString()}`);
      if (isFilter) {
        filterMovies(page);       // Perform search if in search mode
      } else {
        fetchAllMovies(page);     // Fetch all movies otherwise
      }
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

  // Function to clear all filters
  const clearFilter = () => {
    updateState('category', null);
    updateState('country', null);
    updateState('year', null);
    updateState('type', null);
    updateState('query', '');
    updateState('actor', '');
    updateState('director', '');
    updateState('lang', '');
    updateState('quality', '');
    navigate(`${location.pathname}${currentPage!=1&&!isFilter?`?page=${currentPage}`:''}`);
    setIsFilter(false);
  }

  useEffect(() => {
    // General condition to check filters or queries
    const hasFilters = query || year || type || cat || ctr || lang || qua || act || dir;
  
    // If no filter and no search mode, get all movies
    if (!hasFilters && !isFilter) {
      fetchAllMovies(currentPage);  // Get all movies from current page
    }
    // If no query and in search mode, reset and get all movies from page 1
    else if (!hasFilters && isFilter) {
      fetchAllMovies(1);  // Reset page and get all movies from page 1
    }
    // has filter or query and in search mode, do filter
    else if (hasFilters || isFilter) {
      filterMovies(currentPage);  // Filter movies by current page
    }
  }, [query, year, type, cat, ctr, lang, qua, act, dir, isFilter, sort, currentPage]);
  

  const buildQueryString = () => {
    const params = new URLSearchParams();
    if (filters.query) params.set('query', filters.query);
    if (filters.year) params.set('year', filters.year);
    if (filters.type) params.set('type', filters.type);
    if (filters.category) params.set('cat', filters.category);
    if (filters.country) params.set('ctr', filters.country);
    if (filters.lang) params.set('lang', filters.lang);
    if (filters.quality) params.set('qua', filters.quality);
    if (filters.actor) params.set('act', filters.actor);
    if (filters.director) params.set('dir', filters.director);
    return params.toString();
  };
  
  const handleSearch = () => {
    const queryString = buildQueryString();
    setIsFilter(true);
    if (queryString) {
      navigate(`${location.pathname}?${queryString}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const validResult = [
    query,
    lang,
    qua,
    year,
    types.filter(t => t.type_slug === type).map(t => t.type_name).join(", "),
    categories.filter(cate => cate.cat_slug === cat).map(cate => cate.cat_name).join(", "),
    countries.filter(coun => coun.ctr_slug === ctr).map(coun => coun.ctr_name).join(", "),
    act,
    dir
  ];
  
  const validValues = validResult.filter(value => value && value.length > 0).join(', ');
  
  return (
      <div className="h-full min-h-[583px]">
        <div className='bg-[#202c3c] p-4 rounded-lg'>
          {/* Search input */}
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400"> <IconSearch /> </span>   
            <input type="text" name="query" className="bg-gray-700 placeholder-slate-300 text-white text-sm w-full rounded-full block py-1 px-2 pl-10" // Adjust padding-left to make space for the icon
              placeholder="Tìm kiếm phim..."
              value={filters.query}
              onChange={(e) => updateState('query', e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <Filter filters={filters} updateState={updateState} setIsFilter={setIsFilter} handleKeyDown={handleKeyDown}/>

          <div className='flex laptop-xl:justify-end gap-4 mt-2'>
            <Button onClick={clearFilter} variant="gradient" color='purple' className="rounded-full flex items-center gap-1 font-md text-[10px] laptop-m:text-[12px] px-3 py-1">
              <IconReFresh />Bỏ lọc
            </Button>

            <Button onClick={()=>{handleSearch()}} variant="gradient" color='purple' className="rounded-full flex items-center gap-1 font-md text-[10px] laptop-m:text-[12px] px-3 py-1">
              <IconSearch />Tìm
            </Button>
          </div>
        </div>

        {isLoadings || !movies
        ?
          // Render loading screen if data is being fetched
          <div className="flex justify-center items-center h-screen text-white">
            <Loading />
          </div>
        :
          <>
            <div className='flex gap-3 items-center mt-4'>
              <DropDownFilter curent={sort} sortOptions={sortOptions} />
              <p className='text-white text-[12px] mobile-xl:text-[15px]'><strong>{totalMovies}</strong> Kết quả 
              <span>{validValues?` cho: `:''}</span><strong>{validValues?` ${validValues}`:''}</strong></p>
            </div>
            
            {/* Movies list */}
            {movies.map((movie) => (
              <MovieCardList key={movie.mov_id} movie={movie} location={location.pathname+location.search} />
            ))}
          </>
        }

        {/* pagination */}
        {(!isLoadings&&totalMovies!==0)&&<Pagination currentPage={currentPage} totalDatas={totalMovies} totalPages={totalPages} onPageChange={onPageChange} handlePagination={handlePagination}/>}
      </div>
  )
}