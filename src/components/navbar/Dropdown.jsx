import React, { useState } from 'react';
import { useStore } from '../../hooks/useStore';
import { Link } from 'react-router-dom';

export default function Dropdowns() {
    const {categories, countries, years, types, actors, directors, isLoading} = useStore();

    const [dropdownState, setDropdownState] = useState({
        isCategoryOpen: false,
        isCountryOpen: false,
        isYearOpen: false
    });
      
    const toggleDropdown = (type) => {
    setDropdownState((prevState) => ({
        isCategoryOpen: type === 'category' ? !prevState.isCategoryOpen : false,
        isCountryOpen: type === 'country' ? !prevState.isCountryOpen : false,
        isYearOpen: type === 'year' ? !prevState.isYearOpen : false
    }));
    };
    
    return (
        <>
            <Dropdown
                label="Thể Loại"
                isOpen={dropdownState.isCategoryOpen}
                items={categories.map(cat => ({ id: cat.cat_id, name: cat.cat_name, value: cat.cat_slug, type:"category"}))}
                toggleDropdown={() => toggleDropdown('category')}
                isLoading={isLoading}
            />
            <Dropdown
                label="Quốc Gia"
                isOpen={dropdownState.isCountryOpen}
                items={countries.map(ctr => ({ id: ctr.ctr_id, name: ctr.ctr_name, value: ctr.ctr_slug, type: "country"}))}
                toggleDropdown={() => toggleDropdown('country')}
                isLoading={isLoading}
            />
            <Dropdown
                label="Năm"
                isOpen={dropdownState.isYearOpen}
                items={years.map(year => ({ id: year.year_id, name: year.year_name, value: year.year_name, type:"year"}))}
                toggleDropdown={() => toggleDropdown('year')}
                isLoading={isLoading}
            />
        </>
    );
}

const Dropdown = ({ label, isOpen, items, toggleDropdown, isLoading }) => {
    const defaultItems = []

    const displayItems = items.length > 0 ? items : defaultItems;

    return (
    <div className='hidden desktop:flex space-y-4'>
      <div className='relative'>
        <button onClick={toggleDropdown} className="flex items-center font-bold justify-between normal text-[15px] w-full py-2 px-3 text-gray-300 text-sm rounded hover:text-[#1496d5]">
          {label}
          <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
          </svg>
        </button>
        {isOpen && !isLoading && (
          <div className="absolute w-[550px] right-0 mt-7 z-10 font-normal bg-[#23262D] divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
            <div className="grid grid-cols-4 p-2 text-sm text-white dark:text-gray-400">
              {displayItems.map((item) => (
                <Link to={`/movie/${item.type}/${item.value}`} key={item.id || item.name} className="block px-4 py-2 rounded-md hover:bg-[#8b5cf6] dark:hover:bg-gray-600 dark:hover:text-white">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
)};