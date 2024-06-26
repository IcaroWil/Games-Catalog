import axios from 'axios';

const API_KEY = 'YOUR_API_KEY';

const fetchGames = async () => {
  try {
    const response = await axios.get('https://api.rawg.io/api/games', {
      params: {
        key: API_KEY
        
      }
    });
    console.log(response.data.results)
    return response.data.results;
  } catch (error) {
    console.error('Error fetching games:', error);
    return []; 
  }
};

export default fetchGames;