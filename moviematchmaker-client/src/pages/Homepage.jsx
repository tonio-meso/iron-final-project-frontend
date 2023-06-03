import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import service from "./../service/api";

const Homepage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchDataForTheCube = async () => {
      try {
        ///fix the url
        //const response = await axios.get("http://localhost:3000/api/allmovies");
        const response = await service.get(
          "https://movie-match-maker-service.onrender.com/api/allmovies"
        );
        setMovies(response.data);
        console.log(response.data);
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
