import { useEffect, useState } from 'react';
import Context from './Context';
import axios from "axios";
import { API_ROOT } from '../constants/constants';

const Provider = ({ children }) => {

    const apiUrl = API_ROOT;
    const [isLoading, setIsLoading] = useState(false);

    const [categories, setCategories] = useState([]);
    const [countries, setCountries] = useState([]);
    const [years, setYears] = useState([]);
    const [types, setTypes] = useState([]);
    const [actors, setActors] = useState([]);
    const [directors, setDirectors] = useState([]);

    useEffect(() => {
        // Fetch data from API
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const endpoints = ['category', 'year', 'country', 'type', 'actor', 'director'];
        
                // call promise all api from BE 
                const responses = await Promise.all(
                    endpoints.map(endpoint => axios.get(`${apiUrl}/api/v1/${endpoint}`))
                );  
        
                const [categoryData, yearData, countryData, typeData, actorData, directorData] = responses.map(res => res.data);
                
                // set states for options to use in <select /> (type, year, category,.....)
                setCategories(categoryData);
                setYears(yearData);
                setCountries(countryData);
                setTypes(typeData);
                setActors(actorData);
                setDirectors(directorData);
            } catch (error) {
                console.error(error);
            }finally{
                setIsLoading(false);
            }
        };
        
        fetchData();
    }, []);
    
    return (<Context.Provider value={{categories, countries, years, types, actors, directors, isLoading}}>
        {children}
        </Context.Provider>
    );
}

export default Provider;