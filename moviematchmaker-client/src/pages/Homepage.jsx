import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchDataForTheCube = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/allmovies/movie-picture"
        );
        setMovies(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataForTheCube();
  }, []);

  return (
    <div>
      <div>
        <Link to="/swipepage">
          <button>learn about my movie tastes</button>
        </Link>
      </div>
      <div>
        <Link to="/moviesuggestion">
          <button>i want to watch a movie right now</button>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
