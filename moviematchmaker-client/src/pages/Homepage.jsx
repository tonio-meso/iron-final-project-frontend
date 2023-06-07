import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Homepage = () => {
  const { isLoading, isLoggedIn, isFormSubmitted } = useContext(AuthContext);

  useEffect(() => {
    console.log("isFormSubmitted:", isFormSubmitted);
  }, [isFormSubmitted]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {isLoggedIn && !isFormSubmitted ? (
        <div>
          <Link to="/selectionform">
            <button>Learn about my movie tastes</button>
          </Link>
        </div>
      ) : null}
      {isLoggedIn && isFormSubmitted ? (
        <div>
          <Link to="/swipepage">
            <button>Start to swipe</button>
          </Link>
          <Link to="/moviesuggestion">
            <button>I want to watch a movie right now</button>
          </Link>
        </div>
      ) : null}
      {!isLoggedIn ? (
        <div>
          <Link to="/myaccount">
            <button>Learn about my movie tastes</button>
          </Link>
        </div>
      ) : null}
    </>
  );
};

export default Homepage;
