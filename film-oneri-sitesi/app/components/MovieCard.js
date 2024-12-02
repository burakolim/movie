const MovieCard = ({ movie }) => {
  return (
    <div
      style={{
        width: '250px',
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', // Gölgeleme
        marginBottom: '20px',
        backgroundColor: '#fff',
        cursor: 'pointer', // Hoverda fareyle etkileşim
        transition: 'all 0.3s ease-in-out',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
      }}
    >
      <div style={{ position: 'relative', height: '350px', overflow: 'hidden' }}>
        <img
          src={movie.poster_path || "https://via.placeholder.com/250x375?text=Film+Poster"}
          alt={movie.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            transition: 'transform 0.5s ease-in-out',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '5px',
            fontSize: '1rem',
            fontWeight: 'bold',
          }}
        >
          {movie.vote_average} <span style={{ fontSize: '0.8rem' }}>⭐</span>
        </div>
      </div>
      <div style={{ padding: '15px' }}>
        <h3
          style={{
            fontSize: '1.1rem',
            fontWeight: '600',
            color: '#333',
            marginBottom: '10px',
            textTransform: 'capitalize', // Başlık stilini düzenledik
            lineHeight: '1.3',
          }}
        >
          {movie.title}
        </h3>
        <p
          style={{
            fontSize: '0.85rem',
            color: '#777',
            lineHeight: '1.5',
            marginBottom: '15px',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          {movie.overview.length > 100 ? `${movie.overview.slice(0, 100)}...` : movie.overview}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
