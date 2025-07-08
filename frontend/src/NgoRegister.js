import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NgoRegister = () => {
  const navigate = useNavigate();
  const [ngoDetails, setNgoDetails] = useState({
    email: "",
    password: "",
    ngoName: "",
    contact: "",
    address: "",
    registrationNo: "",
    location: { lat: "", lng: "" }, // Latitude & Longitude
  });

  const [addressSuggestions, setAddressSuggestions] = useState([]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "lat" || name === "lng") {
      setNgoDetails({
        ...ngoDetails,
        location: { ...ngoDetails.location, [name]: value },
      });
    } else {
      setNgoDetails({ ...ngoDetails, [name]: value });

      if (name === "address") {
        fetchAddressSuggestions(value);
      }
    }
  };

  // Fetch address suggestions using OpenStreetMap
  const fetchAddressSuggestions = async (query) => {
    if (query.length < 3) {
      setAddressSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=in`
      );
      setAddressSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching address suggestions:", error);
    }
  };

  // Handle address select
  const handleAddressSelect = (address) => {
    setNgoDetails({
      ...ngoDetails,
      address: address.display_name,
      location: {
        lat: parseFloat(address.lat),
        lng: parseFloat(address.lon),
      },
    });
    setAddressSuggestions([]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { ngoName, registrationNo, contact, email, password, address, location } = ngoDetails;
    const lat = parseFloat(location.lat);
    const lng = parseFloat(location.lng);

    try {
      const response = await axios.post("http://localhost:5000/register/ngo", {
        ngoName,
        registrationNo,
        contact,
        email,
        password,
        address,
        location: { lat, lng },
      });

      if (response.status === 201) {
        alert("Successful registration!");
        navigate("/login");
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={bgImage}>
      <div style={containerStyle}>
        <h2 style={titleStyle}>🌱 NGO Registration</h2>

        <form onSubmit={handleSubmit} style={formStyle}>
          <label>NGO Name:</label>
          <input
            type="text"
            name="ngoName"
            value={ngoDetails.ngoName}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <label>Registration Number:</label>
          <input
            type="text"
            name="registrationNo"
            value={ngoDetails.registrationNo}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <label>Contact Number:</label>
          <input
            type="tel"
            name="contact"
            value={ngoDetails.contact}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={ngoDetails.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={ngoDetails.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <label>Full Address:</label>
          <input
            type="text"
            name="address"
            value={ngoDetails.address}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          {/* Show address suggestions */}
          {addressSuggestions.length > 0 && (
            <ul style={suggestionsStyle}>
              {addressSuggestions.map((address, index) => (
                <li
                  key={index}
                  style={suggestionItemStyle}
                  onClick={() => handleAddressSelect(address)}
                >
                  {address.display_name}
                </li>
              ))}
            </ul>
          )}

          <button type="submit" style={buttonStyle}>Register NGO</button>
        </form>
      </div>
    </div>
  );
};

// 🌟 Background Image Style
const bgImage = {
  backgroundImage: "url('/images/regIMG4.JPG')", // Set your background image here
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

// 🌟 Glassmorphism Container Style
const containerStyle = {
  width: "500px",
  padding: "30px",
  backgroundColor: "rgba(255, 255, 255, 0.15)",
  borderRadius: "20px",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  color: "white",
  fontFamily: "Arial, sans-serif",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "20px",
  fontSize: "26px",
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

const suggestionsStyle = {
  backgroundColor: "white",
  color: "#333",
  borderRadius: "5px",
  padding: "10px",
  listStyleType: "none",
  maxHeight: "150px",
  overflowY: "auto",
  position: "absolute",
  width: "95%",
  zIndex: 10,
};

const suggestionItemStyle = {
  padding: "8px",
  cursor: "pointer",
  borderBottom: "1px solid #ddd",
  fontSize: "14px",
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

export default NgoRegister;
