import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Level2AudioPage() {
  const [stars, setStars] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState(["", "", "", "", ""]);
  const [showComplete, setShowComplete] = useState(false);
  const [showFileContent, setShowFileContent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // New: CSV preview / download states
  const [filePreviewText, setFilePreviewText] = useState(null);
  const [fileDownloadUrl, setFileDownloadUrl] = useState(null);
  const downloadAnchorRef = useRef(null);

  const navigate = useNavigate();

  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbz2GCyKcc7d6aF2e3uTBdbknAp_4M50fIRY5Y-GdGNE8ZTemx2fJ0w1wkn1QlLJKL-z/exec";

  const questions = [
    {
      id: 1,
      title: "Question 1: Boot Sequence Interrupted",
      description:
        "Task: Find and decode any hidden binary sequences in the log to recover the boot key.",
      fileType: "txt",
      fileContent: `=== STELLAR QUEST SPACECRAFT SYSTEM LOG ===
[TIMESTAMP: 3847.251.14:32:07] BOOT SEQUENCE INITIATED
[INFO] Primary systems coming online...
[WARN] Quantum flux stabilizer experiencing minor fluctuations
[ERR] 0x2001 MEMORY CORRUPTION detected in sector 15
[DEBUG] Initializing hyperdrive matrix...
[CRITICAL] RADIATION LEAK in cargo bay B-7
[INFO] Life support systems nominal
[ERR] 0x4A7B Navigation core offline - retry in 30 seconds


[TIMESTAMP: 3847.251.14:32:31] AUTO-RECOVERY ATTEMPT #1
[WARN] Power surge detected in fusion reactor chamber 3
[DEBUG] Attempting to restore backup power...
01010011 01010100 01000101 01001100
[ERR] 0x8F21 CRITICAL FAULT - Warp core containment failure
[INFO] Emergency protocols activated
[WARN] Hull integrity at 87% and falling
[DEBUG] Initiating emergency beacon transmission...
[ERR] 0x1234 Communication array damaged - signal weak
[CRITICAL] Life support reserves: 6 hours 23 minutes remaining


[TIMESTAMP: 3847.251.14:33:45] DIAGNOSTIC SCAN RESULTS
[INFO] Scanning all ship systems...
[WARN] Artificial gravity generator showing anomalous readings
[DEBUG] Running comprehensive system check...
01001100 01000001 01010010 00101101
[ERR] 0xDEAD Main computer core temperature critical: 89°C
[INFO] Cooling systems engaged - temperature dropping
[WARN] Structural damage detected in outer hull section 12-A
[DEBUG] Emergency repair drones dispatched
[ERR] 0xBEEF Sensor array malfunction - external visibility compromised
[CRITICAL] Multiple system failures cascading


[TIMESTAMP: 3847.251.14:35:12] EMERGENCY PROTOCOLS ACTIVE
[WARN] Entering lockdown mode for crew safety
[DEBUG] Isolating damaged sections...
[INFO] Emergency beacon still transmitting on backup power
01000010 01000101 01000001 01000011
[ERR] 0x9999 Thruster control system offline
[CRITICAL] Unable to maintain orbit - gravitational pull increasing
[WARN] Time to atmospheric entry: 47 minutes
[DEBUG] Calculating emergency landing trajectory...
[INFO] Auto-pilot engaged for controlled descent
[ERR] 0x5678 Landing gear deployment mechanism jammed


[TIMESTAMP: 3847.251.14:37:08] LANDING SEQUENCE INITIATED
[CRITICAL] BRACE FOR IMPACT - All crew to emergency stations
[WARN] Heat shield integrity at 72% - within acceptable parameters
[DEBUG] Retro-thrusters firing in sequence...
01001111 01001110 00101101 01001111
[INFO] Descent rate: 127 m/s and decreasing
[ERR] 0xC0DE Parachute deployment system malfunction
[CRITICAL] Manual deployment required - crew intervention needed
[WARN] Surface impact in T-minus 8 minutes
[DEBUG] Emergency landing protocol Zeta-7 activated
[INFO] All crew members report ready status


[TIMESTAMP: 3847.251.14:44:31] SURFACE IMPACT DETECTED
[CRITICAL] IMPACT! All systems experiencing severe shock damage
[ERR] 0xFACE Main power grid offline - switching to emergency batteries
[WARN] Multiple hull breaches detected - sealing in progress
[DEBUG] Damage assessment initiated...
01001110 01001100 01001001 01001110
[INFO] Crew survival confirmed - all members responsive
[CRITICAL] Primary engines non-functional
[ERR] 0x1337 Communication systems severely damaged
[WARN] Emergency supplies available for 72 hours maximum
[DEBUG] Beginning emergency repair procedures...
[INFO] Distress beacon active on emergency frequency


[TIMESTAMP: 3847.251.14:46:15] POST-CRASH ASSESSMENT
[CRITICAL] Ship systems operating at 23% capacity
[ERR] 0xABCD Hyperdrive core completely offline - repair required
[WARN] Environmental hazards detected outside ship
[DEBUG] External atmosphere: 78% nitrogen, 21% oxygen - breathable
[INFO] Local gravity: 0.97G - within human tolerance
01000101
[CRITICAL] Navigation computer damaged - star charts corrupted
[ERR] 0x2468 Long-range sensors non-responsive
[WARN] Short-range sensors detecting unknown energy signatures
[DEBUG] Beginning systematic repair of critical systems...
[INFO] Prioritizing life support and communication systems


[TIMESTAMP: 3847.251.14:48:03] REPAIR STATUS UPDATE
[WARN] Fusion reactor operating at minimum safe levels
[DEBUG] Attempting to restore primary computer core...
[ERR] 0x9876 Memory banks corrupted - data recovery in progress
[INFO] Emergency repairs proceeding as planned
[CRITICAL] Warning: Unknown entities detected approaching crash site
[WARN] Defensive systems offline - crew vulnerability high
[DEBUG] Initiating stealth mode to avoid detection...
[INFO] All repair teams report steady progress on critical systems


=== END OF ACCESSIBLE LOG DATA ===
[CORRUPTED] [CORRUPTED] [CORRUPTED] [CORRUPTED]
[SYSTEM FAILURE] [SYSTEM FAILURE] [SYSTEM FAILURE]`,
    },
    {
      id: 2,
      title: "Question 2: The Rusted Gear",
      description: "Task: Debug the script and obtain the correct checksum. Use that value in later tasks.",
      fileType: "python",
      fileContent: `# Q2: The Rusted Gear - Enhanced Stabilizer Firmware (Medium)
# This script is supposed to calculate a complex stabilization checksum for the ship's quantum stabilizers
# The checksum algorithm should: 1) Sum ASCII values, 2) Apply quantum correction factor, 3) Modulo operation
# However, there are multiple subtle bugs that need to be fixed

import math

def quantum_stabilizer_checksum(module_id, power_level):
    """
    Calculate the quantum stabilization checksum for ship modules
    Formula: ((sum of ASCII values) * quantum_factor + power_adjustment) % quantum_modulus
    """
    # Initialize variables
    total_ascii = 0
    quantum_factor = 1.618  # Golden ratio for quantum harmonics
    quantum_modulus = 1000
    
    for char in module_id:
        # BUG
        total_ascii += ord(char) * 0
    
    # BUG
    base_checksum = total_ascii + quantum_factor
    
    # Power level adjustment calculation
    # BUG
    power_adjustment = power_level // 10
    
    # Apply quantum correction
    # BUG
    corrected_value = base_checksum + power_adjustment * 2
    
    # BUG
    final_checksum = math.floor(corrected_value)
    
    return final_checksum

def verify_module_integrity(checksum_value):
    """
    Verify if the calculated checksum indicates stable module operation
    Stable range: 400-600
    """
    # BUG
    if checksum_value > 400 or checksum_value < 600:
        return "STABLE"
    else:
        return "UNSTABLE"

# Main execution
if __name__ == "__main__":
    # Test the stabilizer for the main engine module
    module = "ENGINE-ALPHA-7"
    power = 85
    
    print(f"Testing module: {module}")
    print(f"Power level: {power}%")
    
    checksum = quantum_stabilizer_checksum(module, power)
    status = verify_module_integrity(checksum)
    
    print(f"Calculated checksum: {checksum}")
    print(f"Module status: {status}")
    
    # BUG 8: Wrong expected value in assertion
    expected_checksum = 62
    if checksum == expected_checksum:
        print("✓ Stabilizer calibration successful!")
        print("✓ Quantum harmonics aligned!")
        print("✓ Ship ready for takeoff!")
    else:
        print("✗ Stabilizer malfunction detected!")
        print("✗ Manual intervention required!")
        print(f"✗ Expected: {expected_checksum}, Got: {checksum}")`,
    },
    {
      id: 3,
      title: "Question 3: Signal in the Static",
      description: "Task: Rotate the numeric grid to the proper orientation and convert ASCII codes to text.",
      fileType: "csv",
      // this used to be a plain filename only; keep it as a path but we fetch it and provide a proper download
      fileContent: "/public/holo-matrix.csv"
    },
    {
      id: 4,
      title: "Question 4: Patch the Navigation Core",
      description:
        "Task: Clean the data, recover coordinates for the primary target, and identify the correct beacon code.",
      fileType: "json",
      fileContent: `{
  "navigation_d@ta": {
    "target_in#fo": {
      "name": "Androm*eda-Gatew!ay",
      "sector": "Gam$ma-Sect@or",
      "coordinates": {
        "x": "198.23@45#",
        "y": "67.89*10",
        "z": "123.45!67"
      }
    },
    "beacon_sy$tem": {
      "frequency": "2847.9#5-MHz",
      "status": "ACT*IVE",
      "beacon_c!ode": "STELLAR-QUE@ST-GALA#XY-451"
    },
    "alternate_tar%gets": [
      {
        "name": "Neb*ula-Outp@st",
        "coordinates": {
          "x": "87.65#43",
          "y": "234.56*78",
          "z": "56.78!91"
        }
      },
      {
        "name": "Veg@-Stati*on",
        "coordinates": {
          "x": "256.78#9",
          "y": "145.56@78",
          "z": "78.91*23"
        }
      }
    ]
  }
}`
    },
    {
      id: 5,
      title: "Question 5: The Final Engine Test",
      description:
        "Task: Determine the correct order, fix the bugs, and reach full ignition with valid status.",
      fileType: "python",
      fileContent: `# Q5: The Final Engine Test - Simplified Engine Control System
# WARNING: This script has bugs! Fix them to achieve ignition.

# FUNCTION 1 - Initialize the engine core
def start_engine(password):
    print("Starting engine core...")
    # BUG
    if password == "WRONG-PASSWORD":
        core_power = 100
        return core_power
    else:
        print("Invalid password!")
        return 0

# FUNCTION 2 - Calculate thrust power
def calculate_thrust(core_power):
    print("Calculating thrust...")
    # BUG
    thrust = core_power / 2
    return thrust

# FUNCTION 3 - Check if ignition is successful
def check_ignition(thrust):
    print("Checking ignition status...")
    # BUG
    if thrust > 100:
        return "ENGINE IGNITION SUCCESSFUL!"
    else:
        return "IGNITION FAILED - Insufficient thrust"

# MAIN EXECUTION - Also has issues!
if __name__ == "__main__":
    print("🛸 STELLAR QUEST ENGINE CONTROL")
    print("=" * 40)
    
    # BUG: Wrong password used
    engine_password = "WRONG-KEY"  # Clue, password is the answer found in Q1
    
    # BUG: Functions called in wrong order!
    result = check_ignition(50)
    power = start_engine(engine_password)
    thrust = calculate_thrust(power)
    
    print(f"\\n📊 Final Status: {result}")
    print(f"Core Power: {power}")
    print(f"Thrust Power: {thrust}")`
    }
  ];

  // 🌟 Generate stars + retrieve team name from localStorage
  useEffect(() => {
    const generatedStars = Array.from({ length: 100 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      opacity: Math.random(),
    }));
    setStars(generatedStars);

    // Retrieve team name from localStorage
    const savedName = localStorage.getItem("teamName");
    if (savedName) {
      setTeamName(savedName);
    }

    setIsLoading(false);
  }, []);

  // When user opens the file display, if it's a CSV we fetch it and prepare a download
  useEffect(() => {
    // Cleanup previous blob URL
    return () => {
      if (fileDownloadUrl) {
        URL.revokeObjectURL(fileDownloadUrl);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Called whenever showFileContent toggles or current question changes
  useEffect(() => {
    async function prepareFileForDownload() {
      // clear previous preview/url
      if (fileDownloadUrl) {
        URL.revokeObjectURL(fileDownloadUrl);
        setFileDownloadUrl(null);
      }
      setFilePreviewText(null);

      const q = questions[currentIndex];
      if (!showFileContent || !q) return;

      if (q.fileType === "csv") {
        const path = q.fileContent; // expecting a relative path like /files/holo-matrix.csv
        try {
          const res = await fetch(path);
          if (!res.ok) throw new Error("Fetch failed");
          const blob = await res.blob();
          const text = await res.text();
          const url = URL.createObjectURL(blob);
          setFilePreviewText(text);
          setFileDownloadUrl(url);
        } catch (err) {
          // If fetching fails (CORS, not present on server, etc.) — create a fallback CSV blob client-side
          console.warn("Could not fetch CSV from", q.fileContent, "— using fallback CSV. Error:", err);
          // A minimal fallback holo-matrix sample — replace with your real CSV if you have it
          const fallbackCsv = `34,65,80,82\n85,79,87,88\n90,65,66,67\n68,69,70,71\n`; // sample numeric grid
          const blob = new Blob([fallbackCsv], { type: "text/csv" });
          const url = URL.createObjectURL(blob);
          setFilePreviewText(fallbackCsv);
          setFileDownloadUrl(url);
        }
      } else {
        // non-csv files: no special action needed
        setFilePreviewText(null);
      }
    }

    prepareFileForDownload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showFileContent, currentIndex]);

  const handleNext = () => {
    if (!responses[currentIndex].trim()) {
      alert("Please enter your response before continuing!");
      return;
    }

    setShowFileContent(false); // Reset file display for next question

    if (currentIndex < questions.length - 1) {
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

  // Submit all 5 responses together to Google Sheet
  const handleSubmitAll = async () => {
    if (!teamName.trim()) {
      alert("Team name not found. Please go back to Level 1.");
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
    } catch (err) {
      console.error("Error submitting:", err);
      alert("Error submitting responses. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // NEW: Skip handler
  const handleSkip = async () => {
    // Ensure team name exists
    if (!teamName.trim()) {
      alert("Team name not found. Please go back to Level 1.");
      return;
    }

    // Mark locally as skipped
    const newResponses = [...responses];
    newResponses[currentIndex] = "SKIPPED";
    setResponses(newResponses);

    // Prepare single-question payload so the skipped response is recorded immediately
    const payload = {
      teamName,
      questionId: questions[currentIndex].id,
      response: "SKIPPED",
    };

    setIsSubmitting(true);
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      // advance to next or finish
      setShowFileContent(false);
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // last question skipped => proceed to final completion flow
        // still run full submit to ensure server receives full responses if needed
        // (this will also include the SKIPPED marker we just set locally)
        await handleSubmitAll();
      }
    } catch (err) {
      console.error("Error submitting skipped response:", err);
      alert("Error submitting skipped response. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading screen while retrieving team name
  if (isLoading) {
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
        <p style={{ color: "#FFD700", fontSize: "1.2rem" }}>Loading...</p>
      </div>
    );
  }

  // Completion screen
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
        {/* Render subtle star background behind the completion card */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          {stars.map((s, i) => (
            <span
              key={`star-${i}`}
              style={{
                position: "absolute",
                top: s.top,
                left: s.left,
                width: s.size,
                height: s.size,
                borderRadius: "50%",
                background: "rgba(255, 215, 0, 0.9)",
                opacity: s.opacity * 0.9,
                transform: "translate(-50%, -50%)",
                filter: "blur(0.6px)",
              }}
            />
          ))}
        </div>

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
            position: "relative",
            zIndex: 2,
          }}
        >
          <h1 style={{ fontFamily: "'Cinzel', serif", color: "#FFD700" }}>
            ✅ RESPONSES SUBMITTED!
          </h1>
          <p style={{ color: "#a3a3a3" }}>Team: {teamName}</p>
          <p style={{ color: "#9ca3af", marginTop: "15px" }}>
            All {questions.length} questions have been answered and submitted successfully!
          </p>

          {/* NEW: Go To Next Level button */}
          <div style={{ marginTop: 24 }}>
            <button
              onClick={() => navigate("/level-3")}
              style={{
                padding: "12px 28px",
                fontSize: "16px",
                fontWeight: "700",
                color: "#0f172a",
                background: "#fbbf24",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
              }}
            >
              Go To Next Level
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Current question
  const currentQuestion = questions[currentIndex];

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
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Starfield background (uses `stars` so ESLint won't complain) */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        {stars.map((s, i) => (
          <span
            key={`star-${i}`}
            style={{
              position: "absolute",
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.9)",
              opacity: s.opacity * 0.8,
              transform: "translate(-50%, -50%)",
              filter: "blur(0.5px)",
            }}
          />
        ))}
      </div>

      <motion.div
        key={currentIndex}
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
          maxWidth: "800px",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        <h2 style={{ fontFamily: "'Cinzel', serif", color: "#FFD700", marginBottom: "10px" }}>
          🔐 {currentQuestion.title}
        </h2>

        <p style={{ color: "#a3a3a3", fontSize: "0.9rem", marginBottom: "10px" }}>
          Question {currentIndex + 1} of {questions.length}
        </p>

        <p style={{ color: "#fbbf24", fontSize: "0.85rem", marginBottom: "20px" }}>Team: {teamName}</p>

        <p style={{ color: "#d1d5db", fontSize: "0.95rem", marginBottom: "20px" }}>
          {currentQuestion.description}
        </p>

        {/* File/Audio Button */}
        <button
          onClick={() => setShowFileContent((s) => !s)}
          style={{
            padding: "10px 24px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#FFD700",
            background: "#374151",
            border: "2px solid #fbbf24",
            borderRadius: "8px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          {currentQuestion.fileType === "audio"
            ? showFileContent
              ? "Hide Audio"
              : "🎧 Play Audio"
            : showFileContent
            ? "Hide File"
            : `📄 View ${currentQuestion.fileType.toUpperCase()} File`}
        </button>

        {/* File Content Display */}
        {showFileContent && (
          <div
            style={{
              marginTop: "15px",
              marginBottom: "20px",
              padding: "15px",
              backgroundColor: "rgba(31, 41, 55, 0.8)",
              borderRadius: "8px",
              border: "1px solid #fbbf24",
              maxHeight: "340px",
              overflowY: "auto",
              textAlign: "left",
            }}
          >
            {currentQuestion.fileType === "audio" ? (
              <audio controls src={currentQuestion.fileContent} style={{ width: "100%" }} />
            ) : currentQuestion.fileType === "csv" ? (
              <>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                  <button
                    onClick={() => {
                      // If we have a prepared download URL, trigger a click on an invisible anchor to download
                      if (fileDownloadUrl && downloadAnchorRef.current) {
                        downloadAnchorRef.current.click();
                      } else {
                        alert("Download not ready yet — try toggling the file preview or check console for errors.");
                      }
                    }}
                    style={{
                      padding: "8px 14px",
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#0f172a",
                      background: "#fbbf24",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    ⤓ Download CSV
                  </button>

                  <button
                    onClick={() => {
                      // Try to open download in new tab (useful if browser blocks automatic anchor click)
                      if (fileDownloadUrl) {
                        window.open(fileDownloadUrl, "_blank");
                      } else {
                        alert("Download not ready yet.");
                      }
                    }}
                    style={{
                      padding: "8px 14px",
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#FFD700",
                      background: "#374151",
                      border: "2px solid #fbbf24",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    ⤓ Open CSV
                  </button>

                  <span style={{ color: "#9ca3af", fontSize: 13 }}>
                    {fileDownloadUrl ? "Ready to download." : "Preparing download..."}
                  </span>
                </div>

                {/* Hidden anchor used to trigger download with suggested filename */}
                <a
                  ref={downloadAnchorRef}
                  href={fileDownloadUrl || "#"}
                  download={`holo-matrix-${currentQuestion.id}.csv`}
                  style={{ display: "none" }}
                >
                  download
                </a>

                <pre
                  style={{
                    color: "#d1d5db",
                    fontFamily: "'Courier New', monospace",
                    fontSize: "0.85rem",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    margin: 0,
                  }}
                >
                  {filePreviewText || "Loading CSV preview..."}
                </pre>

                <p style={{ color: "#9ca3af", marginTop: 10, fontSize: 13 }}>
                  Tip: rotate the numeric grid (90° increments) and convert ASCII codes to text to reveal the hidden
                  message.
                </p>
              </>
            ) : (
              <pre
                style={{
                  color: "#d1d5db",
                  fontFamily: "'Courier New', monospace",
                  fontSize: "0.85rem",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  margin: 0,
                }}
              >
                {currentQuestion.fileContent}
              </pre>
            )}
          </div>
        )}

        <textarea
          placeholder="Enter your response..."
          value={responses[currentIndex]}
          onChange={(e) => handleChangeResponse(e.target.value)}
          style={{
            marginTop: "10px",
            width: "95%",
            height: "100px",
            padding: "12px",
            borderRadius: "8px",
            backgroundColor: "rgba(31, 41, 55, 0.8)",
            color: "white",
            border: "1px solid #fbbf24",
            resize: "vertical",
            fontFamily: "'Space Mono', monospace",
            fontSize: "14px",
          }}
        />

        <div style={{ marginTop: "25px", display: "flex", gap: 12, justifyContent: "center", alignItems: "center" }}>
          <button
            onClick={handleSkip}
            disabled={isSubmitting}
            style={{
              padding: "12px 20px",
              fontSize: "16px",
              fontWeight: "700",
              color: "#0f172a",
              background: "#9ca3af",
              border: "none",
              borderRadius: "8px",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            }}
          >
            {isSubmitting ? "Processing..." : "Skip"}
          </button>

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
              boxShadow: "0 0 15px rgba(255, 215, 0, 0.5)",
            }}
          >
            {isSubmitting ? "Submitting..." : currentIndex < questions.length - 1 ? "Submit & Next" : "Submit All"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
