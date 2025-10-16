import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Level2AudioPage() {
  const [stars, setStars] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [showTeamInput, setShowTeamInput] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState(["", "", "", "", ""]);
  const [showComplete, setShowComplete] = useState(false);

  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbz2GCyKcc7d6aF2e3uTBdbknAp_4M50fIRY5Y-GdGNE8ZTemx2fJ0w1wkn1QlLJKL-z/exec";

  const audios = [
    { id: 1, file: "/audios/audio1.mp3", label: "Audio Clip 1" },
    { id: 2, file: "/audios/audio2.mp3", label: "Audio Clip 2" },
    { id: 3, file: "/audios/audio3.mp3", label: "Audio Clip 3" },
    { id: 4, file: "/audios/audio4.mp3", label: "Audio Clip 4" },
    { id: 5, file: "/audios/audio5.mp3", label: "Audio Clip 5" },
  ];

  // 🌟 Generate starry background
  useEffect(() => {
    const generatedStars = Array.from({ length: 100 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      opacity: Math.random(),
    }));
    setStars(generatedStars);

    const savedName = localStorage.getItem("teamName");
    if (savedName) {
      setTeamName(savedName);
      setShowTeamInput(false);
    }
  }, []);

  const handleNext = () => {
    if (!responses[currentIndex].trim()) {
      alert("Please enter your response before continuing!");
      return;
    }

    if (currentIndex < audios.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleSubmitAll();
    }
  };

  const handleChangeResponse = (value) => {
    const newResponses = [...responses];
    newResponses[currentIndex] = value;
    setResponses(newResponses);
  };

  // ✅ Submit all 5 responses together to Google Sheet
  const handleSubmitAll = async () => {
    if (!teamName.trim()) {
      alert("Please enter your team name first!");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      teamName,
      responses,
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setShowComplete(true);
      localStorage.removeItem("teamName"); // optional reset
    } catch (err) {
      console.error("Error submitting:", err);
      alert("Error submitting responses. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🧠 Team name entry screen
  if (showTeamInput) {
    return (
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          background: "radial-gradient(circle at top, #0f172a, #000)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        {stars.map((star, idx) => (
          <div
            key={idx}
            style={{
              position: "absolute",
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              backgroundColor: "white",
              borderRadius: "50%",
              opacity: star.opacity,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite alternate`,
            }}
          />
        ))}

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          style={{
            backgroundColor: "rgba(17, 24, 39, 0.9)",
            padding: "40px 60px",
            borderRadius: "16px",
            textAlign: "center",
            boxShadow: "0 0 40px rgba(255,215,0,0.5)",
          }}
        >
          <h1 style={{ fontFamily: "'Cinzel', serif", color: "#FFD700" }}>
            🎧 LEVEL 2 — AUDIO RESPONSE
          </h1>
          <p style={{ color: "#a3a3a3" }}>Enter your team name to begin</p>

          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Team Name"
            style={{
              padding: "10px 15px",
              borderRadius: "6px",
              border: "1px solid #fbbf24",
              backgroundColor: "rgba(31, 41, 55, 0.8)",
              color: "#fff",
              fontSize: "16px",
              outline: "none",
              width: "80%",
              textAlign: "center",
              fontFamily: "'Space Mono', monospace",
            }}
          />

          <button
            onClick={() => {
              if (teamName.trim()) {
                localStorage.setItem("teamName", teamName);
                setShowTeamInput(false);
              }
            }}
            style={{
              marginTop: "25px",
              padding: "12px 36px",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#FFD700",
              background: "#6b7280",
              border: "2px solid #fbbf24",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Start
          </button>
        </motion.div>

        <style>{`
          @keyframes twinkle {
            from { opacity: 0.3; }
            to { opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  // ✅ Completion screen
  if (showComplete) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          background: "radial-gradient(circle at top, #0f172a, #000)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          style={{
            backgroundColor: "rgba(17, 24, 39, 0.9)",
            padding: "40px 60px",
            borderRadius: "16px",
            boxShadow: "0 0 40px rgba(255, 215, 0, 0.6)",
            textAlign: "center",
            width: "90%",
            maxWidth: "600px",
          }}
        >
          <h1 style={{ fontFamily: "'Cinzel', serif", color: "#FFD700" }}>
            ✅ RESPONSES SUBMITTED!
          </h1>
          <p style={{ color: "#a3a3a3" }}>Team: {teamName}</p>
        </motion.div>
      </div>
    );
  }

  // 🎧 Question screen
  const currentAudio = audios[currentIndex];

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "radial-gradient(circle at top, #0f172a, #000)",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          backgroundColor: "rgba(17, 24, 39, 0.9)",
          padding: "40px 60px",
          borderRadius: "16px",
          boxShadow: "0 0 40px rgba(255,215,0,0.5)",
          textAlign: "center",
          width: "90%",
          maxWidth: "700px",
        }}
      >
        <h2 style={{ fontFamily: "'Cinzel', serif", color: "#FFD700" }}>
          🎧 {currentAudio.label}
        </h2>

        <audio controls src={currentAudio.file} style={{ width: "100%", marginTop: "20px" }} />

        <textarea
          placeholder="Enter your response..."
          value={responses[currentIndex]}
          onChange={(e) => handleChangeResponse(e.target.value)}
          style={{
            marginTop: "25px",
            width: "100%",
            height: "90px",
            padding: "10px",
            borderRadius: "8px",
            backgroundColor: "rgba(31, 41, 55, 0.8)",
            color: "white",
            border: "1px solid #fbbf24",
            resize: "none",
            fontFamily: "'Space Mono', monospace",
          }}
        />

        <div style={{ marginTop: "25px" }}>
          <button
            onClick={handleNext}
            disabled={isSubmitting}
            style={{
              padding: "14px 48px",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#FFD700",
              background: "#6b7280",
              border: "2px solid #fbbf24",
              borderRadius: "8px",
              cursor: isSubmitting ? "not-allowed" : "pointer",
            }}
          >
            {isSubmitting
              ? "Submitting..."
              : currentIndex < audios.length - 1
              ? "Submit & Next"
              : "Submit All"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
