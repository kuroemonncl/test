import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import LandingPage from "./components/LandingPage";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import CreateObject from "./components/CreateObject";
import ReadObject from "./components/ReadObject";
import UpdateObject from "./components/UpdateObject";
import DeleteObject from "./components/DeleteObject";
import UserList from "./components/UserList";
import MyProfile from "./components/MyProfile";

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  console.log("Rendering Main Component");

  const onHandleDelete = () => {
    window.location.reload();
  };

  return (
    <Router>
      <NavBar isAuthenticated={isAuthenticated} onDelete={onHandleDelete} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signout" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/signin"
          element={<SignIn setAuthenticated={setAuthenticated} />}
        />
        <Route path="/create" element={<CreateObject />} />
        <Route path="/read" element={<ReadObject />} />
        <Route path="/update" element={<UpdateObject />} />
        <Route path="/delete" element={<DeleteObject />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/myprofile" element={<MyProfile handleDelete={onHandleDelete} />} />
      </Routes>

    </Router>
  );
}

export default App;
