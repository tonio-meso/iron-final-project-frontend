import React from "react";
import { createContext, useState, useEffect } from "react";
import service from "../service/api";

export const AuthContext = createContext();
const AuthContextWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // should be remove
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Add isFormSubmitted state to handle the form

  useEffect(() => {
    // execute authuser
    authenticateUser();
  }, []);

  const authenticateUser = async () => {
    try {
      // Get the token
      const token = localStorage.getItem("token");
      if (token) {
        // Send the token, we expect a response with the user informations.
        const response = await service.get("/auth/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);

        // Set the received user infos to my user state
        // Set is logged in to true.
        setUser(response.data);
        setIsLoggedIn(true);
        setIsLoading(false); // should be remove
        setIsFormSubmitted(response.data.isFormSubmitted); // Set isFormSubmitted state
        // console.log("isFormSubmitted: on token", isFormSubmitted); // to track where i loose it
      } else {
        setUser(null);
        setIsLoggedIn(false);
        setIsLoading(false); // should be remove
        setIsFormSubmitted(false); // Set isFormSubmitted state
        // console.log("isFormSubmitted: on don't have a token", isFormSubmitted);
      }
    } catch (error) {
      console.log(error);
      setUser(null);
      setIsLoggedIn(false);
      setIsLoading(false); // should be remove
    }
  };
  // add here the possibility to log out
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const fetchIsFormSubmitted = async () => {
      try {
        const response = await service.get("/api/form");
        setIsFormSubmitted(response.data.isFormSubmitted);
        localStorage.setItem("isFormSubmitted", response.data.isFormSubmitted);
        console.log("isFormSubmitted: on refresh", isFormSubmitted);
      } catch (error) {
        console.log(error);
      }
    };

    fetchIsFormSubmitted();
  }, []);

  const values = {
    user,
    setUser,
    authenticateUser,
    setIsLoggedIn,
    isLoggedIn,
    isLoading, // should be remove
    isFormSubmitted, // Add isFormSubmitted to the values
    setIsFormSubmitted, // Add setIsFormSubmitted to the values
    logout,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
// export { AuthContext }
export default AuthContextWrapper;
