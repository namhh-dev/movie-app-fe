import React from 'react';
import { FiterSelect } from '../input/SelectComponent';
import { useStore } from '../../hooks/useStore';
import { FilterInput } from '../input/InputComponent';

const Filter = ({ filters, updateState, handleKeyDown }) => {
  const { categories, countries, years, types } = useStore(); // Fetching options from the store

  // Utility function to format options for select inputs
  const formatOptions = (data, valueField, labelField, slugField = null) =>
    data.map(item => ({
      ...item,
      // Add fields for value and label to use in <Select /> library
      value: item[valueField], 
      label: item[labelField],
      ...(slugField && { slug: item[slugField] }), // Add slug if provided
    }));

  // State options for select inputs (type, year, category, etc.)
  const optionState = { 
    yearOptions: formatOptions(years, 'year_name', 'year_name'),
    typeOptions: formatOptions(types, 'type_slug', 'type_name'), 
    categoryOptions: formatOptions(categories, 'cat_slug', 'cat_name'), 
    countryOptions: formatOptions(countries, 'ctr_slug', 'ctr_name')
  };

  return (
    <div className='w-full'>
      <div className="grid laptop-xl:grid-cols-2 mobile-xl:gap-3 gap-1 pt-3">
        <FilterInput onKeyDown={handleKeyDown} name="act" type='text' placeholder='Diễn viên' value={filters.actor} onChange={(e)=>{updateState('actor', e.target.value)}} />
        <FilterInput onKeyDown={handleKeyDown} name="dir" type='text' placeholder='Đạo diễn' value={filters.director} onChange={(e)=>{updateState('director', e.target.value)}} />
      </div>
      <div className="grid laptop-xl:grid-cols-6 mobile-xl:grid-cols-3 mobile-xl:gap-3 gap-1 pb-3 pt-1 mobile-xl:py-3">
        <FiterSelect  name="cat" title="danh mục" value={filters.category} options={optionState.categoryOptions} onChange={(e)=>{updateState('category', e.target.value)}}/>
        <FiterSelect  name="ctr" title="quốc gia" value={filters.country} options={optionState.countryOptions} onChange={(e)=>{updateState('country', e.target.value)}}/>
        <FiterSelect  name="year" title="năm" value={filters.year} options={optionState.yearOptions} onChange={(e)=>{updateState('year', e.target.value)}}/>
        <FiterSelect  name="type" title="thể loại" value={filters.type} options={optionState.typeOptions} onChange={(e)=>{updateState('type', e.target.value)}}/>
        <FiterSelect  name="lang" title="Ngôn ngữ" value={filters.lang} options={[{value: 'Vietsub', label:'Vietsub'},{value: 'Lồng tiếng', label:'Lồng tiếng'},{value: 'Thuyết minh', label:'Thuyết minh'}]} onChange={(e)=>{updateState('lang', e.target.value)}}/>
        <FiterSelect  name="quality" title="Chất lượng" value={filters.quality} options={[{value: 'HD', label:'HD'},{value: 'FHD', label:'FHD'},{value: 'SD', label:'SD'}]} onChange={(e)=>{updateState('quality', e.target.value)}}/>
      </div>
    </div>
  );
};

export default Filter;
