import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { NotificationContext } from "./NotificationContext";
import { SocketContext } from "./SocketContext";
import "./hosp1.css"; // We'll fix styles here too

const HotelDashboard = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const socket = useContext(SocketContext);

  const [foodName, setFoodName] = useState("");
  const [foodQuantity, setFoodQuantity] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { notifications, setNotifications } = useContext(NotificationContext);

  useEffect(() => {
    console.log("Hotel ID:", hotelId);

    socket.on("connect", () => {
      console.log("Connected to socket:", socket.id);
      socket.emit("join", hotelId);
    });

    socket.on("notification", (data) => {
      alert(`🔔 ${data.message}`);
      console.log("✅ Notification received:", data);
      setNotifications((prev) => [...prev, data]);
    });

    return () => {
      socket.off("notification");
    };
  }, [hotelId, socket]);

  const handleNotify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const requestData = {
        food_name: foodName,
        food_quantity: foodQuantity,
        pickup_time: pickupTime,
        hotel_id: hotelId,
      };

      const response = await axios.post(
        `http://localhost:5000/dashboard/hotel/${hotelId}/make_request`,
        requestData
      );

      socket.emit("new_food_request", requestData);

      setMessage(response.data.message);
      setFoodName("");
      setFoodQuantity("");
      setPickupTime("");
    } catch (error) {
      console.error(error.response?.data || error.message);
      setMessage("Error sending request. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <div className="navbar">
        <div className="logo-section">
          <img src="/images/logo.png" alt="Foodbridge logo" className="logo-img" />
          <h1>Foodbridge Dashboard</h1>
        </div>
        <div className="navbar-actions">
          <input type="text" placeholder="Search..." className="search-input" />
          <div className="account-section">
            <img src="/images/profile.png" alt="Profile" className="profile-img" />
            <select
              className="account-dropdown"
              onChange={(e) => e.target.value === "logout" && logout()}
            >
              <option value="">Account</option>
              <option value="logout">Logout</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="sidebar">
        <ul>
          <li onClick={() => navigate(`/dashboard/hotel/${hotelId}`)}>
            <img src="/images/home.png" alt="Home" className="sidebar-icon" />
            Home
          </li>
          <li onClick={() => navigate(`/dashboard/hotel/${hotelId}/notifications`)}>
            <img src="/images/connection.png" alt="Notifications" className="sidebar-icon" />
            Notifications
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <form className="notify-form" onSubmit={handleNotify}>
          <h2>Want to notify?</h2>
          <label>Food type</label>
          <input
            type="text"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            required
          />
          <label>Food quantity</label>
          <input
            type="number"
            min="1"
            value={foodQuantity}
            onChange={(e) => setFoodQuantity(e.target.value)}
            required
          />
          <label>Pick-up time</label>
          <input
            type="text"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Notifying..." : "Notify"}
          </button>
          {message && <p className="message">{message}</p>}
        </form>

        <div className="notifications-section">
          <h3>Recent Notifications</h3>
          <ul>
            {notifications.map((n, idx) => (
              <li key={idx}>{n.message}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HotelDashboard;
