import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./styles.css";

import EldersImg from "../images/elders.jpg";
import OnlineClassesImg from "../images/online classes.jpg";
import Grocery from "../images/grocery.jpeg";
import Physical from "../images/physical.jpg";
import tech from "../images/tech.jpg";
import dailywellness from "../images/dailywellness.jpg";
import medicalaid from "../images/medical aid.jpeg";
import emergency from "../images/emergency.jpg";

// Features data
const supportFeatures = [
  {
    title: "Volunteer Support",
    description: "Connect with trusted volunteers for daily needs and companionship.",
    image: EldersImg,
  },
  {
    title: "Mental Health Counseling",
    description: "Access professional counseling and emotional support when needed.",
    image: OnlineClassesImg,
  },
  {
    title: "Grocery Shopping",
    description: "Volunteers help you shop for groceries and deliver essentials to your doorstep.",
    image: Grocery,
  },
  {
    title: "Physical Help & Exercise",
    description: "Engage in yoga, light workouts, or physiotherapy with the assistance of a volunteer.",
    image: Physical,
  },
  {
    title: "Tech Assistance",
    description: "Guidance on using smartphones, social media, and online services safely.",
    image: tech,
  },
  {
    title: "Daily Wellness Check-ins",
    description: "Receive simple daily check-ins to make sure everything is alright.",
    image: dailywellness,
  },
  {
    title: "Medical Aid",
    description: "Assistance with prescription refills, medical appointments, and first aid support.",
    image: medicalaid,
  },
  {
    title: "Emergency Response Support",
    description: "Immediate volunteer assistance during health or safety emergencies.",
    image: emergency,
  },
];

// Detailed bullet points for each feature
const featureDetails = {
  "Volunteer Support": [
    "Connect with local trusted volunteers.",
    "Assistance with daily chores and errands.",
    "Friendly companionship to reduce isolation.",
    "Background-checked individuals.",
    "Flexible scheduling support.",
    "Assistance with appointments.",
    "Help with shopping or bills.",
    "Multi-language volunteers available.",
    "Feedback-supported improvements.",
    "Safety-focused training for volunteers.",
  ],
  "Mental Health Counseling": [
    "Access certified professionals.",
    "Online and in-person sessions.",
    "Confidential conversations.",
    "Guidance on emotional wellbeing.",
    "24/7 helpline available.",
    "Support for anxiety and depression.",
    "Group therapy options.",
    "Specialized elder therapists.",
    "Family counseling available.",
    "Stress management strategies.",
  ],
  "Grocery Shopping": [
    "Home delivery by volunteers.",
    "Contactless handover options.",
    "Custom grocery list support.",
    "Scheduled weekly or daily service.",
    "Availability of organic products.",
    "Bill transparency ensured.",
    "Emergency grocery runs.",
    "Doorstep medicine drop available.",
    "Food storage help.",
    "Culturally appropriate food support.",
  ],
  "Physical Help & Exercise": [
    "Yoga sessions with trained guides.",
    "Daily walking companions.",
    "Post-surgery physiotherapy.",
    "Light indoor workouts.",
    "Strength and balance exercises.",
    "Personalized fitness plans.",
    "Live video coaching.",
    "Monitoring progress weekly.",
    "Doctor-approved routines.",
    "Supportive workout gear recommendations.",
  ],
  "Tech Assistance": [
    "Using smartphones easily.",
    "Safe internet browsing.",
    "Help with WhatsApp, Facebook, etc.",
    "Online appointment booking.",
    "Secure banking instructions.",
    "Video call training.",
    "Email and messaging help.",
    "Smart TV/Device setup.",
    "Password safety guidance.",
    "24/7 helpline for tech.",
  ],
  "Daily Wellness Check-ins": [
    "Daily call/message to check-in.",
    "Volunteers trained in observation.",
    "Emotional wellness check.",
    "Basic health symptom queries.",
    "Support in case of unresponsiveness.",
    "Medication reminders.",
    "Updates to family/relatives.",
    "Emergency call trigger if needed.",
    "Weekly summary to elder.",
    "Safety verification routine.",
  ],
  "Medical Aid": [
    "Prescription pickup support.",
    "Appointment scheduling help.",
    "Transportation to clinics.",
    "First aid assistance.",
    "Video consult setup.",
    "Guidance during checkups.",
    "Medical record reminders.",
    "Hospital admission help.",
    "EMR data assistance.",
    "Doctor-patient communication help.",
  ],
  "Emergency Response Support": [
    "One-click emergency button.",
    "Message/call nearby volunteers.",
    "Send location to responders.",
    "Auto-call ambulance on trigger.",
    "24/7 emergency volunteers on standby.",
    "Family notification system.",
    "In-app alert system with GPS.",
    "Back-up emergency numbers stored.",
    "Dedicated emergency line.",
    "Realtime support tracking.",
  ],
};

const Applications = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const handleMedicalCounsellingClick = () => {
    setShowModal(true);
    navigate("/medical-counselling");
  };

  {/*const handleProceed = () => {
    setShowModal(false);
    navigate("/medical-counselling");
  };*/}

  return (
    <div className="applications-container">
      <motion.h2
        className="app-heading"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Support Provided by Elder Hub
      </motion.h2>

      <div className="support-grid">
        {supportFeatures.map((feature, index) => (
          <motion.div
            className="support-card"
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            onClick={() => setSelectedFeature(feature)}
          >
            <img src={feature.image} alt={feature.title} />
            <div className="support-content">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="button-row">
        <motion.button
          className="search-button counselling-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleMedicalCounsellingClick}
        >
          Need Medical Counselling
        </motion.button>

        <motion.button
          className="search-button volunteer-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/nearby")}
        >
          Search Nearby Volunteer
        </motion.button>
      </div>

      {/* Medical counselling popup 
      {showModal && (
        <div className="modal-overlay">
          <motion.div
            className="modal-content"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="modal-heading">Connect with Doctors</h2>
            <p className="modal-text">We are here to assist you with the best medical experts.</p>
            <motion.button
              className="proceed-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleProceed}
            >
              Proceed
            </motion.button>
          </motion.div>
        </div>
      )}
        */}

      {/* Feature detail popup */}
      {selectedFeature && (
        <div className="modal-overlay">
          <motion.div
            className="modal-content"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="modal-heading">{selectedFeature.title}</h2>
            <ul className="modal-text">
              {(featureDetails[selectedFeature.title] || []).map((point, i) => (
                <li key={i}>• {point}</li>
              ))}
            </ul>

            {selectedFeature.title === "Emergency Response Support" && (
              <motion.button
                className="emergency-button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => alert("Emergency services have been notified!")}
              >
                Emergency Help
              </motion.button>
            )}

<motion.button
  className="close-button"
  whileTap={{ scale: 0.9 }}
  onClick={() => setSelectedFeature(null)}
>
  X
</motion.button>

          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Applications;
