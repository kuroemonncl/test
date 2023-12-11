import React from "react";
import { Link as RouterLink } from "react-router-dom";
import SignOut from "./SignOut";
import LogoImage from "../assets/logo.png";

const NavBar = ({ isAuthenticated }) => {

  const onHandleClick = () => {
    window.location.reload();
  };

  const navStyle = {
    backgroundColor: "#008080",
    color: "#fff",
    padding: "10px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  };

  const logoStyle = {
    textDecoration: "none",
    color: "#fff",
    fontSize: "18px",
    fontWeight: "bold",
  };

  const logoImageStyle = {
    marginRight: "10px", 
    width: "10%",
    height: "10%",
    objectFit: "cover",
  };

  const navItemsStyle = {
    display: "flex",
    alignItems: "center",
  };

  const linkStyle = {
    marginRight: "20px",
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
    position: "relative",
  };

  const buttonStyle = {
    marginRight: "20px", 
    backgroundColor: "#008080",
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    position: "relative",
  };

  const lineStyle = {
    position: "absolute",
    bottom: "0",
    left: "0",
    height: "2px",
    width: "100%",
    backgroundColor: "#fff",
    transform: "scaleX(0)",
    transformOrigin: "bottom right",
    transition: "transform 0.3s ease-in-out",
  };

  const handleHover = (e) => {
    const target = e.currentTarget;
    const line = target.querySelector(".hover-line");
    line.style.transform = "scaleX(1)";
  };

  const handleLeave = (e) => {
    const target = e.currentTarget;
    const line = target.querySelector(".hover-line");
    line.style.transform = "scaleX(0)";
  };

  return (
    <nav style={navStyle}>
      <RouterLink to="/" style={logoStyle}>
      <img src={LogoImage} alt="LN Logo" style={logoImageStyle} />
      </RouterLink>
      <div style={navItemsStyle}>
        {isAuthenticated ? (
          <>
            <RouterLink
              to="/myprofile"
              style={linkStyle}
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
            >
              My Profile
              <div className="hover-line" style={lineStyle}></div>
            </RouterLink>
            <RouterLink
              to="/users"
              style={linkStyle}
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
            >
              Users
              <div className="hover-line" style={lineStyle}></div>
            </RouterLink>
            <SignOut onHandleClick={onHandleClick} />
          </>
        ) : (
          <>
            <RouterLink to="/signup" style={linkStyle}>
              <button style={buttonStyle} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                Sign Up
                <div className="hover-line" style={lineStyle}></div>
              </button>
            </RouterLink>
            <RouterLink to="/signin" style={linkStyle}>
              <button style={buttonStyle} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                Sign In
                <div className="hover-line" style={lineStyle}></div>
              </button>
            </RouterLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;