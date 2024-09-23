import React, { useEffect, useState } from 'react';
import { deleteEpisode, getEpisodeByMovieId, updateEpisode } from '../../../services/episodeService';
import { Alert, DeleteAlert } from '../../alert/Alert';
import InputComponent from '../../input/InputComponent';
import { Chip } from '@material-tailwind/react';
import InfiniteScroll from '../episode/InfiniteScroll';
import Loading from '../../loading/Loading';
import { IconMinimize, IconTrash } from '../../icon/Icon';

export default function EpisodeDetail({ movId }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalEpisodes, setTotalEpisodes] = useState(0);
    const [episodes, setEpisodes] = useState([]);
    
    const [isLoading, setIsLoading] = useState(false);
    const [isEpUpdated, setIsEpUpdated] = useState(false);

    const fetchEpisode = async () => {
        setIsLoading(true);
        try {
            const fetchedEpisode = await getEpisodeByMovieId(movId, currentPage); // Fetch episode by movieID
            const startIndex = (currentPage - 1) * 10;
            const endIndex = startIndex + 10;
            episodes.splice(startIndex, endIndex, ...fetchedEpisode.episodes);
            setTotalEpisodes(fetchedEpisode.totalEpisodes);
        } catch (error) {
            console.error("Error fetching episode data", error);
        } finally {
            setIsEpUpdated(false);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEpisode();
    }, [currentPage, isEpUpdated]);

    return(
        <div className="px-6 py-4 bg-[#202c3c] text-white rounded-md mt-6">
            <div className="flex justify-center py-4">
                <h2 className="font-bold text-2xl">QUẢN LÝ TẬP PHIM</h2>
            </div>
            {!isLoading&&episodes.length>0
            ?
                <InfiniteScroll
                    loader={<p>Đang tải...</p>}
                    fetchMore={() => setCurrentPage((prev) => prev + 1)}
                    hasMore={episodes.length < totalEpisodes}
                    endMessage={<p>Đã tải hết tất cả tập phim</p>}
                >
                    {episodes.map((episode)=>{
                        return (
                            <EpisodeCard key={episode.ep_id} episode={episode} setIsUpdated={setIsEpUpdated} />
                        )
                    })}
                </InfiniteScroll>
            :
                <Loading />
            }
        </div>
    )
}
  
const EpisodeCard = ({ episode, setIsUpdated }) => {
    const [isDisplay, setIsDisplay] = useState(true);

    // default state episode data
    const defaultState = {title: episode.ep_title, name: episode.ep_name, slug: episode.ep_slug, link: episode.ep_link};
    
    // state of episode data
    const [state, setState] = useState(defaultState);

    // function to update option state (for select inputs like type, category, etc.)
    const updateState = (key, value) => setState(prev => ({ ...prev, [key]: value }));

    // handle update episode
    const handleSave = async () => {
        setIsUpdated(false);
        // call API to update episode with current episode state
        const result = await updateEpisode({...state, id: episode.ep_id});
        // if episode creation is successful ? reset the form : show an error alert
        if (result&&(result.status === 200 || result.status === 201)) {
            setIsUpdated(true);
            Alert(1500, 'Thông báo', result.data.message, 'success', 'OK');
        } else {
            setIsUpdated(false);
            Alert(2000, 'Thông báo', result.data.message||'Không thể cập nhật', 'error', 'OK');
        }
    };

    // handle delete episode
    const handleDelete = async () => {
        setIsUpdated(false);
        // call API to update episode with current episode state
        const result = await deleteEpisode(episode.ep_id);
        // if episode creation is successful ? reset the form : show an error alert
        if (result&&(result.status === 200 || result.status === 201)) {
            setIsUpdated(true);
            Alert(1500, 'Thông báo', result.data.message, 'success', 'OK');
        } else {
        setIsUpdated(false);
        Alert(2000, 'Thông báo', result.data.message||'Không thể xóa tập phim này', 'error', 'OK');
        }
    }

    return(
        <div className="bg-gray-600 rounded-md p-4">
            {/* header */}
            <div className='flex justify-between items-center'>
                <div className='flex gap-2'>
                {/* BUTTON EDIT & DELETE EPISODE */}
                    <IconMinimize onClick={() => setIsDisplay(!isDisplay)}/>
                </div>

                <div className="flex flex-col justify-center items-center mb-2">
                    <h2 onClick={() => setIsDisplay(!isDisplay)} className="text-xl font-bold text-[#8b5cf6] cursor-pointer">{episode.ep_name.toUpperCase()}</h2>
                </div>

                <div className='flex gap-2'>
                {/* BUTTON EDIT & DELETE EPISODE */}
                    <Chip onClick={() => DeleteAlert(handleDelete)} variant="gradient" color='red' value='Xóa'
                        icon={<IconTrash />} className="rounded-xl font-md py-2 px-3 cursor-pointer text-[6px] mobile-l:text-[13px]">
                    </Chip>
                </div>
            </div>
            {/* body */}
            <FormUpdateEpisode isDisplay={isDisplay} handleSave={handleSave} state={state} updateState={updateState}/>
        </div>
    )
}
  
const FormUpdateEpisode = ({ isDisplay, handleSave, state, updateState }) => {
    return(
      <div className={`${isDisplay?'flex flex-col':'hidden'} mt-4`}>
        <hr />
        {/* Example of editable inputs for movie details */}
        <InputComponent title="Title" value={state.title} onChange={(e)=>{updateState('title', e.target.value)}} />
        <InputComponent title="Name" value={state.name} onChange={(e)=>{updateState('name', e.target.value)}} />
        <InputComponent title="Slug" value={state.slug} onChange={(e)=>{updateState('slug', e.target.value)}} />
        <InputComponent title="Link" value={state.link} onChange={(e)=>{updateState('link', e.target.value)}} />
  
        {/* More fields can be added here for editing other movie details */}
        <div className="flex justify-end gap-4">
            <Chip onClick={handleSave} variant="gradient" value="Lưu" color='teal' 
              className="rounded-xl font-md py-3 px-8 cursor-pointer" />
        </div>
      </div>
    )
}
