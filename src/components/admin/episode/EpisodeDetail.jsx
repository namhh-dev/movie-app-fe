import React, { useEffect, useState } from 'react'
import { deleteEpisode, updateEpisode } from '../../../services/episodeService'
import { Alert, DeleteAlert } from '../../alert/Alert'
import InputComponent from '../../input/InputComponent'

export default function EpisodeDetail({ episodes, setIsUpdated }) {
    return(
        <div className="px-6 py-4 bg-[#202c3c] text-white rounded-md mt-6">
            <div className="flex justify-center py-4">
                <h2 className="font-bold text-2xl">QUẢN LÝ TẬP PHIM</h2>
                </div>
                <div className="grid grid-cols-1 gap-3">
                {episodes.map((episode)=>{
                    return(<EpisodeCard key={episode.ep_id} episode={episode} setIsUpdated={setIsUpdated} />
                    )
                })}
            </div>
        </div>
    )
}
  
const EpisodeCard = ({ episode, setIsUpdated }) => {
    const [isEditing, setIsEditing] = useState(false);

    // default state episode data
    const defaultState = {title: episode.ep_title, name: episode.ep_name, slug: episode.ep_slug, link: episode.ep_link};
    
    // state of episode data
    const [state, setState] = useState(defaultState);

    // function to update option state (for select inputs like type, category, etc.)
    const updateState = (key, value) => setState(prev => ({ ...prev, [key]: value }));

    const handleEdit = () => {
        setState(defaultState);
        setIsEditing(!isEditing);
    }

    // handle update episode
    const handleSave = async () => {
        setIsUpdated(false);
        // call API to update episode with current episode state
        const result = await updateEpisode({...state, id: episode.ep_id});
        // if episode creation is successful ? reset the form : show an error alert
        if (result&&(result.status === 200 || result.status === 201)) {
            setIsUpdated(true);
            setIsEditing(!isEditing);
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
                <span></span>
                <div className="flex flex-col justify-center items-center mb-2">
                <h2 className="text-xl font-bold text-[#8b5cf6]">{episode.ep_name.toUpperCase()}</h2>
                </div>

                <div className='flex gap-2'>
                <span onClick={handleEdit} className='cursor-pointer'>
                    <svg className="w-6 h-6 t text-white" aria-hidden="true" viewBox="0 0 24 24">
                    <path stroke="currentColor" fill='none' strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                    </svg>
                </span>
                <span onClick={() => {DeleteAlert(handleDelete)}} className='cursor-pointer'>
                    <svg className="w-6 h-6  text-white" aria-hidden="true" viewBox="0 0 24 24">
                    <path stroke="currentColor" fill='none' strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L17.94 6M18 18L6.06 6" />
                    </svg>
                </span>
                </div>
            </div>

            {/* body */}
            {isEditing
            ?
                <FormUpdateEpisode episode={episode} handleSave={handleSave} handleEdit={handleEdit} state={state} updateState={updateState}/>
            :
                <div className="w-full">
                <div className="mb-3"><strong className="text-[#1496d5]">Tiêu đề:</strong> {episode.ep_title}</div>
                <div className="mb-3"><strong className="text-[#1496d5]">Tên tập:</strong> {episode.ep_name}</div>
                <div className="mb-3"><strong className="text-[#1496d5]">Slug:</strong> {episode.ep_slug}</div>
                <div className="mb-3"><strong className="text-[#1496d5]">Nguồn:</strong> {episode.ep_link}</div>
                </div>
            }
        </div>
    )
}
  
const FormUpdateEpisode = ({ handleSave, handleEdit, state, updateState }) => {
    return(
      <div className="flex flex-col">
        {/* Example of editable inputs for movie details */}
        <InputComponent title="Title" value={state.title} onChange={(e)=>{updateState('title', e.target.value)}} />
        <InputComponent title="Name" value={state.name} onChange={(e)=>{updateState('name', e.target.value)}} />
        <InputComponent title="Slug" value={state.slug} onChange={(e)=>{updateState('slug', e.target.value)}} />
        <InputComponent title="Link" value={state.link} onChange={(e)=>{updateState('link', e.target.value)}} />
  
        {/* More fields can be added here for editing other movie details */}
        <div className="flex justify-end gap-4">
          <button onClick={handleSave} className="py-2 px-4 bg-green-600 rounded-md"> Save </button>
          <button onClick={handleEdit} className="py-2 px-4 bg-[#8b5cf6] rounded-md"> Cancel </button>
        </div>
      </div>
    )
}
