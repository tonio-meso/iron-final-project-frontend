import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./SwipePage.css";
import service from "../service/api";
function SwipePage() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      console.log("Fetching movies...");
      const res = await service.get("/api/allmovies/filtered-movies");
      setMovies(res.data);
      console.log("Movies fetched:", res.data);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleFetchMoreMovies = () => {
    setCurrentIndex(0); // reset the index
    fetchMovies(); // fetch more movies
  };

  async function handleSwipe(swipeType) {
    const movie = movies[currentIndex];
    if (!movie) {
      console.log("No more movies to swipe!");
      return;
    }

    try {
      console.log(`Sending ${swipeType} action for movie: ${movie._id}`);
      await service.post("/api/swipe", {
        movieId: movie._id,
        swipe: swipeType,
      });
      console.log(
        `Successfully sent ${swipeType} action for movie: ${movie._id}`
      );
      setCurrentIndex(currentIndex + 1);
    } catch (error) {
      console.error(`Failed to ${swipeType} movie:`, error);
    }
  }

  const movie = movies[currentIndex];
  if (!movie) {
    return (
      <div>
        <div>No more movies!</div>
        <button onClick={handleFetchMoreMovies}>Fetch More Movies</button>
        <button onClick={() => navigate("/moviesuggestion")}>
          Go to Movie Suggestions
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <h1>{movie.title}</h1>
      <img src={movie.poster_path} alt={movie.title} />
      <div>
        <button onClick={() => handleSwipe("likes")}>Like</button>
        <button onClick={() => handleSwipe("dislikes")}>Dislike</button>
        <button onClick={() => handleSwipe("superlikes")}>Superlike</button>
        <button onClick={() => handleSwipe("unwatched")}>Unwatched</button>
      </div>
    </div>
  );
}

export default SwipePage;
