import React from 'react';
import { Chip } from '@material-tailwind/react';
import { FiterSelect } from '../input/SelectComponent';
import { useStore } from '../../hooks/useStore';
import { FilterInput } from '../input/InputComponent';
import { IconReFresh } from '../icon/Icon';

const Filter = ({ filters, updateState, setIsFilter }) => {
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

  // Function to clear all filters
  const clearFilter = () => {
    setIsFilter(false);
    updateState('category', null);
    updateState('country', null);
    updateState('year', null);
    updateState('type', null);
    updateState('actor', '');
    updateState('director', '');
  }

  return (
    <div className="grid laptop-xl:grid-cols-7 laptop-m:grid-cols-4 tablet-xl:grid-cols-3 gap-4 py-4">
      <FiterSelect title="danh mục" value={filters.category} options={optionState.categoryOptions} onChange={(e)=>{updateState('category', e.target.value)}}/>
      <FiterSelect title="quốc gia" value={filters.country} options={optionState.countryOptions} onChange={(e)=>{updateState('country', e.target.value)}}/>
      <FiterSelect title="năm" value={filters.year} options={optionState.yearOptions} onChange={(e)=>{updateState('year', e.target.value)}}/>
      <FiterSelect title="thể loại" value={filters.type} options={optionState.typeOptions} onChange={(e)=>{updateState('type', e.target.value)}}/>
      
      <FilterInput type='text' placeholder='Diễn viên' value={filters.actor} onChange={(e)=>{updateState('actor', e.target.value)}} />
      <FilterInput type='text' placeholder='Đạo diễn' value={filters.director} onChange={(e)=>{updateState('director', e.target.value)}} />

      <Chip icon={<IconReFresh />} onClick={clearFilter} variant="gradient" color="blue-gray" value="Bỏ lọc" className="rounded-full font-md cursor-pointer w-[75px] mobile-l:w-[90px] text-[10px] mobile-l:text-sm py-1 mobile-l:py-2"> Bỏ lọc </Chip>
    </div>
  );
};

export default Filter;
