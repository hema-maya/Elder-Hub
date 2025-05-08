import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const Profile = () => {
  const [currentUser, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [showRatingPopup, setShowRatingPopup] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const navigate = useNavigate();

  // ✅ Load user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // ✅ Get requests sent to the volunteer
  const handleCheckRequests = async () => {
    try {
      const response = await axios.get("http://localhost:5000/requests", {
        params: { volunteerId: currentUser.id },
      });
      if (response.status === 200) {
        setRequests(response.data);
      } else {
        alert("No requests found.");
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Error response:", error.response);
        alert(`Error: ${error.response.data.message || "Failed to fetch requests."}`);
      } else if (error.request) {
        // Request was made but no response received
        console.error("Error request:", error.request);
        alert("No response received from the server.");
      } else {
        // Something else went wrong
        console.error("Error:", error.message);
        alert("Failed to fetch requests.");
      }
    }
  };
  

  // ✅ Accept or decline request
  const handleRespondToRequest = async (elder_id, status) => {
    try {
      const response = await axios.post("http://localhost:5000/respond-request", {
        elder_id,
        volunteer_id: currentUser.id,
        status,
      });
  
      if (response.status === 200) {
        alert(`Request ${status}!`);
        setRequests((prev) => prev.filter((r) => r.elder_id !== elder_id));
      } else {
        alert("Failed to update request.");
      }
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };
  
  
  // Function to send SMS to the elder
  const sendSMS = async (elder_id, status) => {
    console.log("Sending SMS to:", elder_id, "with status:", status); // Check values
  
    try {
      const response = await axios.post("http://localhost:5000/send-sms", {
        elderId: elder_id, // Ensure this matches the backend field name
        status,
      });
  
      if (response.status === 200) {
        console.log("SMS sent to elder.");
      } else {
        console.error("Failed to send SMS.");
      }
    } catch (error) {
      console.error("Error sending SMS:", error);
    }
  };
  

  // ✅ Submit rating from elder to volunteer
  const handleRatingSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/rate-volunteer", {
        elderId: currentUser.id,
        volunteerId: currentUser.id,
        rating: selectedRating,
      });
      if (response.status === 200) {
        alert("Rating submitted!");
        setShowRatingPopup(false);
        setUser((prev) => ({
          ...prev,
          rating: response.data.updatedRating,
        }));
      } else {
        alert("Failed to submit rating.");
      }
    } catch (error) {
      console.error("Rating error:", error);
      alert("Error submitting rating.");
    }
  };

  if (!currentUser) return <div className="loading">Loading Profile...</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src={`http://localhost:5000/${currentUser.profileImage }`}
          alt="Profile"
          className="profile-image"
        />
        <h2 className="profile-name">{currentUser.name}</h2>
        <p className="profile-role">{currentUser.usertype}</p>

        <div className="profile-info">
          <p><strong>Age:</strong> {currentUser.age}</p>
          <p><strong>Email:</strong> {currentUser.email}</p>
          <p><strong>District:</strong> {currentUser.district}</p>
          <p><strong>Address:</strong> {currentUser.address}</p>
          <p><strong>Username:</strong> {currentUser.username}</p>
          {currentUser.usertype === "Volunteer" && (
            <p><strong>Rating:</strong> {
              [...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  color={i < currentUser.rating ? "#ffc107" : "#e4e5e9"}
                />
              ))
            }</p>
          )}
        </div>

        <button className="btn" onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
      </div>

      {/* Volunteer Feature */}
      {currentUser.usertype === "Volunteer" && (
        <div className="requests-section">
          <button className="btn" onClick={handleCheckRequests}>Check for Requests</button>
          {requests.length > 0 ? (
            <ul className="requests-list">
              <h3>Incoming Requests:</h3>
              {requests.map((req) => (
                <li key={req.elder_id} className="request-item">
                  <p><strong>{req.elderName}</strong> from {req.elderDistrict}</p>
                  <div className="request-buttons">
                    <button className="accept-btn" onClick={() => handleRespondToRequest(req.elder_id, "accepted")}>Accept</button>
                    <button className="decline-btn" onClick={() => handleRespondToRequest(req.elder_id, "declined")}>Decline</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No new requests</p>
          )}
        </div>
      )}

      {/* Elder Feature */}
      {currentUser.usertype === "Senior" && (
        <div className="elder-actions">
          <button className="btn" onClick={() => navigate("/nearby")}>Search Nearby Volunteers</button>
          
        </div>
      )}

      {/* Rating Pop-up */}
      
    </div>
  );
};

export default Profile;
