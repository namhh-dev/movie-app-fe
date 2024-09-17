import { Reorder } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { getAllMovie } from '../../../services/movieService';
import ListEpisode from '../episode/ListEpisode';
import Loading from '../../loading/Loading';

export default function ListMovie() {
  const [movies, setMovies] = useState([]);

  const [listEp, setListEp] = useState([]);
  const [currentEp, setCurrentEp] = useState([]);

  const [index, setIndex] = useState(0);
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(0);
  
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch data from API
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await getAllMovie();
      
      if(data){
        setMovies(data);
        setListEp(data.map((movie)=>movie.Episodes));
        setCurrentEp(data[0].Episodes);
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

  const handleMovieClick = (index, movId) => {
    setIndex(index);
    setCurrentEp(listEp[index]);
    setSelectedMovieIndex(index);
  }

  const handleUpdateMovie = () => {
    console.log("hello");
  }
  const handleDeleteMovie = () => {
    console.log("hello");
  }

  if (isLoading || !movies || movies.length<0 || !listEp || !currentEp) {
    return (
        <div className="flex justify-center items-center h-screen text-white">
          <Loading />
        </div>
    );
  }

  return (
    <div className="grid gap-2 my-6 sm:grid-cols-1 lg:grid-cols-2 lg:h-[1000px]">
        {/* Left side: Movie form inputs */}
        <div className='border-[2px] h-[1000px] px-1 rounded-md overflow-scroll scrollbar-hidden'>
          <h1 className='text-2xl my-4 font-bold text-center'>MOVIE</h1>
          {movies.map((movie, index) => (
              <MovieCard key={movie.mov_id} movie={movie} 
              onClick={()=>{handleMovieClick(index)}} 
              handleDeleteMovie={handleDeleteMovie} 
              handleUpdateMovie={handleUpdateMovie}
              isActive={selectedMovieIndex === index}
              />
          ))}
        </div>
          {movies.length>0&&<ListEpisode listEp={currentEp} setListEp={setCurrentEp} title={movies[index].mov_name}/>}
    </div>
  )
}

const MovieCard = ({ movie, onClick, isActive }) => {
  const title = [
    {title: "Tình trạng", value: movie.episode_current},
    {title: "Số tập", value: movie.episode_total},
    {title: "Thời lượng", value: movie.time},
    {title: "Năm phát hành", value: movie.Year.year_name},
    {title: "Chất lượng", value: movie.quality},
    {title: "Ngôn ngữ", value: movie.lang},
    {title: "Đạo diễn", value: movie.Directors.length>0?movie.Directors.map((director)=>director.dir_name).join(", "):"Đang cập nhật"},
    {title: "Diễn viên", value: movie.Actors.length>0&&movie.Actors.map((actor)=>actor.act_name).join(", ")},
    {title: "Thể loại", value: movie.Type.type_name},
    {title: "Quốc gia", value: movie.Countries[0].ctr_name}];

  return (
    <div className={`border p-2 my-4 rounded-md bg-opacity-30 backdrop-blur ${isActive ? 'bg-gray-800' : 'bg-gray-300'}`} onClick={onClick}>
      <div className="flex justify-center items-center">
        <p className='line-clamp-1 font-bold text-md'>{movie.mov_name.toUpperCase()}<span className='line-clamp-1 font-normal'>{movie.ori_name}</span></p>
      </div>
      <div className='flex mb-2'>
        <div className="flex justify-center items-end" style={{ flex: '0 0 23%' }}>
          <ImageUpload url={movie.poster_url}/>
        </div>
        <div className="flex flex-col pr-2" style={{ flex: '0 0 77%' }}>
          <hr />
          {title.map((item) => {
            return <Content title={item.title} value={item.value} />
          })}
        </div>
      </div>
    </div>
  ) 
}

const Content = ({ title, value }) => {
  return(
    <>
      <div className="flex gap-5 py-[0.5px]">
        <div className='w-[160px]'>
          <p className='line-clamp-1 font-medium'>{title}</p>
        </div>
        <div className='w-full flex-wrap'>
          <span className='line-clamp-1 font-normal'>{value}</span>
        </div>
      </div>
      <hr />
    </>
  )
}

// ImageUpload Component to handle poster and thumbnail
const ImageUpload = ({ url }) => (
  <div className={`flex gap-4 items-center h-[250px] mr-2 mb-1`}>
    <div className="flex-1 h-[250px] p-1 rounded-md flex items-center justify-center object-cover" style={{ flex: '0 0 23%' }}> 
      <ImagePreview url={url} alt="Poster" />
    </div>
  </div>
);

// ImagePreview Component
const ImagePreview = ({ url, alt }) => (
  <div className="w-[130px]">
      <img src={url} alt={alt} className="max-w-full h-[260px] border rounded shadow object-cover" onError={(e) => e.target.style.display = 'none'} />
  </div>
);