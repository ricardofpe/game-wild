import axios from 'axios';

const url = 'https://api.rawg.io/api/';

export const getGames = async (queryParams = {}) => { 
  try {
    const response = await axios.get(`${url}games`, {
      params: {
        key: process.env.API_KEY_RAWG, 
        ...queryParams 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
};

export const getGenres = async () => {
  try{
    const response = await axios.get(`${url}genres`,{
      params:{
        key:process.env.API_KEY_RAWG
      },
    })
    return response.data
  }catch(error){
    console.error("Error fetching genres:", error);
    throw error;
  }
}

export const getPlataforms = async () => {
  try{
    const response = await axios.get(`${url}platforms`,{
      params:{
        key:process.env.API_KEY_RAWG
      },
    })
    return response.data
  }catch(error){
    console.error("Error fetching plataforms:", error);
    throw error;
  }
}