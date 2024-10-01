import React, { useState } from 'react';
import InputComponent from '../../input/InputComponent';
import { validateEpisodeFormInputs } from '../../../services/validator';
import { Alert } from '../../alert/Alert';
import { createEpisode } from '../../../services/episodeService';
import { Button } from '@material-tailwind/react';
import { IconAdd } from '../../icon/Icon';

const EpisodeForm = ({ movId, setIsUpdated, listEp, setListEp, handleCloseForm }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const [filename, setFileName] = useState('');
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [link_embed, setLinkEmbed] = useState('');

  const handleAddEp = async() => {
    if(validateEpisodeFormInputs({filename, name, slug, link_embed}, setErrorMessage)){
      if(movId){
        setIsCreating(true);
        try {
          const result = await createEpisode({ep_title: filename, ep_name: name, ep_slug: slug, ep_link: link_embed, mov_id: movId})
          if (result&&(result.status === 200 || result.status === 201)) {
            Alert(1500, 'Thông báo', result.data.message, 'success', 'OK');
            setIsUpdated(true);
            handleCloseForm();
        } else {
            Alert(2000, 'Thông báo', result.data.message||'Không thể tạo phim!', 'error', 'OK');
        }
        } catch (error) {
          Alert(2000, 'Thông báo', "Không thể tạo tập phim. Vui lòng thử lại", 'error', 'OK');
        }finally{
          setIsCreating(false);
        }
      }else{
        const newEp = {filename, name, slug, link_embed, id: listEp.length + 1, sort_order: listEp.length + 1};
        
        setListEp(prevList => [...prevList, newEp]); // add episode to list
        
        // Reset all field
        setFileName("");
        setName("");
        setSlug("");
        setLinkEmbed("");

        setErrorMessage(); // clear error message
      }
    }
  };

  return (
    <div className='p-3 shadow-md border rounded-md mb-2 bg-gray-200 bg-opacity-20 backdrop-blur'>
      {/* HEADER AREA */}
      <div className='p-2 flex justify-between'>
        <span></span>
        <h2 className='text-lg font-medium text-white'>THÊM TẬP PHIM</h2>
        <span onClick={handleCloseForm} className='font-bold cursor-pointer'>
          <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L17.94 6M18 18L6.06 6" />
          </svg>
        </span>
      </div>

      <hr />

      {/* BODY AREA */}
      <InputComponent title="Title" id="title" type="text" placeholder="Thanh Xuân Đón Gió - Wind Direction - 2024 - 1080p - Vietsub - Tập 01" value={filename} onChange={e => {setFileName(e.target.value);setErrorMessage('')}} />
      <InputComponent title="Episode Link" id="ep_link" type="text" placeholder="https://player.phimapi.com/player/" value={link_embed} onChange={e => {setLinkEmbed(e.target.value);setErrorMessage('')}} />
      <div className="grid gap-6 md:grid-cols-2">
        <InputComponent title="Name" id="name" type="text" placeholder="Tập" value={name} onChange={e => {setName(e.target.value);setErrorMessage('')}} />
        <InputComponent title="Slug" id="slug" type="text" placeholder="tap" value={slug} onChange={e => {setSlug(e.target.value);setErrorMessage('')}} />
      </div>
      
      {/* ERROR MESSAGE AREA */}
      {errorMessage && 
      <div className='flex justify-center mt-3'>
        <span className='text-white bg-red-500 p-1 rounded-md'>{errorMessage}</span>
      </div>
      }
      
      {/* FOOTER AREA */}
      <div className='flex justify-center mt-3'>
        <Button disabled={isCreating?true:false} onClick={handleAddEp} variant="gradient" color='teal' className='flex rounded-full items-center gap-1 font-md text-[8px] mobile-xl:text-[12px] px-3 mobile-xl:px-5 py-2'>
          <IconAdd /> Tạo
        </Button>
      </div>
    </div>
  );
};

export default EpisodeForm;