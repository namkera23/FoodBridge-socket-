import React from "react";
import { useNavigate } from "react-router-dom";
import "./Who.css";

const Who = () => {
  const navigate = useNavigate();

  const handleButtonClick = (role) => {
    if (role === "restaurant") {
      navigate("/register/hotel");
    } else if (role === "volunteer") {
      navigate("/register/volunteer");
    } else if (role === "foodbank") {
      navigate("/register/ngo");
    }
  };

  return (
    <div className="who-container">
      <h1 className="who-title">Who Are You?</h1>
      <div className="who-sections">
        <div className="who-box">
          <img className="who-img" src="/images/pic3.png" alt="Restaurant" />
          <h2>Restaurant</h2>
          <p>Donate surplus food and help reduce waste.</p>
          <button className="who-btn" onClick={() => handleButtonClick("restaurant")}>
            I'm a Restaurant
          </button>
        </div>
        <div className="who-box">
          <img className="who-img" src="/images/vol.jpg" alt="Volunteer" />
          <h2>Volunteer</h2>
          <p>Join us in distributing food to those in need.</p>
          <button className="who-btn" onClick={() => handleButtonClick("volunteer")}>
            I'm a Volunteer
          </button>
        </div>
        <div className="who-box">
          <img className="who-img" src="/images/pic5.jpg" alt="Food Bank" />
          <h2>Food Bank</h2>
          <p>Receive food donations and support communities.</p>
          <button className="who-btn" onClick={() => handleButtonClick("foodbank")}>
            I'm a Food Bank
          </button>
        </div>
      </div>
    </div>
  );
};

export default Who;