//Appp.js的路径：/Users/cei/newFolder/PROperty_estiMate/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PropertyList from "./pages/PropertyList";
import PropertyResult from "./pages/PropertyResult";
import Collection from "./pages/collection";
import Login from "./pages/Login_v1"; // 引入 Login
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/propertyList" element={<PropertyList />} />
        {/* <Route path="/propertyResult" element={<PropertyResult />} /> */}
        <Route
          path="/propertyResult/:postCode/:propertyLocality/:houseNumberAndStreet"
          element={<PropertyResult />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/collections" element={<Collection />} />
      </Routes>
    </Router>
  );
}

export default App;
