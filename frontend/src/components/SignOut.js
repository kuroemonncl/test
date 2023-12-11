import React from "react";
import { useNavigate } from "react-router-dom";

const SignOut = ({ onHandleClick }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear authentication token from local storage
    localStorage.removeItem("token");
    console.log("Click signout");
  
    navigate("/");
  };

  const buttonStyle = {
    backgroundColor: "#008080",
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    position: "relative",
  };

  return (
    <div>
      <button
        style={buttonStyle}
        onClick={() => {
          handleSignOut();
          onHandleClick();
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default SignOut;
