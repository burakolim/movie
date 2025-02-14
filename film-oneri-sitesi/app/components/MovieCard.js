import { useRouter } from 'next/navigation';

const MovieCard = ({ movie }) => {
  const router = useRouter();

  const handleClick = () => {
    console.log('Tıklanan film:', movie); // Debug için log
    router.push(`/movie/${movie.movieId}`);
  };

  return (
    <div 
      className="movie-card" 
      style={styles.card}
      onClick={handleClick}
    >
      {movie.poster_url ? (
        <img
          src={movie.poster_url}
          alt={movie.title}
          style={styles.image}
        />
      ) : (
        <div style={styles.noImage}>No Image</div>
      )}
      <h3 style={styles.title}>{movie.title}</h3>
      <p style={styles.genres}>{movie.genres}</p>
      <p style={styles.description}>
        {movie.description.length > 100
          ? `${movie.description.slice(0, 100)}...`
          : movie.description}
      </p>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '15px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    },
  },
  image: {
    width: '100%',
    aspectRatio: '2/3',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '10px',
  },
  noImage: {
    width: '100%',
    height: '300px',
    backgroundColor: '#ddd',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    marginBottom: '10px',
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#2c3e50',
  },
  genres: {
    fontSize: '0.9rem',
    color: '#7f8c8d',
    marginBottom: '8px',
  },
  description: {
    fontSize: '0.9rem',
    color: '#34495e',
    lineHeight: '1.4',
  },
};

export default MovieCard;