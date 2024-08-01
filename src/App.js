import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';
import fetchMovieData, { fetchMovieDetails } from './Msearch';
import { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSearch = async () => {
    if (!query) return;  // Ensure query is not empty
    const movieData = await fetchMovieData(query);
    setMovies(movieData);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleMovieClick = async (movieId) => {
    const movieDetails = await fetchMovieDetails(movieId);
    setSelectedMovie(movieDetails);
  };

  return (
    <Container>
      <div className="pageTitle">
        <h1>Your simplest movie search</h1>
      </div>
      <Row>
        <Col className='leftPanel'>
          <div>
            <h2 className='searchMovie'>Search for a movie</h2>
            <div className="search">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={handleKeyPress}
                placeholder="Enter movie name"
              />
              <button onClick={handleSearch}>Search</button>
            </div>
          </div>
          <div>
            <h3 className='results'>Results</h3>
            <ul>
              {movies.map((movie) => (
                <li key={movie.id} onClick={() => handleMovieClick(movie.id)}>
                  {movie.title}
                </li>
              ))}
            </ul>
          </div>
        </Col>
        <Col className='rightPanel'>
          {selectedMovie ? (
            <div>
              <h2>{selectedMovie.title}</h2>
              <p>Genre: {selectedMovie.genres.map(genre => genre.name).join(', ')}</p>
              <p>Overview: {selectedMovie.overview}</p>
              <img src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} alt={selectedMovie.title} />
              <p>Release Date: {selectedMovie.release_date}</p>
              
              
              
            </div>
          ) : (
            <p>Select a movie to see the details</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;