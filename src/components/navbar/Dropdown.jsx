import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Dropdown() {
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isCountryOpen, setIsCountryOpen] = useState(false);
    const [isYearOpen, setIsYearOpen] = useState(false);

    const toggleCategoryDropdown = () => {
        setIsCountryOpen(false);
        setIsYearOpen(false);
        setIsCategoryOpen(!isCategoryOpen);
    };
    const toggleCountryDropdown = () => {
        setIsCategoryOpen(false);
        setIsYearOpen(false);
        setIsCountryOpen(!isCountryOpen);
    };
    const toggleYearDropdown = () => {
        setIsCountryOpen(false);
        setIsCategoryOpen(false);
        setIsYearOpen(!isYearOpen);
    };

    const [isCallApi, setIsCallApi] = useState(false);

    // const { loading } = useSelector(yearSelector);

    const [categories, setCategories] = useState([]);
    const [countries, setCountries] = useState([]);
    const [years, setYears] = useState([]);

    // Fetch data from API
    const fetchData = async () => {
        setIsCallApi(true);
        try {
            const endpoints = ['category', 'year', 'country'];

            // call promise all api from BE 
            const responses = await Promise.all(
                endpoints.map(endpoint => axios.get(`http://localhost:8080/${endpoint}`))
            );

            const [categoryData, yearData, countryData] = responses.map(res => res.data);
            // set states for options to use in <select /> (type, year, category,.....)
            setCategories(categoryData);
            setYears(yearData);
            setCountries(countryData);

            setIsCallApi(false);
        } catch (error) {
            setIsCallApi(false);
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    return (
        <>
            <div className='flex space-y-4'>
                <div className='relative'>
                <button onClick={toggleCategoryDropdown} id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" class="flex items-center justify-between normal text-[15px] w-full py-2 px-3 text-gray-300 text-sm font-medium rounded hover:text-blue-700">
                    Thể Loại 
                    <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                    </svg>
                </button>
                {/* Hiển thị dropdown dựa trên trạng thái */}
                {isCategoryOpen && (
                    <div id="dropdownNavbar" className="absolute right-0 mt-6 z-10 text-black font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-64 dark:bg-gray-700 dark:divide-gray-600">
                        <div className="grid grid-cols-3 gap-4 p-2 text-sm text-black dark:text-gray-400">
                        {categories.map((cat)=>{
                            <span key={cat.cat_id} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                {cat.cat_name}
                            </span>
                        })}
                        </div>
                    </div>
                )}
                </div>
            </div>

            <div className='flex space-y-4'>
                <div className='relative'>
                <button onClick={toggleCountryDropdown} id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" class="flex items-center justify-between normal text-[15px] w-full py-2 px-3 text-gray-300 text-sm font-medium rounded hover:text-blue-700">
                    Quốc gia
                    <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                    </svg>
                </button>
                {/* Hiển thị dropdown dựa trên trạng thái */}
                {isCountryOpen && (
                    <div id="dropdownNavbar" className="absolute right-0 mt-6 z-10 text-black font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-64 dark:bg-gray-700 dark:divide-gray-600">
                        <div className="grid grid-cols-3 gap-4 p-2 text-sm text-black dark:text-gray-400">
                        {countries.map((item)=>{
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            {item.ctr_name}
                            </a>
                        })}
                        </div>
                    </div>
                )}
                </div>
            </div>

            <div className='flex space-y-4'>
                <div className='relative'>
                <button onClick={toggleYearDropdown} id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" class="flex items-center justify-between normal text-[15px] w-full py-2 px-3 text-gray-300 text-sm font-medium rounded  hover:text-blue-700">
                    Năm 
                    <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                    </svg>
                </button>
                {/* Hiển thị dropdown dựa trên trạng thái */}
                {isYearOpen && (
                    <div id="dropdownNavbar" className="absolute right-0 mt-6 z-10 text-black font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-64 dark:bg-gray-700 dark:divide-gray-600">
                        <div className="grid grid-cols-3 gap-4 p-2 text-sm text-black dark:text-gray-400">
                        {categories.map((item)=>{
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            {item.year_name}
                            </a>
                        })}
                        </div>
                    </div>
                )}
                </div>
            </div>
        </>
    );
}
