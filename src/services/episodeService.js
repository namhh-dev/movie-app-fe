import axios from "axios";
const apiUrl = process.env.REACT_APP_BACKEND_URL;

// Function get episode by id
export const getEpisodeById = async (id) => {
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${apiUrl}/api/v1/episode/${id}`,
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

// Function get episode by movie id
export const getEpisodeByMovieId = async (movId, query, order, currentPage) => {
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${apiUrl}/api/v1/episode/mv/${movId}`,
            headers: { },
            params: {
              query: query,
              order: order,
              page: currentPage,
              limit: 10       
          },
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

// Function get episode by movie id
export const getAllEpisodeByMovieId = async (movId) => {
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${apiUrl}/api/v1/episode/mv/all/${movId}`,
            headers: { },
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

// Function update episode
export const createEpisode = async (data) => {
  try {
      let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${apiUrl}/api/v1/episode`,
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

// Function update episode
export const updateEpisode = async (data) => {
    try {
        let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `${apiUrl}/api/v1/episode`,
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

// Function update episode sort_order
export const updateEpisodeSortOrder = async (id, sortOrder) => {
  try {
      let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${apiUrl}/api/v1/episode/sort-oder/${id}`,
      headers: { 
          'Content-Type': 'application/json'
      },
      data : {sort_order: sortOrder}
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
        url: `${apiUrl}/api/v1/episode/${id}`,
        headers: { }
        };
        
        const result = await axios.request(config);
        
        return result;
    } catch (error) {
        return error.response;
    }
}