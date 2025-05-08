import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VoiceAssistant from './VoiceAssistant'; // 👈 Add this line

import "./styles.css";
import eldersImg from "../images/elders.jpg";
import daily from "../images/dailywellness.jpg";
import grocery from "../images/grocery.jpeg";
import physical from "../images/physical.jpg";
const DashboardPage = () => {
  const navigate = useNavigate();
  const [showFeatures, setShowFeatures] = useState(false);
  const [userProfileImage, setUserProfileImage] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.ProfileImage) {
      const imageUrl = user.ProfileImage.includes("uploads")
        ? `http://localhost:5000/${user.ProfileImage}`
        : user.ProfileImage;
      setUserProfileImage(imageUrl);
    }
  }, []);

  const handleGetStarted = () => {
    setShowFeatures(true);
    setTimeout(() => {
      const featureSection = document.getElementById("feature-section");
      if (featureSection) {
        featureSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="dashboard-container no-scrollbar">
      {/* Header */}
      <header className="navbar small-header">
        <div className="navbar-logo">
          <h1>Elder Hub</h1>
        </div>
        <nav>
          <ul className="navbar-links">
            <li><a href="#home">Home</a></li>
            <li><a onClick={() => navigate("/applications")}>Applications</a></li>
            <li><a onClick={() => navigate("/insights")}>Insights</a></li>
            <li><button onClick={() => navigate("/login")}>Logout</button></li>
          </ul>
        </nav>
        <div className="profile-avatar">
          <img
            src={userProfileImage || "../images/elders.jpg"}
            alt="Profile"
            onClick={() => navigate("/profile")}
          />
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section" id="home">
        <div className="hero-overlay animate__animated animate__fadeInDown">
          <h2>Welcome to <span className="highlight">Elder Hub</span></h2>
          <p>Connecting elders with volunteers for a better tomorrow.</p>
          <button className="get-started-btn" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </section>

      {/* Feature Section */}
      {showFeatures && (
        <section className="feature-section animate__animated animate__fadeInUp" id="feature-section">
          <h2>Our Services</h2>
          <div className="feature-cards">
            <div className="feature-card">
              <div className="card-image">
                <img src={daily} alt="Healthcare Assistance" />
              </div>
              <div className="card-text">
                <h3>Healthcare Assistance</h3>
                <ul>
                  <li>Access to medical support</li>
                  <li>In-home healthcare assistance</li>
                  <li>Scheduled doctor visits</li>
                </ul>
                <button onClick={() => navigate("/nearby")}>Search Volunteers</button>
              </div>
            </div>

            <div className="feature-card reverse">
              <div className="card-image">
                <img src={physical} alt="Companionship" />
              </div>
              <div className="card-text">
                <h3>Companionship</h3>
                <ul>
                  <li>Quality time with volunteers</li>
                  <li>Emotional support</li>
                  <li>Group activities and events</li>
                </ul>
                <button onClick={() => navigate("/nearby")}>Find a Companion</button>
              </div>
            </div>

            <div className="feature-card">
              <div className="card-image">
                <img src={grocery} alt="Errand Support" />
              </div>
              <div className="card-text">
                <h3>Errand Support</h3>
                <ul>
                  <li>Help with shopping</li>
                  <li>Errands for everyday tasks</li>
                  <li>Transportation assistance</li>
                </ul>
                <button onClick={() => navigate("/nearby")}>Request Help</button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Elder Hub. All rights reserved.</p>
      </footer>
      <VoiceAssistant />
    </div>
  );
};

export default DashboardPage;
