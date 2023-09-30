import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login";
import MyForm from "./register";
import Success from "./success";

function Home() {
  
  return (
    <Router>
        <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/Register" element={<MyForm/>} />
      <Route path="/" element={<Success/>} />
      </Routes>
    </Router>
  );
}

export default Home;
