import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VideoBackgroundHome from "./VideoBackgroundHome";
import VoyagerDetails from "./VoyagerDetails";
import DecryptPage from "./DecryptPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VideoBackgroundHome />} />
        <Route path="/voyager-details" element={<VoyagerDetails />} />
        <Route path="/decrypt" element={<DecryptPage />} />
        
      </Routes>
    </Router>
  );
}
