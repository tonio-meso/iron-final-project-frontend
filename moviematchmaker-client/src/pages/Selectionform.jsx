import React, { useState, useEffect, useContext } from "react";
import service from "./../service/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axios from "axios";

const PreferenceForm = () => {
  const { user, submitForm, setIsFormSubmitted } = useContext(AuthContext); // Add setIsFormSubmitted from the AuthContext
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [yearPreferences, setYearPreferences] = useState("");
  const navigate = useNavigate(); // use to redirect on the swipepage after the submission of the form

  // Fetch genres from server when component mounts
  useEffect(() => {
    const getAllGenres = async () => {
      try {
        const response = await service.get("/api/allgenres");
        console.log("response.data from the get", response.data);
        response.data.forEach((genre) => {
          // console.log("Genre:", genre);
        });
        setGenres(response.data); // set the genredata to state
        // console.log("Fetched Genres:", genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    getAllGenres();
  }, []);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // check if at least 3 genres are selected, but not more than 4
    if (selectedGenres.length < 3 || selectedGenres.length > 4) {
      alert("Please select between 3 and 4 genres.");
      return;
    }

    try {
      await service.post("/api/form", {
        // add URL and body object
        preferred_genres: selectedGenres,
        year_preferences: yearPreferences,
        user: user._id,
      });

      // await axios.post("http://localhost:3000/api/form", {
      //   preferred_genres: selectedGenres,
      //   year_preferences: yearPreferences,
      //   user: user._id,
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("token")}`,
      //   },
      // });

      alert("Preferences submitted successfully!");
      setSelectedGenres([]); // clear selected genres after successful submission
      setYearPreferences(""); // clear year preferences after successful submission
      setIsFormSubmitted(true); // Set isFormSubmitted to true
      localStorage.setItem("isFormSubmitted", true); // Set isFormSubmitted in localStorage
      navigate("/swipePage"); // redirect to the swipepage after the submission form
    } catch (error) {
      console.error("Error submitting preferences:", error);
    }
  };
  const handleGenreChange = (event) => {
    // console.log("Checkbox value:", event.target.value);
    // console.log("Checkbox checked:", event.target.checked);
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
    console.log("Selected Genres:", selectedGenres);
  };

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
