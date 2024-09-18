import React from 'react';
import InputComponent from '../../../input/InputComponent';
import { SelectComponent, SingleSelectComponent } from '../../../input/SelectComponent';

export default function FormUpdateMovie({ handleSave, handleEdit, state, updateState, optionState }) {
  // function for select changes
  const handleSelectChange = (field, selected) => {
    updateState(field , selected);
  };

  return(
    <div className="w-full">
        {/* Inputs for movie details */}
        {/* name - oriName */}
        <div className="grid grid-cols-2 gap-2">
            <InputComponent title="Tên" value={state.name} onChange={(e)=>{updateState('name', e.target.value)}} />
            <InputComponent title="Tên gốc" value={state.originName} onChange={(e)=>{updateState('originName', e.target.value)}} />
        </div>

        {/* currentEp - totalEp - time */}
        <div className="grid grid-cols-3 gap-2">
            <InputComponent title="Tình trạng" value={state.currentEp} onChange={(e)=>{updateState('currentEp', e.target.value)}} />
            <InputComponent title="Số tập" value={state.totalEp} onChange={(e)=>{updateState('totalEp', e.target.value)}} />
            <InputComponent title="Thời lượng" value={state.time} onChange={(e)=>{updateState('time', e.target.value)}} />
        </div>

        {/* poster - thumb */}
        <InputComponent title="Poster" value={state.posterUrl} onChange={(e)=>{updateState('posterUrl', e.target.value)}} />
        <InputComponent title="Thumbnail" value={state.thumbUrl} onChange={(e)=>{updateState('thumbUrl', e.target.value)}} />

        {/* lang - quality - type - year - country */}
        <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-2">
            <SingleSelectComponent value={state.lang} title="Ngôn ngữ" id="lang" options={[{value:"Vietsub",label:"Vietsub"},{value:"Lồng tiếng",label:"Lồng tiếng"}]} onChange={(e)=>{updateState('lang', e.target.value)}}/>
            <SingleSelectComponent value={state.quality} title="Chất lượng" id="quality" options={[{value:"HD",label:"HD"},{value:"FHD",label:"FHD"},{value:"SD",label:"SD"}]} onChange={(e)=>{updateState('quality', e.target.value)}}/>
            <SingleSelectComponent value={state.type} title="Thể loại" id="type" options={[{value:1,label:"Phim bộ"},{value:2,label:"Phim lẻ"},{value:3,label:"TV Shows"},{value:4,label:"Hoạt hình"}]} onChange={(e)=>{updateState('type', e.target.value)}}/>
            <SingleSelectComponent value={state.year} title="Năm" id="year" options={optionState.yearOptions} onChange={(e)=>{updateState('year', e.target.value)}}/>
            <SelectComponent title="Quốc gia" id="country" options={optionState.countryOptions} value={state.country} onChange={value => handleSelectChange('country', value)} />
        </div>
        
        {/* Director - Category - Actor */}
        <SelectComponent title="Đạo diễn" id="director" options={optionState.directorOptions} value={state.director||''} onChange={value => handleSelectChange('director', value)} />
        <SelectComponent title="Danh mục" id="category" options={optionState.categoryOptions} value={state.category||''} onChange={value => handleSelectChange('category', value)} />
        <SelectComponent title="Diễn viên" id="actor" options={optionState.actorOptions} value={state.actor||''} onChange={value => handleSelectChange('actor', value)} />

        {/* Content */}
        <div className="mb-4">
            <label htmlFor="content" className="block mb-2 text-md font-bold text-[#1496d5]">Content</label>
            <textarea onChange={e => updateState("content", e.target.value)} value={state.content} rows={10} id="content" placeholder="Nội dung..."required className="bg-gray-700 placeholder-slate-300 text-white text-sm rounded-md block w-full p-2"/>
        </div>

        {/* Button save and cancel */}
        <div className="flex justify-end gap-4">
            <button onClick={handleSave} className="py-2 px-4 bg-green-600 rounded-md"> Save </button>
            <button onClick={handleEdit} className="py-2 px-4 bg-gray-600 rounded-md"> Cancel </button>
        </div>
    </div>
  )
}
