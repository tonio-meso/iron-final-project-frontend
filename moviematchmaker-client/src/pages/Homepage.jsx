import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import "./Homepage.css";

const Homepage = () => {
  // Retrieve data from the AuthContext
  const { isLoading, isLoggedIn, isFormSubmitted } = useContext(AuthContext);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Set the isReady state once loading is complete
    if (!isLoading) {
      setIsReady(true);
    }
  }, [isLoading]);

  if (!isReady) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isLoggedIn && !isFormSubmitted && (
        <div className="wrapper-button">
          <Link to="/selectionform">
            <button className="homepage">
              Tell us what kind of movies you like
            </button>
          </Link>
        </div>
      )}
      {isLoggedIn && isFormSubmitted && (
        <div className="wrapper-button">
          <Link to="/swipepage">
            <button className="homepage">How did you like these movies?</button>
          </Link>
          <Link to="/moviesuggestion">
            <button className="homepage">
              Give me a movie to watch right now
            </button>
          </Link>
        </div>
      )}
      {!isLoggedIn ? (
        <div className="wrapper-button">
          <Link to="/myaccount">
            <button className="homepage">
              First of all create an account here
            </button>
          </Link>
        </div>
      ) : null}
    </>
  );
};

export default Homepage;
