// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout"; // Impor komponen Layout
import Home from "./pages/Home"; // Halaman Home
import Prediction from "./pages/Prediction"; // Halaman Prediction
import Classification from "./pages/Classification"; // Halaman Classification
import Identification from "./pages/Identification"; // Halaman Classification

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="prediction" element={<Prediction />} />{" "}
          <Route path="classification" element={<Classification />} />{" "}
          <Route path="identification" element={<Identification />} />{" "}
        </Route>
        {/* <Route path="/logout" element={<Logout />} />  */}
      </Routes>
    </Router>
  );
};

export default App;
