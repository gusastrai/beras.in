// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout"; 
import Home from "./pages/Home"; 
import Prediction from "./pages/Prediction"; 
import Classification from "./pages/Classification"; 
import Identification from "./pages/Identification"; 
import Cluster from "./pages/Cluster"; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Cluster />} />{" "}
          <Route path="prediction" element={<Prediction />} />{" "}
          <Route path="classification" element={<Classification />} />{" "}
          <Route path="identification" element={<Identification />} />{" "}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
