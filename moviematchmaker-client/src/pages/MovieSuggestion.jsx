import React, { useState, useEffect } from "react";
import service from "../service/api";

const Recommendations = ({ userId }) => {
  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      try {
        const response = await service.get("/api/random-movies");
        setMovies(response.data.recommendedMovies);
        setMessage(response.data.message);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecommendedMovies();
  }, [userId]);

  return (
    <div>
      <h1>Recommended Movies</h1>
      <h2>{message}</h2>
      {movies.map((movie) => (
        <div key={movie._id}>
          <h2>{movie.title}</h2>
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.title}
          />
          {/* ... other movie details ... */}
        </div>
      ))}
    </div>
  );
};

export default Recommendations;
