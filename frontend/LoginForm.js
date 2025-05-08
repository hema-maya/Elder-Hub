import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [focused, setFocused] = useState({
    username: false,
    password: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFocus = (field) => {
    setFocused({ ...focused, [field]: true });
  };

  const handleBlur = (field) => {
    if (formData[field] === "") {
      setFocused({ ...focused, [field]: false });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        username: formData.username,
        password: formData.password,
      });

      console.log("Login response:", response);

      if (response.status === 200) {
        const userData = response.data.user;

        // 🔥 Save to localStorage with key "currentUser" (important!)
        localStorage.setItem("currentUser", JSON.stringify(userData));

        alert("Login Successful!");
        navigate("/dashboard");
      } else {
        alert("Invalid username or password.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Invalid username or password.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Login</h2>

        <div className="form-group">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onFocus={() => handleFocus("username")}
            onBlur={() => handleBlur("username")}
            required
          />
          <label className={focused.username || formData.username ? "active" : ""}>
            Username
          </label>
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onFocus={() => handleFocus("password")}
            onBlur={() => handleBlur("password")}
            required
          />
          <label className={focused.password || formData.password ? "active" : ""}>
            Password
          </label>
        </div>

        <button type="submit">Login</button>

        <p className="auth-footer">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
