import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate

export default function VoyagerDetails() {
  const [teamName, setTeamName] = useState("");
  const [voyager1, setVoyager1] = useState("");
  const [voyager2, setVoyager2] = useState("");
  const [voyager3, setVoyager3] = useState("");
  const [stars, setStars] = useState([]);

  const navigate = useNavigate(); // ✅ initialize navigate

  // Generate twinkling stars
  useEffect(() => {
    const generatedStars = Array.from({ length: 80 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      opacity: Math.random(),
    }));
    setStars(generatedStars);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { teamName, voyager1, voyager2, voyager3 };

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxLW_iUS6Qv5M3zWFn3jaS5eaWTRi2KKLHqOvAn8ZvV5PQvuSwURacuIbYfPHSqTm0FYA/exec",
        {
          method: "POST",
          body: JSON.stringify(payload),
        }
      );
      const result = await response.json();
      if (result.status === "success") {
        alert("Voyager details submitted successfully!");
        navigate("/decrypt"); // ✅ redirect to decrypt page
      } else {
        alert("Submission failed, try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting form");
    }
  };

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
        overflow: "hidden",
      }}
    >
      {/* Floating Stars */}
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

      {/* Animated Form */}
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
          color: "white",
          width: "90%",
          maxWidth: "500px",
        }}
      >
        <h1
          style={{
            fontFamily: "'Cinzel', serif",
            color: "#FFD700",
            marginBottom: "20px",
          }}
        >
          🚀 VOYAGER DETAILS
        </h1>
        <p style={{ marginBottom: "25px", color: "#a3a3a3" }}>
          Fill in the details correctly. This will be printed in the certificates.
        </p>

        <form
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Team Name *"
            required
            style={inputStyle}
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Voyager 1 - Name *"
            required
            style={inputStyle}
            value={voyager1}
            onChange={(e) => setVoyager1(e.target.value)}
          />
          <input
            type="text"
            placeholder="Voyager 2 - Name *"
            required
            style={inputStyle}
            value={voyager2}
            onChange={(e) => setVoyager2(e.target.value)}
          />
          <input
            type="text"
            placeholder="Voyager 3 - Name *"
            required
            style={inputStyle}
            value={voyager3}
            onChange={(e) => setVoyager3(e.target.value)}
          />

          <button
            type="submit"
            style={{
              marginTop: "20px",
              padding: "12px",
              backgroundColor: "#6b7280",
              border: "2px solid #fbbf24",
              color: "#FFD700",
              fontWeight: "bold",
              letterSpacing: "0.1em",
              borderRadius: "8px",
              cursor: "pointer",
              fontFamily: "'Cinzel', serif",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            Submit
          </button>
        </form>
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

const inputStyle = {
  padding: "10px 15px",
  borderRadius: "6px",
  border: "1px solid #fbbf24",
  backgroundColor: "rgba(31, 41, 55, 0.8)",
  color: "#fff",
  fontSize: "16px",
  outline: "none",
};
