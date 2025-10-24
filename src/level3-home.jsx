import React from "react";
import { useNavigate } from "react-router-dom";

export default function Level2Page() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "black",
      }}
    >
      {/* ✨ Static Stars */}
      {Array.from({ length: 100 }).map((_, idx) => (
        <div
          key={idx}
          style={{
            position: "absolute",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            backgroundColor: "white",
            borderRadius: "50%",
            opacity: Math.random(),
            zIndex: 1,
          }}
        />
      ))}

      {/* Center Image */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
        }}
      >
        <img
          src="/pics/level3-background.png" // Replace with your image in public folder
          alt="Galaxy"
          style={{ width: "400px", maxWidth: "90vw", borderRadius: "12px" }}
        />
      </div>

      {/* START LEVEL Button Below Image */}
      <div
        style={{
          position: "absolute",
          bottom: "60px", // 60px from the bottom
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
        }}
      >
        <button
          onClick={() => navigate("/level3-challenge")}
          style={{
            padding: "16px 48px",
            fontSize: "20px",
            fontWeight: "bold",
            letterSpacing: "0.05em",
            color: "#FFD700",
            textTransform: "uppercase",
            fontFamily: "'Cinzel', serif",
            borderRadius: "6px",
            background: "rgba(55, 65, 81, 0.8)",
            border: "2px solid #fbbf24",
            boxShadow: "0 0 15px rgba(255, 215, 0, 0.5)",
            cursor: "pointer",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          START LEVEL
        </button>
      </div>
    </div>
  );
}
