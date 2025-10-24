import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import VideoBackgroundHome from "./VideoBackgroundHome";
import VoyagerDetails from "./VoyagerDetails";
import DecryptPage from "./DecryptPage";
import NextChallenge from "./Level-1";
import Level2Page from "./level2-home";
import Level2AudioPage from "./level2-questions";

// Level 3 pages
import Level3Home from "./level3-home";
import Level3Challenge from "./Level3Challenge";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VideoBackgroundHome />} />
        <Route path="/voyager-details" element={<VoyagerDetails />} />
        <Route path="/decrypt" element={<DecryptPage />} />
        <Route path="/next-challenge" element={<NextChallenge />} />

        {/* Level 2 routes */}
        <Route path="/level-2" element={<Level2Page />} />
        <Route path="/level-2/audio" element={<Level2AudioPage />} />

        {/* Level 3 routes */}
        <Route path="/level-3" element={<Level3Home screenText="LEVEL 3 - NAVIGATOR PATH" />} />
        <Route path="/level3-challenge" element={<Level3Challenge />} />
      </Routes>
    </Router>
  );
}