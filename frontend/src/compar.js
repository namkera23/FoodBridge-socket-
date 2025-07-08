import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HotelRegister = () => {
  const [hotelDetails, setHotelDetails] = useState({
    hotel_name: "",
    foodLicense: "",
    contact: "",
    email: "",
    password:"",
    address: "",
    location: { lat: "", lng: "" }, // To store lat & lng
  });

  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const navigate = useNavigate();
  // Handle input changes
  const handleChange = (e) => {
    setHotelDetails({ ...hotelDetails, [e.target.name]: e.target.value });

    // Fetch address suggestions only for the address field
    if (e.target.name === "address") {
      fetchAddressSuggestions(e.target.value);
    }
  };

  // Fetch Indian address suggestions using OpenStreetMap's Nominatim API
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

  // Handle address selection
  const handleAddressSelect = (address) => {
    setHotelDetails({
      ...hotelDetails,
      address: address.display_name,
      location: { lat: address.lat, lng: address.lon },
    });

    setAddressSuggestions([]); // Hide suggestions after selection
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { hotel_name,foodLicense,contact, email,password,address,location: { lat, lng } } = hotelDetails;

    

    try {
      const response = await axios.post("http://localhost:5000/register/hotel", {
        hotel_name,foodLicense,contact, email,password,address,location: { lat, lng } // Send the role as part of the reques
      });

      console.log(response.data);
      const role = "hotel";
      alert("sucessful!!")
      navigate(`/login`)
    } catch (err) {
      console.error(err);
      alert("Registration failed. Please try again.",err.message);
      
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>🏨 Hotel Registeration</h2>

      <form onSubmit={handleSubmit} style={formStyle}>
        <label>Hotel Name:</label>
        <input type="text" name="hotel_name" value={hotelDetails.hotel_name} onChange={handleChange} required style={inputStyle} />

        
        <label>Food License Number:</label>
        <input type="text" name="foodLicense" value={hotelDetails.foodLicense} onChange={handleChange} required style={inputStyle} />

        <label>Contact Number:</label>
        <input type="tel" name="contact" value={hotelDetails.contact} onChange={handleChange} required style={inputStyle} />

        <label>Email:</label>
        <input type="email" name="email" value={hotelDetails.email} onChange={handleChange} required style={inputStyle} />
          
        
        <label>Password:</label>
        <input type="text" name="password" value={hotelDetails.password} onChange={handleChange} required style={inputStyle} />

        <label>Full Address:</label>
        <input type="text" name="address" value={hotelDetails.address} onChange={handleChange} required style={inputStyle} />
        

        {/* Show Address Suggestions */}
        {addressSuggestions.length > 0 && (
          <ul style={suggestionsStyle}>
            {addressSuggestions.map((address, index) => (
              <li key={index} onClick={() => handleAddressSelect(address)} style={suggestionItemStyle}>
                {address.display_name}
              </li>
            ))}
          </ul>
        )}

        <p style={{ marginTop: "10px", fontWeight: "bold" }}>
           {/* Location (Auto-filled): {hotelDetails.location.lat}, {hotelDetails.location.lng} */}
        </p>

        <button type="submit" style={buttonStyle}>Submit</button>
      </form>
    </div>
  );
};


const containerStyle = {
  maxWidth: "800px",
  margin: "40px auto",
  padding: "30px",
  backgroundColor: "#640505",
  color: "white",
  borderRadius: "10px",
  fontFamily: "Arial, sans-serif",
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "20px",
  fontSize: "24px",
  
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
  marginTop:"10px"
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
  width: "100%",
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
  border:"transparent",
  borderRadius: "5px",
  width: "100%",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
};

export default HotelRegister;
