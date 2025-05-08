import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const LoaderPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      navigate("/signup");
    }, 3000);
  }, [navigate]);

  return (
    <div className="loader-page">
      <div className="loader-symbol"></div>
      <h1 className="loader-text">Elder Hub</h1>
    </div>
  );
};

export default LoaderPage;