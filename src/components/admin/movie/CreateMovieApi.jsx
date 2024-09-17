import React, { useEffect, useState } from 'react';
import MovieForm from './MovieForm';
import ListEpisode from '../episode/ListEpisode';
import Loading from '../../loading/Loading';
import { createMovie, handleAutoFillEpisodeData, handleAutoFillMovieData, resMovie } from '../../../services/movieService';
import { Alert } from '../../alert/Alert';
import { validateLink } from '../../../services/validator';

export default function CreateMovieApi() {
    const [data, setData] = useState("");
    
    // default state movie data
    const defaultState = {
        name: "", slug: "", originName: "", content: "", type: "", status: false,
        posterUrl: "", thumbUrl: "", time: "", epCurrent: "", epTotal: "",
        quality: "", lang: "", year: [], category: [], country: [], actor: [], director: []
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
        // call API to create movie with current movie state and episode list
        const result = await createMovie({ movie: state, episode: listEp });

        // if movie creation is successful ? reset the form : show an error alert
        if (result&&(result.status === 200 || result.status === 201)) {
            setState(defaultState);
            setListEp([]);
            Alert(1500, 'Thông báo', result.data.message, 'success', 'OK');
        } else {
            Alert(2000, 'Thông báo', result.data.message||'Không thể tạo phim', 'error', 'OK');
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
                    <button onClick={handleCallMovieApi} className="text-white bg-gray-700 hover:bg-gray-800 rounded-lg text-sm px-5 py-2.5">
                        Lấy data
                    </button>
                    {isCallApi && <Loading />} {/* Show loading spinner during API call */}
                </div>
            </div>

            <hr />

            {/* Content section with movie form (left) and episode list (right) */}
            <div className="grid gap-2 my-6 sm:grid-cols-1 lg:grid-cols-2 lg:h-[1000px]">
                {/* Left side: Movie form inputs */}
                <MovieForm state={state} updateState={updateState} optionState={optionState} updateOptionState={updateOptionState} />
                
                {/* Right side: Episode management */}
                <ListEpisode listEp={listEp} setListEp={setListEp} title="EPISODE" />
            </div>

            {/* Button to create a new movie */}
            <button onClick={handleCreateMovie} className="text-white bg-gray-700 hover:bg-gray-800 rounded-lg text-md px-10 py-2.5">
                Tạo phim
            </button>
        </>
    );
}
