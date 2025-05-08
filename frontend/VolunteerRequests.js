import React, { useState, useEffect } from "react";
import "./styles.css";

const VolunteerRequests = () => {
  const [request, setRequest] = useState(null);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const req = localStorage.getItem("pendingRequest");
    if (req) {
      setRequest(JSON.parse(req));
    }
  }, []);

  const handleAccept = () => {
    setAccepted(true);
    alert("You have accepted the request. Elder's location is now visible.");
  };

  const handleDecline = () => {
    localStorage.removeItem("pendingRequest");
    setRequest(null);
    setAccepted(false);
    alert("Request declined.");
  };

  if (!request) {
    return <h2 className="no-request">No new requests yet!</h2>;
  }

  return (
    <div className="volunteer-detail-container">
      <h2>Request from Elder</h2>
      <img src={request.profileImage} alt={request.name} className="detail-img" />
      <p><strong>Name:</strong> {request.name}</p>
      <p><strong>Skills Requested:</strong> {request.skills.join(", ")}</p>

      {!accepted ? (
        <>
          <button className="request-btn" onClick={handleAccept}>Accept</button>
          <button className="emergency-btn" onClick={handleDecline}>Decline</button>
        </>
      ) : (
        <>
          <h3 style={{ marginTop: '20px' }}>Elder's Location</h3>
          <p><strong>Address:</strong> 123 Elder Lane, Sunshine Nagar</p>
          <p><strong>District:</strong> Harmony District</p>
        </>
      )}
    </div>
  );
};

export default VolunteerRequests;
