import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "./../assets/logo_draft.svg";
import "./Navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleNavLinkClick = () => {
    closeMobileMenu();
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <ul
          className={`navbardetail ${isMobileMenuOpen ? "open" : ""}`}
          onClick={handleNavLinkClick}
        >
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/about"}>About</NavLink>
          </li>
          <li>
            <NavLink to={"/mycollection"}>My collection</NavLink>
          </li>
          <li>
            <NavLink to={"/myaccount"}>My account</NavLink>
          </li>
        </ul>
        <div className="mobile">
          {isMobileMenuOpen ? (
            <i
              className="fa-solid fa-times"
              onClick={handleMobileMenuToggle}
            ></i>
          ) : (
            <i
              className="fa-solid fa-bars"
              onClick={handleMobileMenuToggle}
            ></i>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
