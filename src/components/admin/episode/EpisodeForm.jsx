import React, { useState } from 'react';
import InputComponent from '../../input/InputComponent';
import { validateEpisodeFormInputs } from '../../../services/validator';

const EpisodeForm = ({ listEp, setListEp, handleCloseForm }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const [filename, setFileName] = useState('');
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [link_embed, setLinkEmbed] = useState('');

  const handleAddEp = () => {
    if(validateEpisodeFormInputs({filename, name, slug, link_embed}, setErrorMessage)){
      const newEp = {filename, name, slug, link_embed, id: listEp.length + 1, sort_order: listEp.length + 1};
      
      setListEp(prevList => [...prevList, newEp]); // add episode to list
      
      // Reset all field
      setFileName("");
      setName("");
      setSlug("");
      setLinkEmbed("");

      setErrorMessage(); // clear error message
    }
  };

  return (
    <div className='p-3 shadow-md border rounded-md mb-2 bg-gray-200 bg-opacity-20 backdrop-blur'>
      {/* HEADER AREA */}
      <div className='p-2 flex justify-between'>
        <span></span>
        <h2 className='text-lg font-medium'>THÊM TẬP PHIM</h2>
        <span onClick={handleCloseForm} className='font-bold cursor-pointer'>
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L17.94 6M18 18L6.06 6" />
          </svg>
        </span>
      </div>

      <hr />

      {/* BODY AREA */}
      <InputComponent title="Title" id="title" type="text" placeholder="Thanh Xuân Đón Gió - Wind Direction - 2024 - 1080p - Vietsub - Tập 01" value={filename} onChange={e => setFileName(e.target.value)} />
      <InputComponent title="Episode Link" id="ep_link" type="text" placeholder="https://player.phimapi.com/player/" value={link_embed} onChange={e => setLinkEmbed(e.target.value)} />
      <div className="grid gap-6 md:grid-cols-2">
        <InputComponent title="Name" id="name" type="text" placeholder="Tập" value={name} onChange={e => setName(e.target.value)} />
        <InputComponent title="Slug" id="slug" type="text" placeholder="tap" value={slug} onChange={e => setSlug(e.target.value)} />
      </div>
      
      {/* ERROR MESSAGE AREA */}
      {errorMessage && <div className='flex justify-center mt-3'><span className='text-red-700'>{errorMessage}</span></div>}
      
      {/* FOOTER AREA */}
      <div className='flex justify-center mt-3'>
        <button onClick={handleAddEp} className="group cursor-pointer outline-none hover:rotate-90 duration-300" title="Add New">
          <svg className="stroke-teal-500 fill-none group-hover:fill-teal-800 group-active:stroke-teal-200 group-active:fill-teal-600 group-active:duration-0 duration-300" viewBox="0 0 24 24" height="50px" width="50px" xmlns="http://www.w3.org/2000/svg">
            <path strokeWidth={1.5} d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"/>
            <path strokeWidth={1.5} d="M8 12H16" />
            <path strokeWidth={1.5} d="M12 16V8" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EpisodeForm;