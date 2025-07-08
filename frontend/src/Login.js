import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HotelLogin = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
    role: "hotel", // Default role
  });

  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, role } = loginDetails;
    console.log(loginDetails);

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
        role,
      });
      const id = response.data.userId;
      console.log(id);
      alert("Login Successful!");
      if (role === "hotel") {
        navigate(`/dashboard/${role}/${id}/make_request`);
      } else if (role === "ngo") {
        navigate(`/dashboard/${role}/${id}/all_requests`);
      } else if (role === "volunteer") {
        navigate(`/dashboard/volunteer/${id}/all_requests`);
      }
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div style={bgImage}>
      <div style={containerStyle}>
        <h2 style={titleStyle}>🔑 Login</h2>

        <form onSubmit={handleSubmit} style={formStyle}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={loginDetails.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={loginDetails.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <label>Role:</label>
          <select
            name="role"
            value={loginDetails.role}
            onChange={handleChange}
            style={dropdownStyle}
          >
            <option value="hotel">Hotel</option>
            <option value="volunteer">Volunteer</option>
            <option value="ngo">NGO</option>
          </select>

          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

// Styles
const bgImage = {
  backgroundImage: "url('/images/hand2.jpg')", // No /public
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  height: "100vh", // Full screen height
  width: "100vw", // Full screen width
  display: "flex", // Flexbox to center the container
  justifyContent: "center", // Center horizontally
  alignItems: "center", // Center vertically
};

const containerStyle = {
  width: "400px",
  padding: "30px",
  backgroundColor: "rgba(255, 255, 255, 0.15)", // Glass effect
  borderRadius: "20px",
  backdropFilter: "blur(10px)", // Glassmorphism blur
  WebkitBackdropFilter: "blur(10px)", // Safari support
  border: "1px solid rgba(255, 255, 255, 0.3)",
  color: "white",
  fontFamily: "Arial, sans-serif",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)", // subtle shadow
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "20px",
  fontSize: "24px",
};

const dropdownStyle = {
  width: "98%",
  padding: "12px",
  marginBottom: "20px",
  borderRadius: "5px",
  border: "1px solid #ddd",
  fontSize: "16px",
  marginTop: "10px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
};

const inputStyle = {
  width: "95%",
  padding: "12px",
  marginBottom: "20px",
  borderRadius: "5px",
  border: "1px solid #ddd",
  fontSize: "16px",
  marginTop: "10px",
};

const buttonStyle = {
  backgroundColor: "#e89309",
  color: "white",
  padding: "12px",
  border: "transparent",
  borderRadius: "5px",
  width: "100%",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
};

export default HotelLogin;
