import React, { useEffect, useState } from "react";
// import axios from "axios";
import service from "../service/api";

// const token = localStorage.getItem("token");

const MyCollection = () => {
  // State variables for storing movies, current page, and page size
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Fetch movies when the currentPage or pageSize changes
  useEffect(() => {
    fetchMovies();
  }, [currentPage, pageSize]);

  const fetchMovies = async () => {
    try {
      const response = await service.get("/api/mycollection", {
        params: {
          page: currentPage,
          pageSize: pageSize,
        },
      });

      // Update the movies state with the response data
      setMovies(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSwipeChange = async (movieId, swipeType) => {
    try {
      console.log("Movie ID:", movieId);
      console.log("Swipe Type:", swipeType);
      // Send a patch request to update the movie's swipe type
      const response = await service.patch(`/api/mycollection/${movieId}`, {
        swipeType,
      });
      console.log("User swipe updated successfully");

      // Refresh the movie list after the swipe update
      fetchMovies();
    } catch (error) {
      console.error("Error updating swipe type:", error);
    }
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      const response = await service.delete(`/api/mycollection/${movieId}`);

      console.log("Movie deleted successfully");
      // Refresh the movie list after the deletion
      fetchMovies();
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  // Inside the movie mapping in the MyCollection component
  // Button to delete a movie
  <button onClick={() => handleDeleteMovie(movie._id)}>Delete</button>;

  return (
    <div>
      <h1>My Collection</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Poster</th>
            <th>Swipe Type</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={movie.title}
                  style={{ width: "100px" }}
                />
              </td>
              <td>
                <select
                  value={
                    movie.swipeStatus.likes
                      ? "likes"
                      : movie.swipeStatus.dislikes
                      ? "dislikes"
                      : movie.swipeStatus.superlikes
                      ? "superlikes"
                      : "unwatched"
                  }
                  onChange={(e) => handleSwipeChange(movie._id, e.target.value)}
                >
                  <option value="unwatched">Unwatched</option>
                  <option value="likes">Like</option>
                  <option value="dislikes">Dislike</option>
                  <option value="superlikes">Super Like</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleDeleteMovie(movie._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span>{currentPage}</span>
        <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
};

export default MyCollection;
