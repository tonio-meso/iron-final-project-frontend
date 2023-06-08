import React, { useContext } from "react";
import { AuthContext } from "../context/authContext"; // no matter this alarm it work on prod
import AuthForm from "./../components/Authform";
import { Link } from "react-router-dom";

const Myaccount = () => {
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  if (!isLoggedIn) {
    return (
      <div>
        <h1>My Account</h1>
        <AuthForm mode="Signup" />
        <p>
          Already have an account? <Link to="/auth/login">Log in</Link>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome, {user && user.pseudo ? user.pseudo : ""}!</h1>
      <p>Email: {user && user.email ? user.email : ""}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Myaccount;
