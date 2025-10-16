import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VideoBackgroundHome from "./VideoBackgroundHome";
import VoyagerDetails from "./VoyagerDetails";
import DecryptPage from "./DecryptPage";
import NextChallenge from "./Level-1";
import Level2Page from "./level2-home";
import Level2AudioPage from "./level2-questions"; // ✅ import the new audio challenge page

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VideoBackgroundHome />} />
        <Route path="/voyager-details" element={<VoyagerDetails />} />
        <Route path="/decrypt" element={<DecryptPage />} />
        <Route path="/next-challenge" element={<NextChallenge />} />
        
        {/* Level 2 Transition Page */}
        <Route path="/level-2" element={<Level2Page />} />

        {/* ✅ Level 2 Audio Challenge Page */}
        <Route path="/level-2/audio" element={<Level2AudioPage />} />
      </Routes>
    </Router>
  );
}
