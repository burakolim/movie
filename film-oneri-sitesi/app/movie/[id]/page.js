"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../components/Navbar';

const MovieDetail = () => {
  const [movie, setMovie] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const params = useParams();
  const movieId = params.id;
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        console.log('Film ID:', movieId); // Debug için log
        
        const response = await fetch(`http://localhost:5000/movies/${movieId}`);
        console.log('API Yanıtı:', response.status); // Debug için log
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Film Verisi:', data); // Debug için log
        
        if (!data) {
          throw new Error('Film verisi bulunamadı');
        }
        
        setMovie(data);
        
        if (username) {
          const favResponse = await fetch(`http://localhost:5000/favorites/check`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, movieId }),
          });
          
          if (favResponse.ok) {
            const favData = await favResponse.json();
            setIsFavorite(favData.isFavorite);
          }
        }
      } catch (error) {
        console.error('Film detayları alınamadı:', error);
        // Kullanıcıya hata mesajı göster
        alert('Film detayları yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      }
    };

    if (movieId) {
      fetchMovie();
    }
  }, [movieId, username]);

  const handleFavorite = async () => {
    if (!username) {
      alert('Favoriye eklemek için giriş yapmalısınız!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/favorites', {
        method: isFavorite ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, movieId }),
      });

      if (response.ok) {
        setIsFavorite(!isFavorite);
        alert(isFavorite ? 'Favorilerden çıkarıldı' : 'Favorilere eklendi');
      }
    } catch (error) {
      console.error('Favori işlemi başarısız:', error);
    }
  };

  if (!movie) return <div>Yükleniyor...</div>;

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.movieDetail}>
          <img
            src={movie.poster_url}
            alt={movie.title}
            style={styles.poster}
          />
          <div style={styles.info}>
            <h1 style={styles.title}>{movie.title}</h1>
            <p style={styles.description}>{movie.description}</p>
            <p style={styles.genres}>Türler: {movie.genres}</p>
            <button
              onClick={handleFavorite}
              style={{
                ...styles.favoriteButton,
                backgroundColor: isFavorite ? '#e74c3c' : '#2ecc71'
              }}
            >
              {isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  movieDetail: {
    display: 'flex',
    gap: '30px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  poster: {
    width: '300px',
    height: '450px',
    objectFit: 'cover',
    borderRadius: '10px',
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: '2rem',
    color: '#2c3e50',
    marginBottom: '20px',
  },
  description: {
    fontSize: '1.1rem',
    color: '#34495e',
    marginBottom: '20px',
    lineHeight: '1.6',
  },
  genres: {
    fontSize: '1.1rem',
    color: '#7f8c8d',
    marginBottom: '20px',
  },
  favoriteButton: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    color: '#fff',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};

export default MovieDetail;