import React from "react";
import "./styles.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="main-title">Best Elder Support Services in India</h1>

      <h2 className="subtitle">
        Comprehensive, Personalized & Proactive Support for Senior Citizens
      </h2>

      <p className="intro-text">
        <strong className="highlight">Elder Hub</strong> is a compassionate platform designed to connect <strong>senior citizens</strong> with dedicated <strong>volunteers</strong>.
        Our mission is to provide <strong>mental, physical, and emotional support</strong> to elderly individuals who need it most.
        Volunteers can respond to alerts, offer companionship, help with <strong>grocery shopping</strong>, <strong>meditation assistance</strong>, and much more.
      </p>

      <button className="support-button">Request Support Now</button>

      <div className="insights">
        <div className="stats-grid">
          <div className="stats-box"><h3>500+</h3><p>Senior Citizens Connected</p></div>
          <div className="stats-box"><h3>300+</h3><p>Active Volunteers Nationwide</p></div>
          <div className="stats-box"><h3>2000+</h3><p>Requests Fulfilled with Care</p></div>
          <div className="stats-box"><h3>50+</h3><p>Cities Covered Across India</p></div>
        </div>
      </div>

      <div className="contact-section">
        <h2>Contact Us</h2>
        <p>Email: support@elderhub.org</p>
        <p>Phone: +91 98765 43210</p>
        <p>Address: Elder Hub, Block A, Community Center, New Delhi - 110001</p>
      </div>
    </div>
  );
};

export default Home;