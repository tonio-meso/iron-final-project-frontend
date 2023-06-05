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
        // const response = await axios.get("http://localhost:3000/api/allmovies");
        const response = await service.get("/api/allmovies");
        // const response = await axios.get("/api/allmovies"); i don't understand why if i dont specifiy the beginning of the url i get a random http
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
        <Link to="/selectionform">
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
