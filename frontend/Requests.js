import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Requests.css"; // we'll create this

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const volunteer = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/requests/${volunteer.id}`);
        if (response.status === 200) {
          setRequests(response.data);
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, [volunteer.id]);

  const handleAccept = async (requestId) => {
    try {
      await axios.post(`http://localhost:5000/requests/accept/${requestId}`);
      setRequests(requests.filter((req) => req._id !== requestId));
      alert("Request Accepted!");
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleDecline = async (requestId) => {
    try {
      await axios.post(`http://localhost:5000/requests/decline/${requestId}`);
      setRequests(requests.filter((req) => req._id !== requestId));
      alert("Request Declined.");
    } catch (error) {
      console.error("Error declining request:", error);
    }
  };

  return (
    <div className="requests-container">
      <h2>Incoming Requests</h2>
      {requests.length > 0 ? (
        requests.map((req) => (
          <div key={req._id} className="request-card">
            <p><strong>Elder Name:</strong> {req.elderName}</p>
            <p><strong>Current Location:</strong> {req.currentLocation}</p>
            <div className="button-group">
              <button className="accept-btn" onClick={() => handleAccept(req._id)}>Accept</button>
              <button className="decline-btn" onClick={() => handleDecline(req._id)}>Decline</button>
            </div>
          </div>
        ))
      ) : (
        <p>No incoming requests yet.</p>
      )}
    </div>
  );
};

export default Requests;
