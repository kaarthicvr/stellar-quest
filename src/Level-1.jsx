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
    {
      title: "Question 1: Alien Beacon Transmission",
      question: `Task:
- Identify the encoding method (binary-to-ASCII and/or Base32)
- Convert the patterns to reveal the hidden string

Binary Data:
01001011 01101111 01101100 01101100 01111001 01110111 01101111 01101111 01100100 01011111 01001010 01100101 01110011 01110101 01110011`
    },
    {
      title: "Question 2: The Shifted Cipher",
      question: `Task:
- Caesar shifted message (shift key unknown, try all shifts)

Encrypted Text:
ODWLWXGH: 75.6934`
    },
    {
      title: "Question 3: Operator Algebra Challenge",
      question: `Task:
1. Understand the custom operators:
   ⊗ means × (multiplication)
   ⊙ means XOR (bitwise exclusive OR)
2. Solve the equation step by step
3. The result is the longitude coordinate

COORDINATE CALCULATION PROTOCOL:
Custom Operators Defined: ⊗ = × (multiply), ⊙ = XOR (bitwise XOR)

Solve for X: ((85 ⊗ 5) ⊙ 140) + 421 = X
Where X represents: LONGITUDE = X / 10

VERIFY YOUR CALCULATION CAREFULLY`
    },
    {
      title: "Question 4: Linear Congruential Generator Reversal",
      question: `Task:
1. Use the LCG formula: x_{n+1} = (a × x_n + c) mod m
2. Given parameters a, c, m and three outputs, calculate the original seed x_0
3. Use modular inverse techniques to reverse the generation

PSEUDORANDOM SEQUENCE REVERSAL CHALLENGE:
LCG Parameters: a = 13, c = 7, m = 256

Three Consecutive Outputs Detected:
Output 1: 20
Output 2: 11
Output 3: 150

FORMULA: x_{n+1} = (a × x_n + c) mod m
Find the SEED (x_0) that generates this sequence.`
    },
    {
      title: "Question 5: Verification String Check",
      question: `Task:
1. Calculate the sum of ASCII values for each character in the verification string
2. Apply modulo 1000 to the sum
3. If the result matches the provided checksum, the coordinate is valid

Verification String: "STARFORGE_SECTOR_GAMMA"

Calculate: (Sum of ASCII values) mod 1000`
    },
    {
      title: "Question 6: Hexadecimal Grid Puzzle",
      question: `Task:
1. Read the grid systematically: row by row, left to right
2. Convert each 2-character hex value to its ASCII equivalent
3. Ignore any 'XX' padding values
4. Assemble the complete instruction string

Grid:
     C1   C2   C3   C4   C5
R1:  42   61   73   65   36
R2:  34   2D   52   4F   54
R3:  31   33   2D   52   65
R4:  76   65   72   73   65
R5:  54   68   65   53   74
R6:  72   69   6E   67   XX`
    },
    {
      title: "Question 7: Multi-Layer Cipher Finale (Boss)",
      question: `Task:
1. Apply multiple decryption steps in sequence:
   - Base64 decode
   - ROT13 decipher
   - Reverse the string
2. Extract the final beacon message

Encrypted Message:
LkNIWFBOTyBRUlJBIFYgLkZHRlZLUiBSVEVCUyBSVUcgLlFSWFBCWSBGUkdOQVZRRUJCUCA6UlRORkZSWiBOWlpOVCA6RUJHUFJGIHp4NDg2IDpSUEFOR0ZWUSB6MSA6R1lOIDQuMTcgOkFCWSA0Mzk2LjU3IDpHTlkgOlFSWkVWU0FCUCBGUkdOQVZRRUJCUA==`
    }
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
            maxWidth: "700px",
            maxHeight: "90vh",
            overflowY: "auto",
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
          maxWidth: "800px",
          maxHeight: "90vh",
          overflowY: "auto",
          zIndex: 10,
        }}
      >
        <h1 style={{ fontFamily: "'Cinzel', serif", color: "#FFD700", marginBottom: "15px", fontSize: "1.5rem" }}>
          🔐 {questions[currentQuestion].title}
        </h1>

        <p style={{ marginBottom: "5px", fontSize: "0.9rem", color: "#fbbf24" }}>
          Question {currentQuestion + 1} of {questions.length}
        </p>

        <div
          style={{
            marginBottom: "25px",
            fontSize: "0.95rem",
            color: "#d1d5db",
            fontFamily: "'Space Mono', monospace",
            textAlign: "left",
            whiteSpace: "pre-wrap",
            backgroundColor: "rgba(31, 41, 55, 0.5)",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #374151",
            maxHeight: "300px",
            overflowY: "auto",
          }}
        >
          {questions[currentQuestion].question}
        </div>

        <textarea
          placeholder="Enter your answer..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={4}
          style={{
            padding: "12px 15px",
            borderRadius: "6px",
            border: "1px solid #fbbf24",
            backgroundColor: "rgba(31, 41, 55, 0.8)",
            color: "#fff",
            fontSize: "16px",
            outline: "none",
            width: "90%",
            fontFamily: "'Space Mono', monospace",
            resize: "vertical",
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
