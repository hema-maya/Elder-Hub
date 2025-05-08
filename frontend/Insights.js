import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const Insights = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // Simulate fetching data for insights
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setData([
        {
          title: "Volunteer Support",
          description:
            "Our volunteers are dedicated to providing assistance to the elderly in their daily lives, offering support in various forms including companionship and help with basic tasks."
        },
        {
          title: "Mental Health Support",
          description:
            "We understand the importance of mental well-being. Our program offers emotional support, professional counseling, and mental health awareness initiatives to reduce stress and anxiety."
        },
        {
          title: "Physical Health and Wellness",
          description:
            "Physical wellness is key for the elderly. We provide assistance in maintaining physical health through light exercises, physiotherapy, and health check-ups."
        },
        {
          title: "Grocery Shopping Assistance",
          description:
            "Our volunteers can help seniors with grocery shopping and ensure that they receive their essentials, offering a safe and reliable shopping experience."
        },
        {
          title: "Technology Assistance",
          description:
            "In this digital age, we help seniors stay connected by offering technology assistance. From using smartphones to social media platforms, our volunteers offer guidance to ensure a safe and enjoyable online experience."
        }
      ]);
    }, 2000); // Simulate data loading for 2 seconds
  }, []);

  return (
    <div className="insights-wrapper">
      <header className="dashboard-container">
      <div className="navbar-logo">
          <h1>Elder Hub</h1>
        </div>
        <nav>
          <ul className="navbar-links">
            <li><a onClick={() => navigate("/dashboard")}>Home</a></li>
            <li><a onClick={() => navigate("/applications")}>Applications</a></li>
            <li><a onClick={() => navigate("/insights")}>Insights</a></li>
            <li><button onClick={() => navigate("/login")}>Logout</button></li>
          </ul>
        </nav>
        
      </header>

      <main className="insights-main">
        <h2 className="insights-heading">Insights & Support Offered by Elder Hub</h2>

        {loading ? (
          <div className="loading-indicator">Loading insights...</div>
        ) : (
          <div className="insights-content">
            {data.map((item, index) => (
              <div key={index} className="insight-item">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Insights;