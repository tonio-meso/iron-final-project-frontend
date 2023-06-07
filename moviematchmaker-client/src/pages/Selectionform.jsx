import React, { useState, useEffect, useContext } from "react";
import service from "./../service/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const PreferenceForm = () => {
  const { isLoading, user, setUser, setIsFormSubmitted } =
    useContext(AuthContext);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [yearPreferences, setYearPreferences] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const genresResponse = await service.get("/api/allgenres");
        setGenres(genresResponse.data);
        const userDataResponse = await service.get("/auth/verify");
        const userData = userDataResponse.data;
        setUser(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const formResponse = await service.get(`/api/form/${user._id}`);
        if (formResponse.data.isFormSubmitted) {
          setIsFormSubmitted(true);
          localStorage.setItem("isFormSubmitted", true);
          navigate("/swipePage");
        }
      } catch (error) {
        console.error("Error fetching form:", error);
      }
    };

    if (user) {
      fetchForm();
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user || !user._id) {
      console.error("User data is missing");
      return;
    }

    if (selectedGenres.length < 3 || selectedGenres.length > 4) {
      alert("Please select between 3 and 4 genres.");
      return;
    }

    try {
      await service.post("/api/form", {
        preferred_genres: selectedGenres,
        year_preferences: yearPreferences,
        user: user._id,
      });

      alert("Preferences submitted successfully!");
      setSelectedGenres([]);
      setYearPreferences("");
      setIsFormSubmitted(true);
      localStorage.setItem("isFormSubmitted", true);
      navigate("/swipePage");
    } catch (error) {
      console.error("Error submitting preferences:", error);
    }
  };

  const handleGenreChange = (event) => {
    if (event.target.checked) {
      if (selectedGenres.length === 4) {
        event.preventDefault();
        alert("You can select a maximum of 4 genres");
      } else {
        setSelectedGenres([...selectedGenres, event.target.value]);
      }
    } else {
      setSelectedGenres(
        selectedGenres.filter((genreId) => genreId !== event.target.value)
      );
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Render the form
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Select your preferred genres:</legend>
        {genres.map((genre) => (
          <label key={genre.id}>
            <input
              type="checkbox"
              value={genre.id}
              checked={selectedGenres.includes(genre.id.toString())}
              onChange={handleGenreChange}
            />
            {genre.name}
          </label>
        ))}
      </fieldset>
      <label>
        Enter your preferred years:
        <input
          type="text"
          value={yearPreferences}
          onChange={(e) => setYearPreferences(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PreferenceForm;
