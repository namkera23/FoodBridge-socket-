import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HotelRegister = () => {
  const [hotelDetails, setHotelDetails] = useState({
    hotel_name: "",
    foodLicense: "",
    contact: "",
    email: "",
    password: "",
    address: "",
    location: { lat: "", lng: "" },
  });

  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setHotelDetails({ ...hotelDetails, [e.target.name]: e.target.value });

    if (e.target.name === "address") {
      fetchAddressSuggestions(e.target.value);
    }
  };

  // Fetch suggestions for address
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

  // When user selects an address
  const handleAddressSelect = (address) => {
    setHotelDetails({
      ...hotelDetails,
      address: address.display_name,
      location: {
        lat: parseFloat(address.lat),
        lng: parseFloat(address.lon),
      },
    });
    setAddressSuggestions([]); // Clear suggestions after selecting
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { hotel_name, foodLicense, contact, email, password, address, location } = hotelDetails;

    try {
      await axios.post("http://localhost:5000/register/hotel", {
        hotel_name,
        foodLicense,
        contact,
        email,
        password,
        address,
        location: { lat: parseFloat(location.lat), lng: parseFloat(location.lng) },
      });
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={bgImage}>
      <div style={containerStyle}>
        <h2 style={titleStyle}>🏨 Hotel Registration</h2>

        <form onSubmit={handleSubmit} style={formStyle}>
          <label>Hotel Name:</label>
          <input
            type="text"
            name="hotel_name"
            value={hotelDetails.hotel_name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <label style={labelstyle}>Food License Number:</label>
          <input
            type="text"
            name="foodLicense"
            value={hotelDetails.foodLicense}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <label>Contact Number:</label>
          <input
            type="tel"
            name="contact"
            value={hotelDetails.contact}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={hotelDetails.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={hotelDetails.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <label>Full Address:</label>
          <input
            type="text"
            name="address"
            value={hotelDetails.address}
            onChange={handleChange}
            required
            style={inputStyle}
          />

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

          <button type="submit" style={buttonStyle}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

// 🌟 Background Image Style
const bgImage = {
  backgroundImage: "url('/images/regimg5.jpg')", // Change to regimg.png
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
  color: "red"
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
  marginTop: "10px",
};
const labelstyle={
  color:"red"
}

const suggestionsStyle = {
  backgroundColor: "red",
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
  border: "transparent",
  borderRadius: "5px",
  width: "100%",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
};

export default HotelRegister;
