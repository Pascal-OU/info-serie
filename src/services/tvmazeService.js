import axios from 'axios';


const BASE_URL = 'https://api.tvmaze.com/';

export const searchTvMaze = async (type, text) => {
  let url = '';
  switch (type) {
    case 'name':
      url = `${BASE_URL}/search/shows?q=${text}&embed=cast`;
      break;
    case 'theme':
      url = `${BASE_URL}/shows?q=${text}&embed=cast`;
      break;
    case 'actor':
      url = `${BASE_URL}/search/people?q=${text}&embed=cast`;
      break;
    default:
      throw new Error('Type de recherche invalide');
  }

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la recherche:', error);
    return [];
  }
};

const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';
const YOUTUBE_API_KEY = 'VOTRE_CLE_API_YOUTUBE';

export const searchYouTube = async (query) => {
  const url = `${YOUTUBE_API_URL}?part=snippet&q=${encodeURIComponent(
    query
  )}&type=video&key=${YOUTUBE_API_KEY}`;

  try {
    const response = await axios.get(url);
    // Retourner uniquement la première vidéo trouvée
    return response.data.items[0];
  } catch (error) {
    console.error('Erreur lors de la recherche YouTube:', error);
    return null;
  }
};