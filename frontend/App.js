// App.js (updated with routes and context)
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Loader from './components/LoaderPage';
import Login from './components/LoginForm';
import Signup from './components/SignupForm';
import Dashboard from './components/Dashboard';
import Applications from './components/Applications';
import MedicalCounselling from "./components/MedicalCounselling";
import Insights from './components/Insights';
import Nearby from './components/Nearby';
import VolunteerDetails from "./components/VolunteerDetails";
import UserProfile from './components/Profile';
import VolunteerRequests from './components/VolunteerRequests';
import VoiceAssistant from './components/VoiceAssistant';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <Router>
      <VoiceAssistant />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />} />
        <Route path="/loader" element={<Loader />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/medical-counselling" element={<MedicalCounselling />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/nearby" element={<Nearby />} />
        <Route path="/VolunteerDetails" element={<VolunteerDetails />} />
        <Route path="/profile" element={<UserProfile user={user} />} />
        <Route path="/requests" element={<VolunteerRequests user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
