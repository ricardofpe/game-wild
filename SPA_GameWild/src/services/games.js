import axios from 'axios';

const url = 'https://api.rawg.io/api/';

export const getGames = async () => {
  try {
    const response = await axios.get(`${url}games`, {
      params: {
        key: process.env.API_KEY_RAWG, 
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
};