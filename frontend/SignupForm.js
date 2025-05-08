import React, { useState } from "react";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    district: "",
    address: "",
    phone: "",
    userType: "",
    hobby: "",
    qualification: "",
    username: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newUsername = formData.username;

    // Auto-generate username based on userType + names
    if (name === "userType" && formData.firstName && formData.lastName) {
      newUsername =
        value.charAt(0).toUpperCase() +
        formData.firstName +
        formData.lastName;
    }

    if (name === "firstName" || name === "lastName") {
      if (formData.userType) {
        newUsername =
          formData.userType.charAt(0).toUpperCase() +
          (name === "firstName"
            ? value + formData.lastName
            : formData.firstName + value);
      }
    }

    setFormData({
      ...formData,
      [name]: value,
      username: newUsername,
    });
  };

  const handleFileUpload = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password Validation Regex
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

if (!passwordRegex.test(formData.password)) {
  alert(
    "Password must be at least 8 characters long, include one uppercase letter, one number, and one special character."
  );
  return;
}

if (formData.password !== formData.confirmPassword) {
  alert("Passwords do not match!");
  return;
}


    const submissionData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submissionData.append(key, value);
    });

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        body: submissionData,
      });

      if (response.ok) {
        alert("Registration Successful!");
        window.location.href = "/dashboard";
      } else {
        const message = await response.text();
        alert("Registration Failed: " + message);
      }
    } catch (error) {
      console.error("Registration Error:", error);
      alert("Something went wrong!");
    }
  };

  // ... imports and initial useState remain unchanged

return (
  <div className="auth-container">
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      {/* Move UserType select field to top */}
      <div className="form-group full-width">
        <select
          name="userType"
          value={formData.userType}
          onChange={handleChange}
          required
        >
          <option value="" disabled hidden></option>
          <option value="Volunteer">Volunteer</option>
          <option value="Senior">Senior</option>
        </select>
        <label></label>
      </div>

      <div className="form-row">
        <div className="form-group">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label>First Name</label>
        </div>

        <div className="form-group">
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label>Last Name</label>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label>Age</label>
        </div>

        <div className="form-group">
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label>District</label>
        </div>
      </div>

      <div className="form-group full-width">
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          placeholder=" "
        />
        <label>Address</label>
      </div>

      <div className="form-group full-width">
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="  "
        />
        <label>Phone Number</label>
      </div>

      <div className="form-row">
        <div className="form-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label>Email</label>
        </div>
        <div className="form-group">
          <input
            type="text"
            id="job"
            name="job"
            value={formData.job}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label>Job</label>
        </div>

      </div>

      <div className="form-group full-width">
        <input
          type="text"
          name="username"
          value={formData.username}
          readOnly
          placeholder=" "
        />
        <label>Username</label>
      </div>

      {/* Show only if user is Volunteer */}
      {formData.userType === "Volunteer" && (
        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              name="hobby"
              value={formData.hobby}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label>Hobby</label>
          </div>

          <div className="form-group">
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label>Qualification</label>
          </div>
        </div>
      )}

      <div className="form-row">
        <div className="form-group">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label>Password</label>
        </div>

        <div className="form-group">
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label>Confirm Password</label>
        </div>
      </div>

      <div className="form-group">
        <label className="upload-label">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          Upload Aadhaar Document
        </label>
        <input
          type="file"
          onChange={handleFileUpload}
          className="upload-button"
          required
        />
      </div>

      <button type="submit">Register</button>

      <p className="login-text">
        Already have an account? <a href="/login">Login</a>
      </p>
    </form>
  </div>
);

};

export default SignupForm;
