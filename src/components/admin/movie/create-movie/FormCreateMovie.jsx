import axios from 'axios';
import React, { useEffect } from 'react';
import InputComponent from '../../../input/InputComponent';
import { SelectComponent, SingleSelectComponent} from '../../../input/SelectComponent';
import { ImagePreview } from '../list-movie/MovieCardList';


export default function FormCreateMovie({ state, updateState, optionState ,updateOptionState }) {
    useEffect(() => {
        // Fetch data from API
        const fetchData = async () => {
            try {
                const endpoints = ['type', 'year', 'category', 'country', 'actor', 'director'];

                // call promise all api from BE 
                const responses = await Promise.all(
                    endpoints.map(endpoint => axios.get(`http://localhost:8080/${endpoint}`))
                );

                const [typeData, yearData, categoryData, countryData, actorData, directorData] = responses.map(res => res.data);
                // set states for options to use in <select /> (type, year, category,.....)
                updateOptionState('typeOptions', formatOptions(typeData, 'type_slug', 'type_name'));
                updateOptionState('yearOptions', formatOptions(yearData, 'year_id', 'year_name'));
                updateOptionState('categoryOptions', formatOptions(categoryData, 'cat_id', 'cat_name'));
                updateOptionState('countryOptions', formatOptions(countryData, 'ctr_id', 'ctr_name', 'cat_slug'));
                updateOptionState('actorOptions', formatOptions(actorData, 'act_id', 'act_name'));
                updateOptionState('directorOptions', formatOptions(directorData, 'dir_id', 'dir_name'));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    // Utility function to format options
    const formatOptions = (data, valueField, labelField, slugField = null) =>
        data.map(item => ({
            ...item,
            // add field value and label to use in <Select /> library
            value: item[valueField], 
            label: item[labelField],
            ...(slugField && { slug: item[slugField] }),
    }));

    // Function for select changes
    const handleSelectChange = (field, selected) => {
        updateState(field , selected);
    };
    
    return (
        <div className='bg-[#202c3c] h-[1000px] px-4 rounded-md overflow-scroll scrollbar-hidden'>
            <h1 className='text-2xl my-4 font-bold text-center text-white'>MOVIE</h1>

            {/* Inputs for movie details */}
            {/* name - slug */}
            <div className="grid gap-2 md:grid-cols-2 mb-4">
                <InputComponent title="Name" id="name" type="text" placeholder="Thanh Xuân Đón Gió" value={state.name} onChange={e => updateState("name", e.target.value)} />
                <InputComponent title="Slug" id="slug" type="text" placeholder="thanh-xuan-don-gio" value={state.slug} onChange={e => updateState("slug", e.target.value)} />
                <InputComponent title="Origin Name" id="ori_name" type="text" placeholder="Wind Direction" value={state.originName} onChange={e => updateState("originName", e.target.value)} />
                <InputComponent title="Time" id="time" type="text" placeholder="24 phút/tập" value={state.time} onChange={e => updateState("time", e.target.value)} />
            </div>

            {/* Poster & thumbnail */}
            <Images state={state} updateState={updateState} />

            {/* EpTotal -  EpCurrent - Lang */}
            <div className="grid gap-2 md:grid-cols-3 mb-4">
                <InputComponent title="Episode Total" id="ep_total" type="text" placeholder="24 tập" value={state.epTotal} onChange={e => updateState("epTotal", e.target.value)} />
                <InputComponent title="Episode Current" id="ep_current" type="text" placeholder="24/24" value={state.epCurrent} onChange={e => updateState("epCurrent", e.target.value)} />
                <SingleSelectComponent value={state.lang} title="Language" id="lang" options={[{ value: 'Vietsub', label: 'Vietsub' }, { value: 'Lồng Tiếng', label: 'lồng tiếng' }]} onChange={(e)=>updateState("lang", e.target.value)} />
            </div>

            {/* Type -  Quality - Status */}
            <div className="grid gap-2 md:grid-cols-3 mb-4">
                <SingleSelectComponent value={state.type||''} title="Type" id="type" options={optionState.typeOptions} onChange={e => handleSelectChange('type', e.target.value)} />
                <SingleSelectComponent value={state.quality||''} title="Quality" id="quality" options={[{ value: 'HD', label: 'HD' }, { value: 'FHD', label: 'FHD' }, { value: 'SD', label: 'SD' }]} onChange={(e)=>updateState("quality", e.target.value)} />
                <SingleSelectComponent value={state.status||''} title="Status" id="status" options={[{ value: '1', label: 'Completed' }, { value: '0', label: 'Ongoing' }]} onChange={(e)=>updateState("status", e.target.value)} />
            </div>

            {/* Category -  Country - Year - Actor - Director */}
            <SelectComponent title="Category" id="category" options={optionState.categoryOptions} value={state.category||''} onChange={value => handleSelectChange('category', value)} />
            <SelectComponent title="Country" id="country" options={optionState.countryOptions} value={state.country||''} onChange={value => handleSelectChange('country', value)} />
            <SelectComponent title="Year" id="year" options={optionState.yearOptions} value={state.year||''} onChange={value => handleSelectChange('year', value)} />
            <SelectComponent title="Actor" id="actor" options={optionState.actorOptions} value={state.actor||''} onChange={value => handleSelectChange('actor', value)} />
            <SelectComponent title="Director" id="director" options={optionState.directorOptions} value={state.director||''} onChange={value => handleSelectChange('director', value)} />

            {/* Content */}
            <div className="mb-4">
                <label htmlFor="content" className="block mb-2 text-md font-bold text-[#1496d5]">Content</label>
                <textarea onChange={e => updateState("content", e.target.value)} value={state.content} rows={10} id="content" className="bg-gray-700 placeholder-slate-300 text-white text-sm rounded-md block w-full p-2" placeholder="Nội dung..." required/>
            </div>
        </div>
    );
}

// ImageUpload Component to handle poster and thumbnail
const Images = ({ state, updateState }) => (
    <div className='pr-2'>
        <div className={`flex gap-4 items-center h-[195px] mr-2`}>
            <div className="flex-1" style={{ flex: '0 0 77%' }}>
                <InputComponent title="Poster URL" id="poster" type="text" placeholder="https://phimimg.com/upload/.jpg" value={state.posterUrl} onChange={e => updateState("posterUrl", e.target.value)} />
            </div>
            <div className="flex-1 border h-[195px] p-1 rounded-md flex items-center justify-center" style={{ flex: '0 0 23%' }}> 
                {state.posterUrl 
                ? 
                    <ImagePreview url={state.posterUrl} alt="Poster"/>
                    :
                    <p className='text-gray-500 font-medium'>Poster Image</p>
                }
            </div>
        </div>
        <div className={`flex gap-4 items-center h-[80px] mt-2 mr-2`}>
            <div className="flex-1" style={{ flex: '0 0 77%' }}>
                <InputComponent title="Thumbnail URL" id="thumb" type="text" placeholder="https://phimimg.com/upload/.jpg" value={state.thumbUrl} onChange={e => updateState("thumbUrl", e.target.value)} />
            </div>
            <div className="flex-1 border h-[80px] p-1 rounded-md flex items-center justify-center" style={{ flex: '0 0 23%' }}>
                {state.thumbUrl 
                    ? 
                    <ImagePreview url={state.thumbUrl} alt="Thumbnail" />
                    :
                    <p className='text-gray-700 font-medium'>Thumb Image</p>
                }
            </div>
        </div>
    </div>
);