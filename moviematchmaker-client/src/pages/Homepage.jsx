import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

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
        <div>
          <Link to="/selectionform">
            <button>Tell us what kind of movies you like</button>
          </Link>
        </div>
      )}
      {isLoggedIn && isFormSubmitted && (
        <div>
          <Link to="/swipepage">
            <button>How did you like these movies?</button>
          </Link>
          <Link to="/moviesuggestion">
            <button>Give me a movie to watch right now</button>
          </Link>
        </div>
      )}
      {!isLoggedIn ? (
        <div>
          <Link to="/myaccount">
            <button>First of all create an account here</button>
          </Link>
        </div>
      ) : null}
    </>
  );
};

export default Homepage;
