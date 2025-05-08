import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

const MedicalCounselling = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [requestStatus, setRequestStatus] = useState("");
  const [messageMap, setMessageMap] = useState({});

  const elderName = localStorage.getItem("username") || "Elder";

  const handleFetchDoctors = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/getDoctors");
      setDoctors(res.data);
    } catch (err) {
      console.error("Error fetching doctors:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendRequest = async (doctorPhone, docId) => {
    const message = messageMap[docId] || "";
    if (!message.trim()) {
      setRequestStatus("Please enter a message before sending.");
      setTimeout(() => setRequestStatus(""), 3000);
      return;
    }
    try {
      await axios.post("http://localhost:5000/sendRequest", {
        doctorPhone,
        elderName,
        message,
      });
      setRequestStatus(`Request sent successfully to doctor.`);
      setTimeout(() => setRequestStatus(""), 3000);
    } catch (err) {
      console.error("Error sending SMS:", err);
      setRequestStatus("Failed to send the request.");
      setTimeout(() => setRequestStatus(""), 3000);
    }
  };

  const handleMessageChange = (e, docId) => {
    setMessageMap((prev) => ({
      ...prev,
      [docId]: e.target.value,
    }));
  };

  return (
    <div className="medical-container">
      <h2 className="medical-heading">Need Medical Counselling?</h2>

      <button
        onClick={handleFetchDoctors}
        className="fetch-doctors-button"
      >
        {loading ? "Loading Doctors..." : "Click to Connect with Doctors"}
      </button>

      {requestStatus && (
        <div className="request-status">{requestStatus}</div>
      )}

      <div className="doctor-cards-grid">
        {doctors.map((doc) => (
          <div key={doc.id} className="doctor-card">
            <h3 className="doctor-name">{doc.name}</h3>
            <p className="doctor-info">Email: {doc.email}</p>
            <p className="doctor-info">Phone: {doc.phone}</p>

            <a
              href={doc.meeting_link}
              target="_blank"
              rel="noopener noreferrer"
              className="video-call-link"
            >
              Join Video Call
            </a>

            <textarea
              placeholder="Type your message here..."
              value={messageMap[doc.id] || ""}
              onChange={(e) => handleMessageChange(e, doc.id)}
              className="message-textarea"
            />

            <button
              onClick={() => handleSendRequest(doc.phone, doc.id)}
              className="send-request-button"
            >
              Send Request
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalCounselling;
