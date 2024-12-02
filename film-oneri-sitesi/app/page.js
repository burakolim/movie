'use client'
import { useEffect, useState } from "react";
import { Grid, Pagination } from "@mui/material";

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [expanded, setExpanded] = useState({}); // Açıklamaları genişletmek için
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 30; // Her sayfada 30 film olacak

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('/movies.csv');
                const data = await res.text();

                const rows = data.split('\n');
                const movieData = rows.slice(1).map(row => {
                    const columns = row.split(',');

                    if (columns.length >= 5) {
                        const movieId = columns[0]?.trim();
                        const imdbId = columns[1]?.trim();
                        const tmdbId = columns[2]?.trim();
                        const posterUrl = columns[3]?.trim();
                        const description = columns.slice(4).join(',').trim(); // Tüm açıklamayı al

                        if (posterUrl && description) {
                            return { movieId, imdbId, tmdbId, posterUrl, description };
                        }
                    }
                    return null;
                }).filter(movie => movie !== null);

                setMovies(movieData);
            } catch (error) {
                console.error("CSV verileri alınırken bir hata oluştu:", error);
            }
        }
        fetchData();
    }, []);

    // Sayfa değiştiğinde çalışacak fonksiyon
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // Sayfa değiştirildiğinde genişletme durumunu sıfırlama
    useEffect(() => {
        setExpanded({});
    }, [currentPage]);

    // Filmleri şu anki sayfaya göre al
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    const toggleExpand = (index) => {
        setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
    };

    return (
        <div>
            <Grid container spacing={3}>
                {currentMovies.map((movie, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                        <div 
                            className="movie-card" 
                            style={{
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                padding: '10px',
                                textAlign: 'center',
                                backgroundColor: '#f9f9f9',
                            }}
                        >
                            {movie.posterUrl ? (
                                <img 
                                    src={movie.posterUrl} 
                                    alt={`Poster for ${movie.movieId}`} 
                                    style={{ width: '100%', borderRadius: '8px' }}
                                />
                            ) : (
                                <div 
                                    style={{
                                        width: '100%',
                                        height: '300px',
                                        backgroundColor: '#ddd',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: '8px'
                                    }}
                                >
                                    No Image
                                </div>
                            )}
                            <p style={{ margin: '10px 0', fontWeight: 'bold' }}>
                                {expanded[index] ? (
                                    <>
                                        {movie.description}
                                        <span
                                            style={{ color: 'blue', cursor: 'pointer', marginLeft: '5px' }}
                                            onClick={() => toggleExpand(index)}
                                        >
                                            Daha az göster
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        {movie.description.length > 100
                                            ? `${movie.description.slice(0, 100)}...`
                                            : movie.description}
                                        {movie.description.length > 100 && (
                                            <span
                                                style={{ color: 'blue', cursor: 'pointer', marginLeft: '5px' }}
                                                onClick={() => toggleExpand(index)}
                                            >
                                                Devamını oku
                                            </span>
                                        )}
                                    </>
                                )}
                            </p>
                        </div>
                    </Grid>
                ))}
            </Grid>

            {/* Sayfalama */}
            <Pagination 
                count={Math.ceil(movies.length / moviesPerPage)} 
                page={currentPage} 
                onChange={handlePageChange} 
                color="primary" 
                style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
            />
        </div>
    );
}
