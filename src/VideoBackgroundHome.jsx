import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function VideoBackgroundHome() {
  const [videoError, setVideoError] = useState(false);
  const [stars, setStars] = useState([]);
  const navigate = useNavigate();
  const videoUrl = "/videos/1004.mp4";

  useEffect(() => {
    const generatedStars = Array.from({ length: 100 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      opacity: Math.random(),
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", background: "black" }}>
      {/* Background Video */}
      {!videoError ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 1,
          }}
          onError={() => setVideoError(true)}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom right, #1e3a8a, #581c87, #831843)",
            zIndex: 1,
          }}
        />
      )}

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
            zIndex: 3,
            animation: `twinkle ${Math.random() * 3 + 2}s infinite alternate`,
          }}
        />
      ))}

      {/* Button */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: "80px",
          zIndex: 9999,
        }}
      >
        <div style={{ marginBottom: "8px" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="gold" stroke="goldenrod" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M2 20l2-7 5 5 5-15 5 12 3-7 2 12H2z" />
          </svg>
        </div>

        <button
          style={{
            padding: "16px 48px",
            fontSize: "20px",
            fontWeight: "bold",
            letterSpacing: "0.1em",
            color: "#FFD700",
            textTransform: "uppercase",
            fontFamily: "'Cinzel', serif",
            borderRadius: "4px",
            background: "#6b7280",
            border: "2px solid #fbbf24",
            boxShadow: "0 0 15px rgba(255, 215, 0, 0.5)",
            cursor: "pointer",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          onClick={() => navigate("/voyager-details")}
        >
          START EXPLORING
        </button>
      </div>

      <style>{`
        @keyframes twinkle {
          from { opacity: 0.3; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
