import axios from "axios";
import { Alert } from "../components/alert/Alert";

const province = axios.create({
    baseURL: "",
});

// Function fetch movie api
export const resMovie = async (url) => {
    try {
        const res = await province.get(url);
        Alert(1500, 'Thông báo', "Lấy dữ liệu phim thành công", 'success', 'OK');
        return res.data;
    } catch (error) {
        Alert(2000, 'Thông báo', "Không thể lấy dữ liệu từ api này", 'error', 'OK');
    }
}

// Function get all movie
export const getAllMovie = async () => {
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/movie',
            headers: { }
          };
          
        const result = await axios.request(config)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            console.log(error);
          });
        
        return result;
    } catch (error) {
        return error.response;
    }
}

// Function get latest movie
export const getLatestMovie = async () => {
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/latest-movie',
            headers: { }
          };
          
        const result = await axios.request(config)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            console.log(error);
          });
        
        return result;
    } catch (error) {
        return error.response;
    }
}

// Function get latest movie
export const getMovieById = async (id) => {
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:8080/movie/${id}`,
            headers: { }
          };
          
          console.log(config.url);
          
        const result = await axios.request(config)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            console.log(error);
          });
        
        return result;
    } catch (error) {
        return error.response;
    }
}

// Function create movie
export const createMovie = async (data) => {
    try {
        let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:8080/movie-api',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };
        
        const result = await axios.request(config);
        
        return result;
    } catch (error) {
        return error.response;
    }
}
        
// Function auto fill data when fetch api
export const handleAutoFillMovieData = async (data, updateState, optionState) => {
    const findOrCreateOption = (options, key, value, defaultOptions) => options.find(option => option[key] === value) || defaultOptions;

    updateState("name", data.name || '');
    updateState("slug", data.slug || '');
    updateState("originName", data.origin_name || '');
    updateState("content", data.content || '');
    updateState("posterUrl", data.poster_url || '');
    updateState("thumbUrl", data.thumb_url || '');
    updateState("time", data.time || '');
    updateState("epCurrent", data.episode_current || '');
    updateState("epTotal", data.episode_total || '');
    updateState("quality", data.quality || '');
    updateState("lang", data.lang || '');
    
    updateState("status", data.status=="completed"?1:0);

     // Check and update the movie type if valid
     if (data.type && optionState.typeOptions.some(type => type.type_slug === data.type)) {
        updateState("type", data.type);
    }

    // Check and update the year if valid
    updateState("year", optionState.yearOptions.filter(year => year.label == data.year));

    // Filter categories by slug and update if valid
    if (Array.isArray(data.category)) {
        const filteredCategories = optionState.categoryOptions.filter(cat =>
            data.category.some(item => item.slug === cat.cat_slug)
        );
        updateState("category", filteredCategories);
    }

    // Filter countries by slug and update if valid
    if (Array.isArray(data.country)) {
        const filteredCountries = optionState.countryOptions.filter(ctr =>
            data.country.some(item => item.slug === ctr.ctr_slug)
        );
        updateState("country", filteredCountries);
    }

    // Filter and update actors if they exist
    if (Array.isArray(data.actor)) {
        const filteredActors = data.actor.map(actor =>
            findOrCreateOption(optionState.actorOptions, 'act_name', actor, {
                act_name: actor,
                sort_order: 10,
                status: true,
                value: actor,
                label: actor
            })
        );
        updateState("actor", filteredActors);
    }

    // Filter and update directors, ensuring "Đang cập nhật" is excluded
    if (Array.isArray(data.director)) {
        const filteredDirectors = data.director
            .filter(director => director !== "Đang cập nhật")
            .map(director =>
                findOrCreateOption(optionState.directorOptions, 'dir_name', director, {
                    dir_name: director,
                    status: true,
                    value: director,
                    label: director
                })
            );
        updateState("director", filteredDirectors);
    }
}

export const handleAutoFillEpisodeData = async (data, setListEp)=>{
    setListEp(data.reduce((acc, ep) => {
        ep.server_data.forEach((epDetail, index) => {
            acc.push({
                ...epDetail,
                id: index+1,
                sort_order: index+1
            });
        });
        return acc;
    }, []));
}

