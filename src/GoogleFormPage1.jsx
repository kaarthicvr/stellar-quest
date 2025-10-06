import React from "react";

export default function GoogleFormPage() {
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
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            backgroundColor: "white",
            borderRadius: "50%",
            opacity: Math.random(),
            animation: `twinkle ${Math.random() * 3 + 2}s infinite alternate`,
          }}
        />
      ))}

      {/* Google Form */}
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSeGFVZviEAqV0ATRHW8iDmMoRX2SZUVJGsDC7rIowQqKaDsRw/viewform?usp=dialog"
        width="600"
        height="600"
        style={{
          border: "none",
          borderRadius: "12px",
          boxShadow: "0 0 40px rgba(255, 215, 0, 0.6)",
          backgroundColor: "#111827",
          animation: "slideUp 1s ease-out",
        }}
      ></iframe>

      <style>{`
        @keyframes twinkle {
          from { opacity: 0.3; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
