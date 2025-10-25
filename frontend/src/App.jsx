import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Recommendation from "./pages/Recommendation";
import TryOnAvatar from "./components/TryOnAvatar";
import BodyAnalyzer from "./components/BodyAnalyzer";
import OutfitRecommendation from "./components/OutfitRecommendation";
import TrendPredictionPage from "./pages/TrendPredictionPage";
import Collection from "./pages/collection";

<Routes></Routes>
export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/style-analysis" element={<Recommendation />} />
        <Route path="/tryon" element={<TryOnAvatar />} />
        <Route path="/visual-search" element={<TryOnAvatar />} />
        <Route path="/trend-predictions" element={<TrendPredictionPage />} />
        <Route path="/collection" element={<Collection />} />


      </Routes>
    </Router>
  );
}
