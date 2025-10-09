import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VideoBackgroundHome from "./VideoBackgroundHome";
import VoyagerDetails from "./VoyagerDetails";
import DecryptPage from "./DecryptPage";
import NextChallenge from "./Level-1";
import Level2Page from "./level2-home";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VideoBackgroundHome />} />
        <Route path="/voyager-details" element={<VoyagerDetails />} />
        <Route path="/decrypt" element={<DecryptPage />} />
        <Route path="/" element={<DecryptPage />} />
        <Route path="/next-challenge" element={<NextChallenge />} />
        <Route path="/level-2" element={<Level2Page />} />
        
      </Routes>
    </Router>
  );
}
