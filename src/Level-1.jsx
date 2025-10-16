import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function NextChallenge() {
  const [stars, setStars] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [responses, setResponses] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [showTeamInput, setShowTeamInput] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [savedTeamName, setSavedTeamName] = useState("");
  const navigate = useNavigate();

  const questions = [
    { question: "Decrypt this Caesar cipher (shift 3): 'Khdulvfrrol'" },
    { question: "Decrypt (shift 5): 'Yjxy'" },
    { question: "Decrypt (shift 2): 'Jgct Gpfgcn'" },
    { question: "Decrypt (shift 7): 'Pualy Pz Avfctta'" },
    { question: "Decrypt (shift 4): 'Xli tperx mw hsjew'" },
  ];

  // 🌟 Generate stars + load existing team name
  useEffect(() => {
    const generatedStars = Array.from({ length: 100 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      opacity: Math.random(),
    }));
    setStars(generatedStars);

    // ✅ Retrieve team name from localStorage if exists
    const storedTeam = localStorage.getItem("teamName");
    if (storedTeam) {
      setTeamName(storedTeam);
      setSavedTeamName(storedTeam);
      setShowTeamInput(false);
    }
  }, []);

  // 🚀 Start challenge and save team name in localStorage
  const startChallenge = () => {
    if (teamName.trim()) {
      localStorage.setItem("teamName", teamName);
      setSavedTeamName(teamName);
      setShowTeamInput(false);
    }
  };

  // Submit current or skip
  const handleNext = async (skip = false) => {
    const newResponses = [...responses, skip ? "Skipped" : answer];
    setResponses(newResponses);
    setAnswer("");

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsSubmitting(true);

      const payload = {
        teamName: savedTeamName || teamName || "Anonymous",
        responses: newResponses,
      };

      try {
        await fetch(
          "https://script.google.com/macros/s/AKfycby_UrxmnvZaay5VCRWcBOEsC5XZZ25K5BkNU-M4jxufZIyoGGpYAObxpLs9Pept5dls2g/exec",
          {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );

        setShowComplete(true);
      } catch (error) {
        console.error("Error submitting:", error);
        setShowComplete(true);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // 🌠 Team Name Input Screen
  if (showTeamInput) {
    return (
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          background: "radial-gradient(circle at top, #0f172a, #000)",
          overflow: "hidden",
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
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            backgroundColor: "rgba(17, 24, 39, 0.9)",
            padding: "40px 60px",
            borderRadius: "16px",
            boxShadow: "0 0 40px rgba(255, 215, 0, 0.6)",
            textAlign: "center",
            width: "90%",
            maxWidth: "600px",
            zIndex: 10,
          }}
        >
          <h1 style={{ fontFamily: "'Cinzel', serif", color: "#FFD700", marginBottom: "20px" }}>
            🔐 DECRYPTION CHALLENGE
          </h1>

          <p style={{ marginBottom: "25px", fontSize: "1.1rem", color: "#a3a3a3" }}>
            Enter your team name to begin
          </p>

          <input
            type="text"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && startChallenge()}
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
            onClick={startChallenge}
            disabled={!teamName.trim()}
            style={{
              marginTop: "30px",
              padding: "12px 36px",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#FFD700",
              background: "#6b7280",
              border: "2px solid #fbbf24",
              borderRadius: "8px",
              cursor: teamName.trim() ? "pointer" : "not-allowed",
              transition: "transform 0.3s ease",
              boxShadow: "0 0 15px rgba(255, 215, 0, 0.5)",
            }}
          >
            Start Challenge
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

  // ✅ Completion Page
  if (showComplete) {
    return (
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          background: "radial-gradient(circle at top, #0f172a, #000)",
          overflow: "hidden",
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
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            backgroundColor: "rgba(17, 24, 39, 0.9)",
            padding: "40px 60px",
            borderRadius: "16px",
            boxShadow: "0 0 40px rgba(255, 215, 0, 0.6)",
            textAlign: "center",
            width: "90%",
            maxWidth: "600px",
            zIndex: 10,
          }}
        >
          <h1 style={{ fontFamily: "'Cinzel', serif", color: "#FFD700", marginBottom: "20px" }}>
            ✅ CHALLENGE COMPLETE!
          </h1>

          <p style={{ marginBottom: "10px", fontSize: "1.2rem", color: "#a3a3a3" }}>
            Your responses have been submitted successfully!
          </p>

          <p style={{ marginBottom: "25px", fontSize: "0.95rem", color: "#fbbf24" }}>
            Team: {savedTeamName}
          </p>

          <div style={{ textAlign: "left", marginTop: "30px", color: "#9ca3af" }}>
            <h3 style={{ color: "#FFD700", marginBottom: "15px" }}>Your Answers:</h3>
            {responses.map((resp, idx) => (
              <div key={idx} style={{ marginBottom: "10px", fontSize: "0.95rem" }}>
                <strong>Q{idx + 1}:</strong> {resp}
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("/level-2")}
            style={{
              marginTop: "30px",
              padding: "12px 36px",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#FFD700",
              background: "#6b7280",
              border: "2px solid #fbbf24",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "transform 0.3s ease",
              boxShadow: "0 0 15px rgba(255, 215, 0, 0.5)",
            }}
          >
            Next Challenge →
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

  // 🌌 Question Page
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        background: "radial-gradient(circle at top, #0f172a, #000)",
        overflow: "hidden",
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
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          backgroundColor: "rgba(17, 24, 39, 0.9)",
          padding: "40px 60px",
          borderRadius: "16px",
          boxShadow: "0 0 40px rgba(255, 215, 0, 0.6)",
          textAlign: "center",
          width: "90%",
          maxWidth: "600px",
          zIndex: 10,
        }}
      >
        <h1 style={{ fontFamily: "'Cinzel', serif", color: "#FFD700", marginBottom: "20px" }}>
          🔐 DECRYPT CHALLENGE {currentQuestion + 1} / {questions.length}
        </h1>

        <p style={{ marginBottom: "25px", fontSize: "1.2rem", color: "#a3a3a3", fontFamily: "'Space Mono', monospace" }}>
          {questions[currentQuestion].question}
        </p>

        <input
          type="text"
          placeholder="Enter your answer..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && answer && handleNext()}
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

        <div style={{ marginTop: "30px", display: "flex", gap: "20px", justifyContent: "center" }}>
          <button
            onClick={() => handleNext()}
            disabled={!answer || isSubmitting}
            style={{
              padding: "12px 36px",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#FFD700",
              background: "#6b7280",
              border: "2px solid #fbbf24",
              borderRadius: "8px",
              cursor: answer && !isSubmitting ? "pointer" : "not-allowed",
              transition: "transform 0.3s ease",
              boxShadow: "0 0 15px rgba(255, 215, 0, 0.5)",
            }}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>

          <button
            onClick={() => handleNext(true)}
            disabled={isSubmitting}
            style={{
              padding: "12px 36px",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#fff",
              background: "#374151",
              border: "2px solid #9ca3af",
              borderRadius: "8px",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              transition: "transform 0.3s ease",
            }}
          >
            Skip
          </button>
        </div>
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
