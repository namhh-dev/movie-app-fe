import React, { useEffect, useState } from "react";
import AdminLayout from "../../AdminLayout";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../../../loading/Loading";
import { deleteMovie, getMovieBySlug, updateMovie } from "../../../../services/movieService";
import { Alert, DeleteAlert } from "../../../alert/Alert";
import { setDataMovie } from "../../../../services/dataService";
import EpisodeDetail from "../../episode/EpisodeDetail";
import FormUpdateMovie from "./FormUpdateMovie";
import { useStore } from "../../../../hooks/useStore";
import { Button } from "@material-tailwind/react";
import { IconBack, IconHome, IconTrash } from "../../../icon/Icon";

export default function MovieDetailAdmin() {
  const { slug } = useParams(); // Get the movie ID from the URL parameters
  const [movie, setMovie] = useState(null); // Check if the movie data is passed via state

  const [isLoading, setIsLoading] = useState(!movie);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const location = useLocation();
  const previousUrl = location.state?.location;

  const navigate = useNavigate();
  
  const {categories, countries, years, types, actors, directors} = useStore();

  // Utility function to format options
  const formatOptions = (data, valueField, labelField, slugField = null) =>
    data.map(item => ({
        ...item,
        // add field value and label to use in <Select /> library
        value: item[valueField], 
        label: item[labelField],
        ...(slugField && { slug: item[slugField] }),
  }));

  // state options for select inputs (type, year, category, etc.)
  const optionState= { 
    yearOptions: formatOptions(years, 'year_id', 'year_name'),
    typeOptions: formatOptions(types, 'type_slug', 'type_name'), 
    categoryOptions: formatOptions(categories, 'cat_id', 'cat_name'), 
    countryOptions: formatOptions(countries, 'ctr_id', 'ctr_name', 'cat_slug'),
    actorOptions: formatOptions(actors, 'act_id', 'act_name'), 
    directorOptions: formatOptions(directors, 'dir_id', 'dir_name')
  };
  
  // state of movie data
  const [state, setState] = useState([]);

  // function to update option state (for select inputs like type, category, etc.)
  const updateState = (key, value) => setState(prev => ({ ...prev, [key]: value }));

  const fetchMovie = async () => {
    setIsLoading(true);
    try {
      const fetchedMovie = await getMovieBySlug(slug); // Fetch movie by ID from API
      setMovie(fetchedMovie);
      setDataMovie(optionState, fetchedMovie, updateState);
    } catch (error) {
      console.error("Error fetching movie data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
      const handleScroll = () => {
      // When scrolled down, the element will appear
      if (window.scrollY > 100) {
          setIsVisible(true);
      } else {
          setIsVisible(false);
      }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);

  useEffect(() => {
    fetchMovie();
  }, []);

  useEffect(() => {
    if(isUpdated){
      fetchMovie();
    }
  }, [isUpdated]);

  // handle update movie
  const handleSave = async () => {
    // call API to update movie with current movie state
    setIsUpdating(true);
    setIsUpdated(false);
    try {
      const result = await updateMovie({ movie: {...state, id: movie.mov_id, old_slug: slug}});
      // if movie creation is successful ? reset the form : show an error alert
      if (result&&(result.status === 200 || result.status === 201)) {
          setIsUpdated(true);
          Alert(1500, 'Thông báo', result.data.message, 'success', 'OK');
      }else{
        Alert(2000, 'Thông báo', result.data.message||'Không thể cập nhật phim', 'error', 'OK');
      }
    } catch (error) {
        Alert(2000, 'Thông báo', 'Không thể cập nhật phim', 'error', 'OK');
    }finally{
      setIsUpdating(false);
    }
  };

  // handle delete movie
  const handleDelete = async () => {
    // call API to update movie with current movie state
    const result = await deleteMovie(movie.mov_id);
    // if movie creation is successful ? reset the form : show an error alert
    if (result&&(result.status === 200 || result.status === 201)) {
        Alert(1500, 'Thông báo', result.data.message, 'success', 'OK');
        navigate(previousUrl?previousUrl:'/admin/movie');
    } else {
        setIsUpdated(false);
        Alert(2000, 'Thông báo', result.data.message||'Không thể xóa phim', 'error', 'OK');
    }
  }

  if (isLoading) {
    return( 
      <AdminLayout isVisible={isVisible} index={0}>
          <div className="flex justify-center items-center bg-[rgb(16,20,44)] h-screen text-white sm:p-4">
            <Loading />
          </div>
    </AdminLayout>
  )}
  
  if (!movie || !state || !optionState) {
    return (
    <AdminLayout isVisible={isVisible} index={0}>
        <div className="flex flex-col justify-center items-center bg-[rgb(16,20,44)] h-screen text-white sm:p-4">
          <div className="flex gap-2 mb-4">
            <IconHome />
            <Link to="/admin/movie">Trang chủ</Link>
          </div>
          <p>Không tìm thấy movie này</p>
        </div>
    </AdminLayout>
  )}

  return (
    <AdminLayout isVisible={isVisible} index={0}>
      <div class=" bg-[rgb(16,20,44)] h-full min-h-screen py-4 px-10 mobile-xl:px-16">
        <Breadcrumbs movie={movie}/>
        <div className="p-6 bg-[#202c3c] text-white rounded-md">
          {/* HEADER */}
          <div className='flex justify-between items-start mb-3'>
            <Button onClick={()=>navigate(previousUrl?previousUrl:'/admin/movie')} variant="gradient" color='purple' className="rounded-full flex items-center gap-1 font-md text-[8px] mobile-xl:text-[12px] px-2 mobile-xl:px-3 py-1">
              <IconBack />Quay lại
            </Button>

            {/* BUTTON EDIT & DELETE MOVIE */}
            <Button onClick={() => DeleteAlert(handleDelete)} variant="gradient" color='red' className="rounded-full flex items-center gap-1 font-md text-[8px] mobile-xl:text-[12px] px-2 mobile-xl:px-3 py-1">
              <IconTrash />Xóa
            </Button>
          </div>

          {/* NAME */}
          <div className="flex flex-col justify-center items-center">
            <h2 className="font-bold text-[#8b5cf6] text-[16px] mobile-xl:text-xl text-center">{movie.mov_name.toUpperCase()}</h2>
            <span className="line-clamp-1 font-normal mb-4 text-[#1496d5] text-[12px] mobile-xl:text-lg">{movie.ori_name}</span>
          </div>

          <FormUpdateMovie state={state} updateState={updateState} handleSave={handleSave} optionState={optionState} isUpdating={isUpdating}/>
      </div>
      
      {/* LIST EPISODE */}
      <EpisodeDetail movId={movie.mov_id}/>

    </div>
  </AdminLayout>
  );
}

const Breadcrumbs = ({ movie }) => (
  <div className="flex gap-2 items-center text-gray-300 text-sm mb-4">
    <Link to="/admin/movie"><IconHome /></Link>
    <Link className="hidden mobile-xl:block" to="/admin/movie">Danh sách phim</Link>
    <span>{movie?'>':''}</span>
    <span>{movie?movie.mov_slug:''}</span>
  </div>
);