import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../../../components/user/movie/Layout";
import { getMovieBySlug } from "../../../services/movieService";
import Loading from "../../../components/loading/Loading";
import ToggleSection from "../../../components/user/movie/ToggleSection";
import { IconHome } from "../../../components/icon/Icon";

export default function MovieDetail() {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getMovieBySlug(slug);
        if (data) {
          setMovie(data);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen text-white">
          <Loading />
        </div>
      </Layout>
    );
  }

  if (!movie) {
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

  const dataTable = [
    { title: "Tình trạng", value: movie.episode_current },
    { title: "Số tập", value: movie.episode_total },
    { title: "Thời lượng", value: movie.time },
    { title: "Năm phát hành", value: movie.Year.year_name },
    { title: "Chất lượng", value: movie.quality },
    { title: "Ngôn ngữ", value: movie.lang },
    { title: "Đạo diễn", value: movie.Directors.map(d => d.dir_name).join(", ") || "Đang cập nhật" },
    { title: "Diễn viên", value: movie.Actors.map(a => a.act_name).join(", ") || "Đang cập nhật" },
    { title: "Thể loại", value: movie.Type.type_name },
    { title: "Quốc gia", value: movie.Countries[0].ctr_name }
  ];
  

  return (
    <Layout>
      <div className="pb-2">
        {/* Breadcrumb navigation */}
        <Breadcrumbs movie={movie} />

        <hr />

        {/* Movie details section */}
        <div className="h-full bg-[#202c3c] p-2 rounded-xl my-4 flex gap-2">
          <MoviePoster movie={movie} />
          <MovieInfo movie={movie} dataTable={dataTable} />
        </div>

        {/* Content and Episodes */}
        <div className="h-full bg-[#202c3c] p-2 rounded-xl my-4">
          <ToggleSection title="Nội dung phim">
            <div dangerouslySetInnerHTML={{ __html: movie.content }} className="text-white text-sm break-words whitespace-normal" />
          </ToggleSection>

          <ToggleSection title="Danh sách tập">
            <div className="flex flex-wrap gap-3">
              {movie.Episodes.map((episode) => (
                <Link key={episode.ep_id} to={`/movie/view/${movie.mov_slug}/ep/${episode.ep_id}`} className="py-1 bg-gray-400 text-center rounded-md w-[80px]">
                  {episode.ep_name}
                </Link>
              ))}
            </div>
          </ToggleSection>
        </div>
      </div>
    </Layout>
  );
}

const Breadcrumbs = ({ movie }) => (
  <div className="flex gap-2 items-center text-gray-300 text-sm mb-4">
    <IconHome />
    <Link className="hover:text-white line-clamp-1 " to="/">Trang chủ</Link>
    <span className=" tablet-m:block hidden">{'>'}</span>
    <Link className="hover:text-white line-clamp-1 tablet-m:block hidden" to={`/movie/type/${movie.Type.type_slug}`}>{movie.Type.type_name}</Link>
    <span className=" tablet-m:block hidden">{'>'}</span>
    <Link className="hover:text-white line-clamp-1 tablet-m:block hidden" to={`/movie/country/${movie.Countries[0].ctr_slug}`}>{movie.Countries[0].ctr_name}</Link>
    <span>{'>'}</span>
    <span className="cursor-pointer font-bold line-clamp-1 ">{movie.mov_name} - {movie.ori_name} ({movie.Year.year_name})</span>
  </div>
);

const MoviePoster = ({ movie }) => (
  <div className="relative w-[300px] h-[400px] sm:block hidden">
    <img src={movie.poster_url} alt="poster" className="rounded-md w-full h-full object-cover" />
    <div className="absolute bottom-0 w-full px-2 py-1 bg-transparent backdrop-blur-lg rounded-md">
      <div className="flex justify-center">
        <Link to={`/movie/view/${movie.mov_slug}/ep/${movie.Episodes[0].ep_id}`} className="line-clamp-1 py-1 px-4 bg-red-800 text-white rounded-md">
          Xem phim
        </Link>
      </div>
    </div>
  </div>
);

const MovieInfo = ({ movie, dataTable }) => (
  <div className="w-full p-2 rounded-md bg-opacity-30 backdrop-blur">
    <div className="text-center border-b border-gray-700 mr-2">
      <p className="line-clamp-1 font-bold text-[#8b5cf6] text-xl">{movie.mov_name.toUpperCase()}</p>
      <span className="line-clamp-1 font-normal text-[#1496d5] text-lg">{movie.ori_name}</span>
    </div>
    <div className="flex flex-col gap-1 pr-2">
      {dataTable.map(({ title, value }) => (
        <Introduce key={title} title={title} value={value} />
      ))}
    </div>
  </div>
);

const Introduce = ({ title, value }) => (
  <>
    <div className="flex gap-5 py-[2px] border-b border-gray-700">
      <div className="w-[160px] line-clamp-1 text-[#1496d5] font-medium text-[15px]">{title}</div>
      <div className="w-full line-clamp-2 text-[#909fdd] text-[15px]">{value?value:"Đang cập nhật"}</div>
    </div>
  </>
);