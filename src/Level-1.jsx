import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function NextChallenge() {
  const [stars, setStars] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [responses, setResponses] = useState([]);
  const navigate = useNavigate();

  const questions = [
    { question: "Decrypt this Caesar cipher (shift 3): 'Khdulvfrrol'" },
    { question: "Decrypt (shift 5): 'Yjxy'" },
    { question: "Decrypt (shift 2): 'Jgct Gpfgcn'" },
    { question: "Decrypt (shift 7): 'Pualy Pz Avfclla'" },
    { question: "Decrypt (shift 4): 'Xli tperx mw hsjew'" },
  ];

  // Generate stars
  useEffect(() => {
    const generatedStars = Array.from({ length: 100 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      opacity: Math.random(),
    }));
    setStars(generatedStars);
  }, []);

  // Handle Next / Skip
  const handleNext = async (skip = false) => {
    const newResponses = [...responses, skip ? "Skipped" : answer];
    setResponses(newResponses);
    setAnswer("");

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Send final responses to Google Sheet
      const payload = {
        teamName: localStorage.getItem("teamName") || "Anonymous",
        responses: newResponses,
      };

      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbwAHeKQqR0Wa-s3MJzlk4PD6oZMxTziA86HuaeBS4_uZd4s5buzjLSle1r4RxqmSNF1/exec",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );

        const result = await response.json();

        if (result.status === "success") {
          alert("Responses saved successfully!");
        } else {
          alert("Error saving responses. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting:", error);
        alert("Network or script error occurred.");
      }

      navigate("/decryption-complete", { state: { responses: newResponses } });
    }
  };

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
      {/* Stars */}
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

      {/* Challenge Box */}
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
        <h1
          style={{
            fontFamily: "'Cinzel', serif",
            color: "#FFD700",
            marginBottom: "20px",
          }}
        >
          🔐 DECRYPT CHALLENGE {currentQuestion + 1}
        </h1>

        <p
          style={{
            marginBottom: "25px",
            fontSize: "1.2rem",
            color: "#a3a3a3",
            fontFamily: "'Space Mono', monospace",
          }}
        >
          {questions[currentQuestion].question}
        </p>

        <input
          type="text"
          placeholder="Enter your answer..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
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

        <div
          style={{
            marginTop: "30px",
            display: "flex",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => handleNext()}
            disabled={!answer}
            style={{
              padding: "12px 36px",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#FFD700",
              background: "#6b7280",
              border: "2px solid #fbbf24",
              borderRadius: "8px",
              cursor: answer ? "pointer" : "not-allowed",
              transition: "transform 0.3s ease",
              boxShadow: "0 0 15px rgba(255, 215, 0, 0.5)",
            }}
            onMouseEnter={(e) => answer && (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            Submit
          </button>

          <button
            onClick={() => handleNext(true)}
            style={{
              padding: "12px 36px",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#fff",
              background: "#374151",
              border: "2px solid #9ca3af",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
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
