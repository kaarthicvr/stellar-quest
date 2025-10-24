import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const questions = [
  { id: 1, title: "Image 1", image: "/pics/stego1.png" },
  { id: 2, title: "Image 2", image: "/pics/stego2.png" },
  { id: 3, title: "Image 3", image: "/pics/stego3.png" },
  { id: 4, title: "Image 4", image: "/pics/stego4.png" },
  { id: 5, title: "Image 5", image: "/pics/stego5.png" },
  { id: 6, title: "Image 6", image: "/pics/stego6.png" },
];

const IMGBB_API_KEY = "a67e9360f111d1a86c6d090840c3b8ff";
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzM_6z5p2j_LTDNPwF-Uuho9cIuq9J1dFPQUxX3kv7oheTAKOGUv70R4qPFOz3zGnt4-Q/exec";

export default function Level3Challenge() {
  const [stars, setStars] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [file, setFile] = useState(null);
  const [answers, setAnswers] = useState(Array(6).fill(""));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);

  const teamName = localStorage.getItem("teamName") || "Anonymous";

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

  const uploadImage = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result.split(",")[1];
        try {
          const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `image=${encodeURIComponent(base64String)}`,
          });
          const data = await res.json();
          if (data && data.data && data.data.url) {
            console.log("Image uploaded successfully:", data.data.url);
            resolve(data.data.url);
          } else {
            console.error("ImgBB response:", data);
            reject("ImgBB upload failed");
          }
        } catch (err) {
          console.error("ImgBB upload error:", err);
          reject(err);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const submitToGoogleSheets = async (updatedAnswers) => {
    const payload = {
      time: new Date().toLocaleString(),
      teamName,
      answer1: updatedAnswers[0],
      answer2: updatedAnswers[1],
      answer3: updatedAnswers[2],
      answer4: updatedAnswers[3],
      answer5: updatedAnswers[4],
      answer6: updatedAnswers[5],
    };

    console.log("Payload:", payload);

    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log("Submission completed");
    setCompleted(true);
  };

  const handleNext = async () => {
    if (!file) return alert("Please select an image before proceeding");
    setIsSubmitting(true);
    try {
      const url = await uploadImage(file);
      const updatedAnswers = [...answers];
      updatedAnswers[currentQ] = url;
      setAnswers(updatedAnswers);
      setFile(null);

      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
      } else {
        await submitToGoogleSheets(updatedAnswers);
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert(`Submission failed: ${err.message || err}\n\nPlease check:\n1. API keys are correct\n2. Image size is under 16MB\n3. Google Script has correct permissions\n4. Check console for detailed errors`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = async () => {
    setIsSubmitting(true);
    try {
      const updatedAnswers = [...answers];
      updatedAnswers[currentQ] = "SKIPPED";
      setAnswers(updatedAnswers);
      setFile(null);

      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
      } else {
        await submitToGoogleSheets(updatedAnswers);
      }
    } catch (err) {
      console.error("Skip error:", err);
      alert(`Skip failed: ${err.message || err}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (completed) {
    return (
      <div style={{ width: "100vw", height: "100vh", background: "radial-gradient(circle at top, #0f172a, #000)", display: "flex", justifyContent: "center", alignItems: "center", color: "white", overflow: "hidden" }}>
        {stars.map((s, idx) => (
          <div key={idx} style={{ position: "absolute", top: s.top, left: s.left, width: s.size, height: s.size, backgroundColor: "white", borderRadius: "50%", opacity: s.opacity, animation: `twinkle ${Math.random() * 3 + 2}s infinite alternate` }} />
        ))}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} style={{ backgroundColor: "rgba(17,24,39,0.9)", padding: "40px", borderRadius: "16px", boxShadow: "0 0 40px rgba(255,215,0,0.6)", textAlign: "center", maxWidth: "600px" }}>
          <h1 style={{ color: "#FFD700", marginBottom: "20px" }}>✅ Challenge Complete!</h1>
          <p style={{ color: "#a3a3a3" }}>All images submitted successfully.</p>
          <p style={{ color: "#fbbf24" }}>Team: {teamName}</p>
        </motion.div>
        <style>{`@keyframes twinkle { from { opacity: 0.3; } to { opacity: 1; } }`}</style>
      </div>
    );
  }

  const question = questions[currentQ];

  return (
    <div style={{ width: "100vw", height: "100vh", background: "radial-gradient(circle at top, #0f172a, #000)", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", color: "white", padding: "20px", overflow: "auto" }}>
      {stars.map((s, idx) => (
        <div key={idx} style={{ position: "absolute", top: s.top, left: s.left, width: s.size, height: s.size, backgroundColor: "white", borderRadius: "50%", opacity: s.opacity, animation: `twinkle ${Math.random() * 3 + 2}s infinite alternate` }} />
      ))}

      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} style={{ backgroundColor: "rgba(17,24,39,0.9)", padding: "30px", borderRadius: "16px", boxShadow: "0 0 40px rgba(255,215,0,0.6)", textAlign: "center", width: "100%", maxWidth: "700px" }}>
        <h1 style={{ color: "#FFD700", marginBottom: "15px" }}>{question.title}</h1>
        <p style={{ color: "#a3a3a3", marginBottom: "15px" }}>Question {currentQ + 1} of {questions.length}</p>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "20px" }}>
          <a href={question.image} download>
            <img src={question.image} alt={question.title} style={{ maxWidth: "80%", height: "auto", borderRadius: "8px" }} />
          </a>
          <p style={{ color: "#fbbf24", fontSize: "0.9rem", marginTop: "8px" }}>Click image to download</p>
        </div>

        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} style={{ padding: "10px", borderRadius: "6px", backgroundColor: "#1f2937", color: "#fff", border: "1px solid #fbbf24", marginBottom: "20px", width: "100%" }} />

        <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={handleNext} disabled={isSubmitting || !file} style={{ padding: "12px 36px", fontSize: "18px", fontWeight: "bold", color: "#FFD700", background: "#6b7280", border: "2px solid #fbbf24", borderRadius: "8px", cursor: file && !isSubmitting ? "pointer" : "not-allowed", boxShadow: "0 0 15px rgba(255,215,0,0.5)", flex: "1", minWidth: "150px" }}>
            {isSubmitting ? "Submitting..." : currentQ < questions.length - 1 ? "Next Question" : "Submit All"}
          </button>

          <button onClick={handleSkip} disabled={isSubmitting} style={{ padding: "12px 36px", fontSize: "18px", fontWeight: "bold", color: "#fff", background: "#374151", border: "2px solid #6b7280", borderRadius: "8px", cursor: !isSubmitting ? "pointer" : "not-allowed", boxShadow: "0 0 15px rgba(107,114,128,0.3)", flex: "1", minWidth: "150px" }}>
            {isSubmitting ? "Skipping..." : "Skip"}
          </button>
        </div>
      </motion.div>

      <style>{`@keyframes twinkle { from { opacity: 0.3; } to { opacity: 1; } }`}</style>
    </div>
  );
}