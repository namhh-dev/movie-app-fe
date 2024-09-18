import axios from "axios";

// Function get episode by id
export const getEpisodeById = async (id) => {
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:8080/episode/${id}`,
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

// Function update movie
export const updateEpisode = async (data) => {
    try {
        let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `http://localhost:8080/episode`,
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

// Function delete episode
export const deleteEpisode = async (id) => {
    try {
        let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `http://localhost:8080/episode/${id}`,
        headers: { }
        };
        
        const result = await axios.request(config);
        
        return result;
    } catch (error) {
        return error.response;
    }
}