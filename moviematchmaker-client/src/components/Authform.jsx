import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../context/authContext";

const AuthForm = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { authenticateUser, setIsLoggedIn } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userToSubmit = { email, password, pseudo };

      if (mode === "Signup") {
        const response = await axios.post(
          "http://localhost:3000/auth/signup",
          userToSubmit
        );
        console.log(response.data); // Handle the response accordingly
        navigate("/auth/login");
      } else {
        const response = await axios.post(
          "http://localhost:3000/auth/login",
          userToSubmit
        );
        console.log(response.data); // Handle the response accordingly
        localStorage.setItem("token", response.data.authToken);
        setError("");
        setIsLoggedIn(true);
        navigate("/"); // redirect to home after connexion
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {mode === "Signup" && (
          <div>
            <label htmlFor="pseudo">Pseudo:</label>
            <input
              type="text"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
            />
          </div>
        )}
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <p style={{ color: "red" }}>{error}</p>

        <button>{mode}</button>
      </form>
    </div>
  );
};

export default AuthForm;
