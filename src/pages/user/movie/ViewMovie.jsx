import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../../../components/user/movie/Layout";
import { getLatestMovie, getMovieBySlug } from "../../../services/movieService";
import Loading from "../../../components/loading/Loading";
import { IconHome } from "../../../components/icon/Icon";
import { Button } from "@material-tailwind/react";

export default function ViewMovie() {
  const [movie, setMovie] = useState(null);
  const [movieHot, setMovieHot] = useState(null);
  const [listMovie, setListMovie] = useState(null);
  const [episodes, setEpisodes] = useState(null);
  const [currentEp, setCurrentEp] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isShow, setIsShow] = useState(false);

  const { slug, epId } = useParams();
  
  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getMovieBySlug(slug);
        const dataMovieHot = await getLatestMovie(1, 10);
        if(data){
          setMovie(data);
          setEpisodes(data.Episodes);
          setCurrentEp(data.Episodes.find((ep) => ep.ep_id === parseInt(epId)));
        }
        if(dataMovieHot){
          setMovieHot(dataMovieHot.movies);
          setListMovie(dataMovieHot.movies.slice(0,5));
        }
        setIsLoading(false);
      } catch (error) {
          setIsLoading(false);
          console.error(error);
      }
    };
    fetchData();
  }, [slug, epId]);
  
  // Function to handle episode change
  const handleEpisodeChange = (ep) => {
    setCurrentEp(ep); // Set the new episode
  };

  // Function to handle show more new movie
  const handleShow = () => {
    setIsShow(!isShow); 
    setListMovie(movieHot);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen text-white">
          <Loading />
        </div>
      </Layout>
    );
  }

  if (!movie || !currentEp) {
    return (
    <Layout>
        <div className="flex flex-col items-center justify-center h-[580px] text-white text-lg">
          <div className="flex gap-2 mb-4">
            <IconHome />
            <Link to="/">Trang chủ</Link>
          </div>
          <p>Không tìm thấy movie này</p>
        </div>
    </Layout>
  )}


  return (
    <Layout>
      <div className="pb-2 px-6 tablet-sm:px-10">
        {/* Breadcrumb navigation */}
        <Breadcrumbs movie={movie} currentEp={currentEp} />

        {/* Video and Episode list */}
        <div className="h-full bg-[#202c3c] p-2 rounded-xl my-4">
          <div className="grid laptop-xl:flex gap-2">
            {/* view to watch movie */}
            <div className="border w-full h-[150px] mobile-s:h-[250px] tablet-s:h-[400px] laptop-xl:w-[70%] tablet-m:h-[550px] bg-black rounded-lg">
              <iframe
                loading="lazy"
                src={currentEp.ep_link} // Use the current episode embed link
                title={currentEp.ep_name}
                width="100%"
                height="100%"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>

            {/* Show list episode */}
            <div className="w-full laptop-xl:w-[30%] bg-[#23262D] p-2 rounded-lg overflow-auto max-h-[550px]">
              <h3 className="text-white mb-2 text-lg font-semibold">Episodes</h3>
              <ul className="flex flex-wrap gap-2 text-[14px] tablet-m:text-[16px] laptop-xl:grid">
                {episodes.map((ep) => (
                  <li key={ep.ep_id} className={`py-1 px-5 laptop-xl:py-2 laptop-xl:px-4 mb-1 cursor-pointer rounded-lg ${
                      ep.ep_id === currentEp.ep_id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                    }`}
                    onClick={() => handleEpisodeChange(ep)} // Change episode on click
                  >
                    {ep.ep_name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="grid laptop-xl:flex gap-2 h-full bg-[#202c3c] p-2 rounded-xl my-4">
          <div className="w-full bg-[#23262D] p-2 rounded-lg" style={{flex:'0 0 70%'}}>
            <div className="py-[2px] px-4 border-l-4 mb-2">
              <h2 className="font-bold text-white">THÔNG TIN PHIM</h2>
            </div>
            <div className="block tablet-sm:hidden mobile-s:h-[7rem] mobile-xl:h-[10rem] w-full">
              <img className="w-full h-full rounded-md" src={movie.thumb_url} alt="" />
            </div>
            <div className="flex gap-3">
                <div className="hidden tablet-sm:block tablet-s:h-[8rem] tablet-m:h-[12rem] w-[10rem]">
                  <img className="w-full h-full rounded-md" src={movie.poster_url} alt="" />
                </div>
                <div>
                  <h2 className="font-medium text-[16px] tablet-m:text-[18px] text-white">{movie?movie.mov_name:'Đang cập nhật'}</h2>
                  <p className="text-gray-400 text-[13px] tablet-m:text-[16px]">Trạng thái: {movie?movie.lang:'Đang cập nhật'}</p>
                  <p className="text-gray-400 text-[13px] tablet-m:text-[16px]">Quốc gia: {movie&&movie.Countries.length>0?movie.Countries[0].ctr_name:'Đang cập nhật'}</p>
                  <p className="text-gray-400 text-[13px] tablet-m:text-[16px]">Thời gian: {movie?movie.time:'Đang cập nhật'}</p>
                  <p className="text-gray-400 text-[13px] tablet-m:text-[16px]">Năm: {movie&&movie.Year?movie.Year.year_name:'Đang cập nhật'}</p>
                  <p className="text-gray-400 text-[13px] tablet-m:text-[16px]">Thể loại: {movie&&movie.Categories.length>0?movie.Categories.map(cat=>cat.cat_name).join(" - "):'Đang cập nhật'}</p>
                  <p className="text-gray-400 text-[13px] tablet-m:text-[16px]">Diễn viên: {movie&&movie.Actors.length>0?movie.Actors.map(act=>act.act_name).join(" - "):'Đang cập nhật'}</p>
                </div>
            </div>
            <div className="mt-2">
              <label className="text-white font-medium text-[16px] tablet-m:text-[18px]">Nội dung phim</label>
              <p dangerouslySetInnerHTML={{ __html: movie.content }} className="text-white text-[13px] tablet-m:text-[16px] break-words whitespace-normal" />
            </div>
          </div>
          <div className="w-full bg-[#23262D] p-2 rounded-lg" style={{flex:'0 0 29%'}}>
              <div className="py-[2px] px-4 border-l-4 mb-2">
                <h2 className="font-bold text-white">PHIM MỚI NHẤT</h2>
              </div>
              <div className="grid gap-1">
                {listMovie.map(mov => {
                  return(
                  <ListMovieHot 
                    posterUrl={mov&&mov.poster_url} 
                    name={mov&&mov.mov_name}
                    slug={mov&&mov.mov_slug} 
                    year={mov&&mov.Year?mov.Year.year_name:'Đang cập nhật'} 
                    time={mov&&mov.time} 
                  />)
                })}
                {!isShow&&
                  <div className="flex justify-center">
                    <Button onClick={handleShow} className="line-clamp-1 py-2 px-4 bg-green-800 text-white rounded-md">
                      Xem thêm
                    </Button>
                </div>
                }
              </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const Breadcrumbs = ({ movie, currentEp }) => (
  <div className="flex gap-2 items-center text-gray-300 text-sm mb-4">
    <IconHome />
    <Link className="hover:text-white line-clamp-1 " to="/">Trang chủ</Link>
    {(movie&&currentEp)&&
      <>
        <span className=" tablet-m:block hidden">{'>'}</span>
        <Link className="hover:text-white line-clamp-1 tablet-m:block hidden" to={`/movie/type/${movie.Type.type_slug}`}>{movie.Type.type_name}</Link>
        <span className=" tablet-m:block hidden">{'>'}</span>
        <Link className="hover:text-white line-clamp-1 tablet-m:block hidden" to={`/movie/country/${movie.Countries[0].ctr_slug}`}>{movie.Countries[0].ctr_name}</Link>
        <span>{'>'}</span>
        <Link to={`/movie/detail/${movie.mov_slug}`}>{movie.mov_name}</Link>
        <span>{'>'}</span>
        <span>{currentEp.ep_name}</span>
      </>
    }
  </div>
);

const ListMovieHot = ({ posterUrl, slug, name, year, time }) => {
  return(
    <Link to={`/movie/detail/${slug}`} className="flex gap-2 h-[90px] cursor-pointer p-1 rounded-md bg-[#3d4046]">
      <img className="w-auto h-full rounded-md" src={posterUrl} alt="" />
      <div className="flex flex-col justify-evenly">
        <h3 className="text-white text-[15px] tablet-m:text-[16px] font-medium line-clamp-1">{name}</h3>
        <p className="text-red-600 text-[13px] tablet-m:text-[14px] font-medium line-clamp-1">{year}</p>
        <p className="text-white text-[13px] tablet-m:text-[14px] line-clamp-1">{time}</p>
      </div>
    </Link>
  )
}