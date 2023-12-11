// Main.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; // Import Link
import NavBar from "./components/NavBar";
import LandingPage from "./components/LandingPage";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import CreateObject from "./components/CreateObject";
import ReadObject from "./components/ReadObject";
import UpdateObject from "./components/UpdateObject";
import DeleteObject from "./components/DeleteObject";

const Main = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  console.log("Rendering Main Component");

  return (
    <div>
      <NavBar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/signin"
          element={<SignIn setAuthenticated={setAuthenticated} />}
        />
        <Route path="/create" element={<CreateObject />} />
        <Route path="/read" element={<ReadObject />} />
        <Route path="/update" element={<UpdateObject />} />
        <Route path="/delete" element={<DeleteObject />} />
      </Routes>

      {/* Add a link or button to navigate to the sign-in page */}
      {/* <Link to="/signin">Sign In</Link> */}
    </div>
  );
};

export default Main;
