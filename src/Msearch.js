const api_key = '21af7afbbe6bf2ed9faf64903957b906';

const fetchMovieData = async (query) => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${query}&page=1&include_adult=false`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
};

export const fetchMovieDetails = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&language=en-US`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details: ", error);
    return null;
  }
};

export default fetchMovieData;