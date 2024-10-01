import React, { useEffect, useState } from 'react';
import ListEpisode from '../../episode/ListEpisode';
import Loading from '../../../loading/Loading';
import { createMovie, handleAutoFillEpisodeData, handleAutoFillMovieData, resMovie } from '../../../../services/movieService';
import { Alert } from '../../../alert/Alert';
import { validateLink } from '../../../../services/validator';
import FormCreateMovie from './FormCreateMovie';
import { Chip } from '@material-tailwind/react';
import { IconAdd, IconDownload } from '../../../icon/Icon';

export default function CreateMovieApi() {
    const [data, setData] = useState("");

    const [isCreating, setIsCreating] = useState(false);
    
    // default state movie data
    const defaultState = {
        name: "", slug: "", originName: "", content: "", type: "series", status: false,
        posterUrl: "", thumbUrl: "", time: "", epCurrent: "", epTotal: "",
        quality: "HD", lang: "Vietsub", year: "2024", category: [], country: [], actor: [], director: []
    };
    
    // state of movie data
    const [state, setState] = useState(defaultState);

    // state of list of episodes
    const [listEp, setListEp] = useState([]);

    // state movie API link input
    const [api, setApi] = useState("");
    const [isCallApi, setIsCallApi] = useState(false);
    const [isDataUpdated, setIsDataUpdated] = useState(false);

    // state options for select inputs (type, year, category, etc.)
    const [optionState, setOptionState] = useState({
        typeOptions: [], yearOptions: [], categoryOptions: [], countryOptions: [],
        actorOptions: [], directorOptions: []
    });

    // function to handle API call for fetching movie data
    const handleCallMovieApi = async () => {
        // if API link is empty -> show warning alert
        if (!api) return Alert(2000, 'Thông báo', "Vui lòng điền link api để lấy dữ liệu", 'warning', 'OK');
        // validate API link format
        if (!validateLink(api)) return Alert(2000, 'Thông báo', "Link api không hợp lệ. Vui lòng thử lại", 'error', 'OK');

        setIsCallApi(true);

        // call API to fetch movie data
        const movieData = await resMovie(api);

        // if movie data is received, update state
        if (movieData) {
            setData(movieData);
            setIsDataUpdated(true);  // flag that data is updated
        }

        setIsCallApi(false);
    };

    // when movie data is updated -> auto-fills data
    useEffect(() => {
        if (isDataUpdated && data) {
            // auto-fill movie-related fields
            handleAutoFillMovieData(data.movie, updateState, optionState);

            // auto-fill episode-related fields
            handleAutoFillEpisodeData(data.episodes, setListEp);
        }
    }, [isDataUpdated, data]);

    // function to update individual fields in movie state
    const updateState = (key, value) => setState(prev => ({ ...prev, [key]: value }));

    // function to update option state (for select inputs like type, category, etc.)
    const updateOptionState = (key, value) => setOptionState(prev => ({ ...prev, [key]: value }));

    // function to handle movie creation
    const handleCreateMovie = async () => {
        setIsCreating(true);
        try {
            // call API to create movie with current movie state and episode list
            const result = await createMovie({ movie: state, episode: listEp });
            // if movie creation is successful ? reset the form : show an error alert
            if (result&&(result.status === 200 || result.status === 201)) {
                setState(defaultState);
                setListEp([]);
                Alert(1500, 'Thông báo', result.data.message, 'success', 'OK');
            } else {
                Alert(2000, 'Thông báo', result.data.message||'Không thể tạo phim!', 'error', 'OK');
            }
        } catch (error) {
            Alert(2000, 'Thông báo', 'Có lỗi xảy ra trong quá trình tạo phim. Vui lòng thử lại!', 'error', 'OK');
        }finally{
            setIsCreating(false);
        }
    };
    

    return (
        <>
            {/* input section to fetch movie data via API */}
            <div className="row-auto h-full">
                <div className="col-8 mb-4">
                    <label htmlFor="api" className="block mb-2 text-md font-bold text-white">FETCH API AUTO</label>
                    <input 
                        onChange={(e) => setApi(e.target.value)} 
                        type="text" id="api" 
                        className="bg-gray-300 border border-gray-200 text-gray-700 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
                        placeholder="https://phimapi.com/phim" required 
                    />
                </div>
                <div className="col-4 mb-4 flex gap-5">
                    <button disabled={isCallApi?true:false} onClick={handleCallMovieApi} className={`${isCallApi?'cursor-not-allowed':'cursor-pointer'}`}>
                        <Chip icon={<IconDownload />} variant='gradient' value="Lấy dữ liệu phim" color={isCallApi?'':'cyan'} className={`text-white hover:bg-gray-800 rounded-lg text-md ${isCallApi?'bg-gray-700':'bg-gray-500'}`}/>
                    </button>
                    {isCallApi && <Loading />} {/* Show loading spinner during API call */}
                </div>
            </div>

            <hr />

            {/* Content section with movie form (left) and episode list (right) */}
            <div className="grid gap-2 my-6 sm:grid-cols-1 lg:grid-cols-2 lg:h-[1000px]">
                {/* Left side: Movie form inputs */}
                <FormCreateMovie state={state} updateState={updateState} optionState={optionState} updateOptionState={updateOptionState} />
                
                {/* Right side: Episode management */}
                <ListEpisode listEp={listEp} setListEp={setListEp} title="EPISODE" />
            </div>

            {/* Button to create a new movie */}
            <div className="col-4 mb-4 flex gap-5">
                <button disabled={isCreating?true:false} onClick={handleCreateMovie} className={`${isCreating?'cursor-not-allowed':'cursor-pointer'}`}>
                    <Chip icon={<IconAdd />} variant='gradient' value="Tạo phim" color={isCreating?'':'green'} className={`text-white hover:bg-gray-800 rounded-lg text-md ${isCreating?'bg-gray-700':'bg-gray-500'}`}/>
                </button>
                {isCreating && <Loading />} {/* Show loading spinner during API call */}
            </div>
        </>
    );
}
