import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import HomePage from "./pages/HomePage";


function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

      </Routes>
    </Router>
  );
}

export default App;
