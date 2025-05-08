import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css";
import { FaMicrophone, FaPhone, FaEnvelope } from "react-icons/fa";

const Nearby = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [volunteers, setVolunteers] = useState([]);
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (currentUser?.UserType === "Volunteer") {
      alert("Only elders can access Nearby Volunteers.");
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/nearby-volunteers");
        if (response.status === 200) {
          setVolunteers(response.data);
        }
      } catch (error) {
        console.error("Error fetching volunteers:", error);
      }
    };

    fetchVolunteers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredVolunteers = searchTerm
  ? volunteers.filter((vol) =>
      vol?.district?.toLowerCase().includes(searchTerm)
    )
  : volunteers;


  const handleViewMore = (volunteer) => {
    navigate("/VolunteerDetails", { state: { volunteer } });
  };

  return (
    <div className="nearby-container">
      <div className="search-bar-wrapper">
        <input
          type="text"
          placeholder="Search volunteers by location..."
          className="styled-search-input"
          value={searchTerm}
          onChange={handleSearch}
        />
        <FaMicrophone className="mic-icon" />
      </div>

      <h2 className="volunteer-title">Meet Our Volunteers</h2>

      <div className="volunteer-grid">
        {filteredVolunteers.length > 0 ? (
          filteredVolunteers.map((vol, index) => (
            <div className="volunteer-card" key={index}>
              
              <div className="vol-info">
                <p><strong>Name:</strong> {vol.name}</p>
                <p><strong>Qualification:</strong> {vol.qualification || "N/A"}</p>
                <p><strong>Skills:</strong> {vol.hobby || "N/A"}</p>
                <p><FaPhone className="icon" /> {vol.phone || "Not Available"}</p>
                <p><FaEnvelope className="icon" /> {vol.email}</p>
                <p><strong>Location:</strong> {vol.district}</p>
                <p><span style={{ color: 'green', fontSize: '24px' }}>&#10004;</span> Verified</p>
                <button onClick={() => handleViewMore(vol)}>View More</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-volunteers-msg">No volunteers found in this location.</p>
        )}
      </div>
    </div>
  );
};

export default Nearby;
