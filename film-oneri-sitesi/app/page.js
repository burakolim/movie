"use client";
import { useState, useEffect } from 'react';
import { Grid, Pagination } from '@mui/material';
import Navbar from './components/Navbar';
import MovieCard from './components/MovieCard';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(32);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch('http://localhost:5000/movies');
        if (!response.ok) {
          throw new Error('Veri çekme hatası');
        }
        const data = await response.json();
        setMovies(data);
        setFilteredMovies(data);
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
    }

    fetchMovies();
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredMovies(movies);
      return;
    }
    const lowerCaseQuery = query.toLowerCase();
    const filtered = movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(lowerCaseQuery) ||
        movie.description.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredMovies(filtered);
    setCurrentPage(1);
  };

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <div style={{ padding: '20px' }}>
        <Grid container spacing={3}>
          {currentMovies.map((movie) => (
            <Grid item xs={12} sm={6} md={3} key={movie.movieId}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Pagination
            count={Math.ceil(filteredMovies.length / moviesPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
      </div>
    </div>
  );
}