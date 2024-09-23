import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../../../components/user/movie/Layout";
import { getMovieBySlug } from "../../../services/movieService";
import Loading from "../../../components/loading/Loading";
import { IconHome } from "../../../components/icon/Icon";

export default function ViewMovie() {
  const [movie, setMovie] = useState(null);
  const [episodes, setEpisodes] = useState(null);
  const [currentEp, setCurrentEp] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const { slug, epId } = useParams();
  
  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getMovieBySlug(slug);
        if(data){
          setMovie(data);
          setEpisodes(data.Episodes);
          setCurrentEp(data.Episodes.find((ep) => ep.ep_id === parseInt(epId)));
        }
        setIsLoading(false);
      } catch (error) {
          setIsLoading(false);
          console.error(error);
      }
    };
    fetchData();
  }, [slug, epId]);

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

  // Function to handle episode change
  const handleEpisodeChange = (ep) => {
    setCurrentEp(ep); // Set the new episode
  };

  return (
    <Layout>
      <div className="pb-2">
        {/* Breadcrumb navigation */}
        <div className="flex gap-2 items-center text-gray-300 text-sm mb-4">
          <svg className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"clipRule="evenodd"/>
          </svg>
          <Link to="/">Trang chủ</Link>
          <span>{'>'}</span>
          <Link to={`/movie/type/${movie.Type.type_slug}`}>{movie.Type.type_name}</Link>
          <span>{'>'}</span>
          <Link to={`/movie/country/${movie.Countries[0].ctr_slug}`}>{movie.Countries[0].ctr_name}</Link>
          <span>{'>'}</span>
          <Link to={`/movie/detail/${movie.mov_slug}`}>{movie.mov_name}</Link>
          <span>{'>'}</span>
          <span>{currentEp.ep_name}</span>
        </div>

        {/* Video and Episode list */}
        <div className="h-full bg-[#202c3c] p-2 rounded-xl my-4">
          <div className="flex gap-2">
            {/* view to watch movie */}
            <div className="border w-[70%] p-2 bg-black rounded-lg">
              <iframe
                src={currentEp.ep_link} // Use the current episode embed link
                title={currentEp.ep_name}
                width="100%"
                height="500px"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>

            {/* Show list episode */}
            <div className="w-[30%] bg-[#23262D] p-2 rounded-lg overflow-auto max-h-[500px]">
              <h3 className="text-white mb-2 text-lg font-semibold">Episodes</h3>
              <ul>
                {episodes.map((ep) => (
                  <li key={ep.ep_id} className={`py-2 px-4 mb-1 cursor-pointer rounded-lg ${
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
      </div>
    </Layout>
  );
}
