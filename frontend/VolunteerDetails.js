import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css";

const VolunteerDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [showRatingPopup, setShowRatingPopup] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [volunteerRating, setVolunteerRating] = useState(0);  // Add state for volunteer rating

  const { volunteer } = location.state || {};

  useEffect(() => {
    // Check if currentUser is available
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);
    const shouldRequest = localStorage.getItem("autoRequest");
      if (shouldRequest === "true") {
        localStorage.removeItem("autoRequest");
        handleRequest(); // trigger the request function
      }
    // Fetch volunteer rating from backend
    if (volunteer) {
      setVolunteerRating(volunteer.rating || 0); // Set the rating if available
    }
  }, [volunteer]);

  if (!volunteer) {
    return <p>No Volunteer Data Found</p>;
  }

  const handleRequest = async () => {
    if (!currentUser) {
      alert("You need to be logged in as an elder to send a request!");
      return;
    }

    try {
      const requestData = {
        elderId: currentUser.id,
        volunteerId: volunteer.id,
        currentStatus: "pending",
        currentLocation: currentUser.address,
      };

      const response = await axios.post("http://localhost:5000/sendRequestVol", requestData);

      if (response.status === 201) {
        alert("Request sent successfully!");
      }
    } catch (error) {
      console.error("Error sending request:", error);
      alert("Failed to send request. Please try again.");
    }
  };

  const handleRatingSubmit = async () => {
    const ratingData = {
      elderId: currentUser.id,
      volunteerId: volunteer.id,
      rating: selectedRating,
    };
  
    try {
      const response = await axios.post("http://localhost:5000/submitRating", ratingData);
      console.log("Server response:", response.data);
      if (response.status === 201) {
        alert("Rating submitted and updated successfully!");
        setShowRatingPopup(false);
        setSelectedRating(0);
      } else {
        alert("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error submitting rating:", error.response || error.message);
      alert("Failed to submit rating.");
    }
    
  };
  

  return (
    <div className="volunteer-details-page">
      <h2>{volunteer.name}</h2>
      <img
  src={volunteer.profileImage
    ? volunteer.profileImage.startsWith("http")
      ? volunteer.profileImage
      : `http://localhost:5000/${volunteer.profileImage}`
    : "/default-avatar.png"}
  alt={volunteer.name}
  className="volunteer-detail-image"
/>

      <p><strong>Age:</strong> {volunteer.age}</p>
      <p><strong>Qualification:</strong> {volunteer.qualification}</p>
      <p><strong>Skills:</strong> {Array.isArray(volunteer.hobby) ? volunteer.hobby.join(", ") : volunteer.hobby || "N/A"}</p>
      <p><strong>Email:</strong> {volunteer.email}</p>
      <p><strong>Phone:</strong> {volunteer.phone}</p>
      <p><strong>District:</strong> {volunteer.district}</p>
      <p><strong>Address:</strong> {volunteer.address}</p>
      <p><span style={{ color: 'green', fontSize: '24px' }}>&#10004;</span> Verified</p>
      {/* Rating Display */}
      <div className="rating-display">
        <h3>Rating: </h3>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className={`star ${star <= volunteerRating ? "filled" : ""}`}>
              ★
            </span>
          ))}
        </div>
      </div>

      {currentUser && (
        <div>
          <p><strong>Logged in as:</strong> {currentUser.name} ({currentUser.userType})</p>
        </div>
      )}

      {/* Request Button */}
      {currentUser ? (
        currentUser.usertype === "Senior" ? (
          <>
            <button className="request-btn" onClick={handleRequest}>Request</button>
            <button className="request-btn" onClick={() => setShowRatingPopup(true)}>Give Rating</button>
          </>
        ) : (
          <button className="request-btn" disabled>Only Elders can send a request</button>
        )
      ) : (
        <button className="request-btn" disabled>Please log in to send a request</button>
      )}

      {/* Rating Popup */}
      {showRatingPopup && (
        <div className="rating-popup-overlay">
          <div className="rating-popup-box">
            <h3>Rate {volunteer.name}</h3>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${hoverRating >= star || selectedRating >= star ? "filled" : ""}`}
                  onClick={() => setSelectedRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  ★
                </span>
              ))}
            </div>
            <button className="submit-btn" onClick={handleRatingSubmit}>Submit</button>
            <button className="cancel-btn" onClick={() => setShowRatingPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerDetails;
