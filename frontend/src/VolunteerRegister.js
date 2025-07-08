import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VolunteerRegister = () => {
  const [volunteerDetails, setVolunteerDetails] = useState({
    full_name: "",
    email: "",
    password: "",
    contact_no: "",
    role: "volunteer", // Default role
    location: { latitude: null, longitude: null },
  });

  const navigate = useNavigate();

  // Fetch live location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setVolunteerDetails((prevState) => ({
            ...prevState,
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          }));
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setVolunteerDetails({ ...volunteerDetails, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", volunteerDetails);

    try {
      const response = await axios.post("http://localhost:5000/register/volunteer", {
        ...volunteerDetails,
        location: {
          type: "Point",
          coordinates: [volunteerDetails.location.longitude, volunteerDetails.location.latitude],
        },
      });

      console.log(response.data);
      alert("Volunteer registered successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Error registering volunteer:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div style={bgImage}>
      <div style={containerStyle}>
        <h2 style={titleStyle}>🧑‍🤝‍🧑 Volunteer Registration</h2>

        <form onSubmit={handleSubmit} style={formStyle}>
          <label>Name:</label>
          <input
            type="text"
            name="full_name"
            value={volunteerDetails.full_name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={volunteerDetails.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={volunteerDetails.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <label>Contact Number:</label>
          <input
            type="tel"
            name="contact_no"
            value={volunteerDetails.contact_no}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <p style={{ marginTop: "10px", fontWeight: "bold" }}>
            🌍 Live Location: {volunteerDetails.location.latitude}, {volunteerDetails.location.longitude}
          </p>

          <button type="submit" style={buttonStyle}>Register</button>
        </form>
      </div>
    </div>
  );
};

// 🌟 Background Image
const bgImage = {
  backgroundImage: "url('/images/volimg.jpg')", // Add your background image path here
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

// 🌟 Glassmorphism Container
const containerStyle = {
  width: "500px",
  padding: "30px",
  backgroundColor: "rgba(255, 255, 255, 0.15)", // Transparent glass effect
  borderRadius: "20px",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)", // Safari support
  border: "1px solid rgba(255, 255, 255, 0.3)",
  color: "white",
  fontFamily: "Arial, sans-serif",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "20px",
  fontSize: "26px",
  color:"#e89309"
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
};

const inputStyle = {
  width: "95%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "5px",
  border: "1px solid #ddd",
  fontSize: "16px",
};

const buttonStyle = {
  backgroundColor: "#e89309",
  color: "white",
  padding: "12px",
  borderRadius: "5px",
  width: "100%",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
};

export default VolunteerRegister;
