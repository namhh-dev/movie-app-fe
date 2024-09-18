import React, { useEffect, useState } from "react";
import AdminLayout from "../../AdminLayout";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../../loading/Loading";
import { deleteMovie, getMovieBySlug, updateMovie } from "../../../../services/movieService";
import { Alert, DeleteAlert } from "../../../alert/Alert";
import { fetchDataOptions, setDataMovie } from "../../../../services/dataService";
import EpisodeDetail from "../../episode/EpisodeDetail";
import MovieCardDetail from "./MovieCardDetail";
import FormUpdateMovie from "./FormUpdateMovie";
import { Icon } from "../../../../pages/user/movie/MovieDetail";

export default function MovieDetailAdmin() {
  const { slug } = useParams(); // Get the movie ID from the URL parameters
  const [movie, setMovie] = useState(null); // Check if the movie data is passed via state
  const [oldSlug, setOldSlug] = useState(null);

  const [isLoading, setIsLoading] = useState(!movie);
  const [isUpdated, setIsUpdated] = useState(false);

  const [editMode, setEditMode] = useState(false);

  // state of movie data
  const [state, setState] = useState([]);

  const navigate = useNavigate();
  
  // state options for select inputs (type, year, category, etc.)
  const [optionState, setOptionState] = useState({ yearOptions: [], categoryOptions: [], countryOptions: [],
    actorOptions: [], directorOptions: []
  });

  // function to update option state (for select inputs like type, category, etc.)
  const updateState = (key, value) => setState(prev => ({ ...prev, [key]: value }));

  // function to update option state (for select inputs like type, category, etc.)
  const updateOptionState = (key, value) => setOptionState(prev => ({ ...prev, [key]: value }));

  const fetchMovie = async () => {
    setIsLoading(true);
    try {
      const fetchedMovie = await getMovieBySlug(slug); // Fetch movie by ID from API
      setMovie(fetchedMovie);
    } catch (error) {
      console.error("Error fetching movie data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOptionData = async () => {
    await fetchDataOptions(updateOptionState, setIsLoading);
  };

  // Fetch movie data if not passed via state
  useEffect(() => {
    if (!movie) {
      fetchMovie();
    }
    fetchOptionData();
  }, [slug, movie]);

  useEffect(() => {
    if(isUpdated){
      fetchMovie();
    }
  }, [isUpdated]);
  
  // handle open form update
  const handleEdit = () => {
    setDataMovie(optionState, movie, updateState);  //set date to movie state form input
    setOldSlug(movie.mov_slug);  //set old slug state to check slug in db
    setEditMode(!editMode);
  };

  // handle update movie
  const handleSave = async () => {
    // call API to update movie with current movie state
    setIsUpdated(false);
    const result = await updateMovie({ movie: {...state, id: movie.mov_id, old_slug: oldSlug}});
    // if movie creation is successful ? reset the form : show an error alert
    if (result&&(result.status === 200 || result.status === 201)) {
        setIsUpdated(true);
        setEditMode(false);
        Alert(1500, 'Thông báo', result.data.message, 'success', 'OK');
    } else {
        setIsUpdated(false);
        Alert(2000, 'Thông báo', result.data.message||'Không thể tạo phim', 'error', 'OK');
    }
  };

  // handle delete movie
  const handleDelete = async () => {
    // call API to update movie with current movie state
    const result = await deleteMovie(movie.mov_id);
    // if movie creation is successful ? reset the form : show an error alert
    if (result&&(result.status === 200 || result.status === 201)) {
        Alert(1500, 'Thông báo', result.data.message, 'success', 'OK');
        navigate('/admin/movie');
    } else {
        setIsUpdated(false);
        Alert(2000, 'Thông báo', result.data.message||'Không thể tạo phim', 'error', 'OK');
    }
  }

  if (isLoading) {
    return( 
      <AdminLayout>
          <div className="flex justify-center items-center bg-[rgb(16,20,44)] h-screen text-white sm:p-4 pt-16 sm:ml-52">
            <Loading />
          </div>
    </AdminLayout>
  )}
  
  if (!movie || !state || !optionState) {
    return (
    <AdminLayout>
        <div className="flex flex-col justify-center items-center bg-[rgb(16,20,44)] h-screen text-white sm:p-4 pt-16 sm:ml-52">
          <div className="flex gap-2 mb-4">
            <Icon />
            <Link to="/admin/movie">Trang chủ</Link>
          </div>
          <p>Không tìm thấy movie này</p>
        </div>
    </AdminLayout>
  )}

  return (
    <AdminLayout>
      <div class=" bg-[rgb(16,20,44)] h-full min-h-screen sm:p-4 pt-16 sm:ml-52">
        <Breadcrumbs movie={movie}/>
        <div className="p-6 bg-[#202c3c] text-white rounded-md">
          {/* HEADER */}
          <div className='flex justify-between items-start'>
            <span></span>

            {/* NAME */}
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-2xl font-bold text-[#8b5cf6]">{movie.mov_name.toUpperCase()}</h2>
              <span className="line-clamp-1 font-normal mb-4 text-[#1496d5] text-lg">{movie.ori_name}</span>
            </div>

            {/* BUTTON EDIT & DELETE MOVIE */}
            <div className='flex gap-2'>
              <span onClick={() => handleEdit()} className='cursor-pointer'>
                <svg className="w-6 h-6 t text-white" aria-hidden="true" viewBox="0 0 24 24">
                  <path stroke="currentColor" fill='none' strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                </svg>
              </span>
              <span onClick={() => DeleteAlert(handleDelete)} className='cursor-pointer'>
                <svg className="w-6 h-6  text-white" aria-hidden="true" viewBox="0 0 24 24">
                  <path stroke="currentColor" fill='none' strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L17.94 6M18 18L6.06 6" />
                </svg>
              </span>
            </div>
          </div>

          {editMode ? (
              <FormUpdateMovie state={state} updateState={updateState} handleEdit={handleEdit} handleSave={handleSave} optionState={optionState}/>
            ) : (
              <MovieCardDetail movie={movie}/>
            )}
      </div>

      {/* LIST EPISODE */}
      <EpisodeDetail episodes={movie.Episodes} setIsUpdated={setIsUpdated} />

    </div>
  </AdminLayout>
  );
}

const Breadcrumbs = ({ movie }) => (
  <div className="flex gap-2 items-center text-gray-300 text-sm mb-4">
    <svg className="w-6 h-6 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clipRule="evenodd" />
    </svg>
    <Link to="/admin/movie">Danh sách phim</Link>
    <span>{'>'}</span>
    <span>{movie.mov_slug}</span>
  </div>
);