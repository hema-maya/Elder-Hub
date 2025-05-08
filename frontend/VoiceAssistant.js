import React, { useState, useEffect } from 'react';
import { Mic, Volume2 } from 'lucide-react';
import { useLocation } from "react-router-dom";
const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);


  useEffect(() => {
    // Automatically show the assistant after page loads
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1000); // delay 1s after load
    return () => clearTimeout(timer);
  }, []);


  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }
  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    synth.speak(utterance);
  };

  const handleGuide = () => {
    speak("Hello! I'm your voice assistant. You can say things like 'Search for volunteers', 'I need a doctor', 'Open my profile', or 'Logout'.");
  };

  const startListening = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setIsListening(false);
      handleCommand(transcript);
    };

    recognition.onerror = () => {
      speak("Sorry, I didn't catch that. Please try again.");
      setIsListening(false);
    };
  };

  const handleCommand = (command) => {
    const normalized = command.toLowerCase();
    const matchIntent = (keywords) => keywords.some(k => normalized.includes(k));

  // Emergency
  if (matchIntent(["emergency", "help me", "i need help now"])) {
    speak("Triggering emergency protocol.");
    window.location.href = "/emergency"; // your emergency route
    return;
  }

  // Request to volunteer
  else if (normalized.includes("send request to")) {
    if (!currentUser) {
      alert("You need to be logged in as an elder to send a request!");
      return;
    }
    const match = normalized.match(/send request to (.+)/);
    if (match && match[1]) {
      const name = match[1].trim();
      speak(`Sending request to ${name}.`);
  
      // Call backend or navigate to trigger request
      fetch(`/api/sendRequestVol`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ volunteerName: name }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            speak("Request sent successfully.");
          } else {
            speak("Failed to send the request. Please try again.");
          }
        })
        .catch(() => {
          speak("An error occurred while sending the request.");
        });
  
    } else {
      speak("Please mention the volunteer name.");
    }
  }

  // Join video call
  if (matchIntent(["join video call", "join call", "call doctor"])) {
    speak("Starting video call with the doctor.");
    window.location.href = "/video-call"; // your video call route
    return;
  }

    if (matchIntent(["search", "volunteer", "need help", "find someone", "nearby"])) {
      speak("Searching for nearby volunteers to help you.");
      window.location.href = "/nearby";
    } else if (matchIntent(["doctor", "medical", "counseling", "mental health", "need a doctor"])) {
      speak("Redirecting you to medical and counseling services.");
      window.location.href = "/applications";
    } else if (matchIntent(["profile", "my details", "account", "open my profile"])) {
      speak("Opening your profile.");
      window.location.href = "/profile";
    } else if (matchIntent(["insights", "statistics", "info", "progress"])) {
      speak("Opening insights page.");
      window.location.href = "/insights";
    } else if (matchIntent(["logout", "sign out", "log me out", "exit"])) {
      speak("Logging you out.");
      window.location.href = "/login";
    } else {
      speak("Sorry, I didn't understand. Please say: 'Search volunteers', 'I need a doctor', or 'Open profile'.");
    }
  };

  const buttonContainerStyle = {
    position: 'fixed',
    bottom: visible ? '20px' : '-80px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '20px',
    transition: 'bottom 0.7s ease',
    zIndex: 9999,
  };

  const buttonStyle = {
    backgroundColor: 'white',
    border: '2px solid #007bff',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
    cursor: 'pointer',
  };

  const iconStyle = {
    color: '#007bff',
    width: '28px',
    height: '28px',
  };

  const tooltipStyle = {
    position: 'absolute',
    backgroundColor: '#333',
    color: '#fff',
    padding: '6px 10px',
    borderRadius: '6px',
    fontSize: '12px',
    whiteSpace: 'nowrap',
    bottom: '70px',
    zIndex: 1001,
  };

  return (
    <div style={buttonContainerStyle}>
      {/* Mic */}
      <div style={{ position: 'relative' }}>
        <div style={tooltipStyle}>Tap to Speak</div>
        <div onClick={startListening} style={buttonStyle} title="Tap to Speak">
          <Mic style={iconStyle} />
        </div>
      </div>

      {/* Speaker Help */}
      <div style={{ position: 'relative' }}>
        <div style={tooltipStyle}>Voice Assistant Help</div>
        <div onClick={handleGuide} style={buttonStyle} title="Voice Assistant Guide">
          <Volume2 style={iconStyle} />
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;
