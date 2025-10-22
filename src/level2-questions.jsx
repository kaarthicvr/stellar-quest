import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Level2AudioPage() {
  const [stars, setStars] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState(["", "", "", "", ""]);
  const [showComplete, setShowComplete] = useState(false);
  const [showFileContent, setShowFileContent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbz2GCyKcc7d6aF2e3uTBdbknAp_4M50fIRY5Y-GdGNE8ZTemx2fJ0w1wkn1QlLJKL-z/exec";

  const questions = [
    {
      id: 1,
      title: "Question 1: Boot Sequence Interrupted",
      description: "Task: Find and decode any hidden binary sequences in the log to recover the boot key.",
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
[SYSTEM FAILURE] [SYSTEM FAILURE] [SYSTEM FAILURE]`
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
    
    # BUG 1: Incorrect loop variable name
    for char in module_id:
        # BUG 2: Multiplying by 0 instead of adding
        total_ascii += ord(char) * 0
    
    # BUG 3: Wrong operator - should be multiplication
    base_checksum = total_ascii + quantum_factor
    
    # Power level adjustment calculation
    # BUG 4: Integer division instead of regular division
    power_adjustment = power_level // 10
    
    # Apply quantum correction
    # BUG 5: Missing parentheses affecting order of operations
    corrected_value = base_checksum + power_adjustment * 2
    
    # BUG 6: Using floor instead of modulo
    final_checksum = math.floor(corrected_value)
    
    return final_checksum

def verify_module_integrity(checksum_value):
    """
    Verify if the calculated checksum indicates stable module operation
    Stable range: 400-600
    """
    # BUG 7: Incorrect comparison operators
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
    expected_checksum = 0  # This should be the correct calculated value
    if checksum == expected_checksum:
        print("✓ Stabilizer calibration successful!")
        print("✓ Quantum harmonics aligned!")
        print("✓ Ship ready for takeoff!")
    else:
        print("✗ Stabilizer malfunction detected!")
        print("✗ Manual intervention required!")
        print(f"✗ Expected: {expected_checksum}, Got: {checksum}")`
    },
    {
      id: 3,
      title: "Question 3: Signal in the Static",
      description: "Task: Identify the encoding (e.g., Morse) and extract the word or phrase.",
      fileType: "audio",
      fileContent: "/audios/audio3.mp3"
    },
    {
      id: 4,
      title: "Question 4: Patch the Navigation Core",
      description: "Task: Clean the data, recover coordinates for the primary target, and identify the correct beacon code.",
      fileType: "json",
      fileContent: `{
  "nav_sys!tem": {
    "star##_map": {
      "sector_@_alpha": {
        "coord*inates": {
          "x-ax!is": "127.@45#6",
          "y-ax*is": "89$.123*4",
          "z-d!im": "34#.67@89"
        },
        "desti--nation": "Zel$eron-Pr!ime#9"
      },
      "sector$_beta": {
        "coord@@inates": {
          "x-ax#is": "256@.789",
          "y-ax!is": "145$.567*8", 
          "z-d*im": "78#.912@3"
        },
        "desti&nation": "Veg*a-St@ation-4#7"
      }
    },
    "nav_comp%uter": {
      "target#_lock": {
        "primary!_target": {
          "name@": "Androm*eda-Gate!way",
          "sec*tor": "Gam$ma-7@",
          "coord@s": {
            "x": "198&.234#5",
            "y": "67$.891*0",  
            "z": "12@3.456#7"
          }
        },
        "second%ary_target": {
          "name!": "Ne@bula-Outpo*st",
          "sec*tor": "Del#ta-3@",
          "coord$s": {
            "x": "87@.654#3",
            "y": "234$.567*8",
            "z": "56&.789@1"
          }
        }
      },
      "route*_data": {
        "jump_sequ&ence": [
          {
            "jump#_id": "001@",
            "from_coord!s": "127.456@, 89.1234#, 34.6789*",
            "to_coord$s": "198.2345&, 67.8910#, 123.4567@",
            "fuel_req*": "2350@.75#kg",
            "time_est%": "4.7@hours"
          },
          {
            "jump!_id": "002#",
            "from_coord&s": "198.2345@, 67.8910#, 123.4567*",
            "to_coord$s": "87.6543&, 234.5678#, 56.7891@",
            "fuel_req!": "1876@.23#kg", 
            "time_est*": "3.2@hours"
          }
        ]
      }
    },
    "beacon!_system": {
      "primary*_beacon": {
        "freq@uency": "2847@.95#MHz",
        "power!_level": "750@watts",
        "rang*e": "50@.7#ly",
        "status%": "ACTI*VE@",
        "beacon_cod&e": "STELL*AR-QUE@ST-GAL#AXY-451&"
      },
      "emerge#ncy_beacon": {
        "freq*uency": "9876@.54#MHz", 
        "power$_level": "120@watts",
        "rang!e": "10@.3#ly",
        "status&": "STAN*DBY@",
        "emerge#ncy_code": "SOS-RESC*UE-ALPH@A-789#"
      }
    }
  },
  "ship_reg*istry": {
    "vessel!_name": "USS-Stel*lar-Exp#lorer",
    "reg_numb&er": "NCC-2847@",
    "class!ification": "Long-Ran*ge-Explor@ation",
    "crew_cap&acity": "150@personnel",
    "launch_d$ate": "2387@.045#",
    "home_ba*se": "Earth-Sp@ace-Dock#"
  },
  "mission*_parameters": {
    "object&ive": "Locat*e-Etern@al-Starf#orge",
    "mission_cod!e": "STEL&LAR-QUE@ST-PRIM#E",
    "time_lim*it": "72@.5#hours",
    "crew_assign&ed": [
      {
        "role@": "Naviga*tor#",
        "name!": "Alex-Sta&r-Walker@",
        "id#": "NAV-001@"
      },
      {
        "role*": "Decod#er@",
        "name!": "Sam-Cyph*er-Break&er",
        "id@": "DEC-002#"
      },
      {
        "role&": "Engin*eer@",
        "name#": "Pat-Syst*em-Fix&er",
        "id!": "ENG-003@"
      }
    ]
  }
}`
    },
    {
      id: 5,
      title: "Question 5: The Final Engine Test",
      description: "Task: Determine the correct order, fix the bugs, and reach full ignition with valid status.",
      fileType: "python",
      fileContent: `# Q5: The Final Engine Test - Scrambled Engine Control System (Boss Puzzle)
# This is the engine ignition control script, but it's completely scrambled!
# Functions are out of order, variables are mixed up, and there are several bugs
# The crew must reconstruct the correct execution order and fix all issues

# WARNING: DO NOT RUN THIS SCRIPT AS-IS - IT WILL CAUSE ENGINE FAILURE!

import random
import time

# SCRAMBLED FUNCTION #1 - This should be called LAST
def display_engine_status(thrust_power, fuel_efficiency):
    if thrust_power >= 95 and fuel_efficiency >= 85:
        return "🚀 ENGINE IGNITION SUCCESSFUL! STELLAR QUEST READY FOR TAKEOFF!"
    elif thrust_power >= 75:
        return "⚠️ PARTIAL IGNITION - Manual override required"
    else:
        return "❌ ENGINE FAILURE - Critical systems offline"

# SCRAMBLED FUNCTION #2 - This has parameter bugs
def calculate_quantum_resonance(core_temp, pressure_reading):
    # BUG: Wrong mathematical formula and variable names
    resonance_freq = (core_temp - pressure_reading) / 100
    if resonance_freq < 0.5:
        return False
    else:
        return True

# SCRAMBLED FUNCTION #3 - This should be called SECOND  
def initialize_fusion_core(activation_code):
    # BUG: Wrong string comparison
    if activation_code == "STELLAR-BEACON-ONLINE":
        print("🔋 Fusion core initializing...")
        time.sleep(1)
        core_temperature = 2500  # Kelvin
        plasma_pressure = 180000  # Pascal
        return core_temperature, plasma_pressure
    else:
        # BUG: Should return None, None or raise exception
        return 0, 0

# SCRAMBLED FUNCTION #4 - This function has logical errors
def calibrate_thrust_vectors(resonance_stable, core_temp, plasma_pressure):
    if not resonance_stable:
        print("❌ Cannot calibrate - Quantum resonance unstable")
        return 0
    
    # BUG: Wrong calculation formula
    base_thrust = (core_temp + plasma_pressure) * 0.001
    
    # BUG: Incorrect efficiency calculation
    if core_temp > 2000:
        efficiency_bonus = (core_temp - 2000) / 100
    else:
        efficiency_bonus = 0
        
    # BUG: Missing safety check
    final_thrust = base_thrust + efficiency_bonus
    
    print(f"🎯 Thrust vectors calibrated: {final_thrust:.1f}% power")
    return final_thrust

# SCRAMBLED FUNCTION #5 - This should be called FIRST
def verify_startup_sequence(module_checksum):
    print("🔍 Verifying engine startup sequence...")
    
    # BUG: Wrong checksum value comparison
    expected_checksum = 437  # This should match Q2's corrected output
    
    if module_checksum == expected_checksum:
        print("✅ Startup verification complete")
        return "STELLAR-BEACON-ONLINE"
    else:
        print(f"❌ Checksum mismatch! Expected: {expected_checksum}, Got: {module_checksum}")
        return None

# SCRAMBLED FUNCTION #6 - This calculates fuel efficiency
def calculate_fuel_efficiency(thrust_power, core_temp):
    # BUG: Division by zero possible and wrong formula
    base_efficiency = (thrust_power / core_temp) * 1000
    
    # BUG: Logic error in efficiency bonus
    if thrust_power > 90:
        efficiency_multiplier = 1.2
    elif thrust_power > 70:
        efficiency_multiplier = 1.1
    else:
        efficiency_multiplier = 0.9
        
    # BUG: Efficiency can exceed 100%
    final_efficiency = base_efficiency * efficiency_multiplier
    
    print(f"⛽ Fuel efficiency calculated: {final_efficiency:.1f}%")
    return final_efficiency

# MAIN EXECUTION SEQUENCE - COMPLETELY SCRAMBLED!
if __name__ == "__main__":
    print("🛸 STELLAR QUEST ENGINE CONTROL SYSTEM v2.7")
    print("=" * 50)
    
    # BUG: Functions called in wrong order!
    
    # This should be STEP 5
    fuel_eff = calculate_fuel_efficiency(88.7, 2500)
    
    # This should be STEP 1  
    startup_code = verify_startup_sequence(62)  # BUG: Wrong checksum from Q2
    
    # This should be STEP 6
    engine_status = display_engine_status(88.7, fuel_eff)
    print(f"\\n🎯 FINAL STATUS: {engine_status}")
    
    # This should be STEP 2
    if startup_code:
        core_temp, plasma_press = initialize_fusion_core(startup_code)
    
    # This should be STEP 4
    thrust_power = calibrate_thrust_vectors(True, core_temp, plasma_press)
    
    # This should be STEP 3
    resonance_ok = calculate_quantum_resonance(core_temp, plasma_press)
    
    print(f"\\n📊 FINAL READINGS:")
    print(f"   Core Temperature: {core_temp}K")
    print(f"   Plasma Pressure: {plasma_press} Pa") 
    print(f"   Quantum Resonance: {'STABLE' if resonance_ok else 'UNSTABLE'}")
    print(f"   Thrust Power: {thrust_power:.1f}%")
    print(f"   Fuel Efficiency: {fuel_eff:.1f}%")`
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

  // ✅ Submit all 5 responses together to Google Sheet
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
          <p style={{ color: "#9ca3af", marginTop: "15px" }}>
            All {questions.length} questions have been answered and submitted successfully!
          </p>
        </motion.div>
      </div>
    );
  }

  // 🎧 Question screen
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
      }}
    >
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
        }}
      >
        <h2 style={{ fontFamily: "'Cinzel', serif", color: "#FFD700", marginBottom: "10px" }}>
          🔐 {currentQuestion.title}
        </h2>

        <p style={{ color: "#a3a3a3", fontSize: "0.9rem", marginBottom: "10px" }}>
          Question {currentIndex + 1} of {questions.length}
        </p>

        <p style={{ color: "#fbbf24", fontSize: "0.85rem", marginBottom: "20px" }}>
          Team: {teamName}
        </p>

        <p style={{ color: "#d1d5db", fontSize: "0.95rem", marginBottom: "20px" }}>
          {currentQuestion.description}
        </p>

        {/* File/Audio Button */}
        <button
          onClick={() => setShowFileContent(!showFileContent)}
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
            ? (showFileContent ? "Hide Audio" : "🎧 Play Audio")
            : (showFileContent ? "Hide File" : `📄 View ${currentQuestion.fileType.toUpperCase()} File`)}
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
              maxHeight: "300px",
              overflowY: "auto",
              textAlign: "left",
            }}
          >
            {currentQuestion.fileType === "audio" ? (
              <audio controls src={currentQuestion.fileContent} style={{ width: "100%" }} />
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
              boxShadow: "0 0 15px rgba(255, 215, 0, 0.5)",
            }}
          >
            {isSubmitting
              ? "Submitting..."
              : currentIndex < questions.length - 1
              ? "Submit & Next"
              : "Submit All"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
