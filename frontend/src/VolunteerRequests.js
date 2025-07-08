
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

// initialize socket connection (ensure only one instance is created)
const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  withCredentials: true,
});




const VolunteerRequests = () => {
    

    const { volunteerId } = useParams();
    const [requests, setRequests] = useState([]);
    const [buttonStates, setButtonStates] = useState({}); // Store both text and color

    useEffect(() => {
        fetchRequests();
    }, []);

    useEffect(() => {
        const watcher = navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        socket.emit("volunteerLocation", {
            volunteerId,
            latitude,
            longitude
        });
  });

  return () => navigator.geolocation.clearWatch(watcher);
}, [volunteerId]);

    // Fetch all requests for the NGO
    const fetchRequests = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/dashboard/volunteer/${volunteerId}/all_requests`);
            setRequests(response.data.requests);

            // Initialize button states dynamically
            const initialButtonStates = {};
            response.data.requests.forEach(request => {
                initialButtonStates[request._id] = { text: "Accept", color: "#4CAF50" }; // Green for Accept
            });
            setButtonStates(initialButtonStates);
        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    };

    const handleRequest = async (id) => {

        const requestData = requests.find(req => req._id === id);
    const ngoId = requestData.assign_ngoId._id;  
    setButtonStates((prevStates) => ({
        ...prevStates,
        [id]: {
            text: prevStates[id].text === "Accept" ? "Pending" : "Accept",
            color: prevStates[id].text === "Accept" ? "#FFA500" : "#4CAF50",
        }
    }));

    try {
        const response = await fetch(`http://localhost:5000/requests/${id}/accept`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                volunteerId: volunteerId,
                ngoId  :ngoId         // ✅ Include this only if your backend expects it too
            })
        });

        const data = await response.json();
        alert(data.message);

        // 🔔 Emit socket event to notify NGO and Hotel
        socket.emit("volunteerAccepted", {
            requestId: id,
            volunteerId
        });

    } catch (error) {
        console.error("Error accepting request:", error);
    }
};


    const logout = () => {
        window.location.href = '/login'; // Adjust the path as needed
    }

    return (
        <div>
            <div className="search-bar">
                <div className="logo">
                    <img className="img-logo" src="/images/Screenshot_2024-09-24_210649-removebg-preview.png" alt="QuickSend logo" />
                    <h1 className="Foodbridge">FoodBridge</h1>
                </div>
                <div className="search-head">
                    <div className="account">
                        <img className="login-top" src="/images/account-removebg-preview.png" alt="Login" />
                        <select
                            className='logout-option'
                            onChange={(e) => {
                                if (e.target.value === 'logout') {
                                logout();
                                }
                            }}
                        ><option value=''>Account</option>
                        <option value='logout'>Logout</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="sidebar">
                <ul className="sidebar-menu">
                    <div className="dashboard">
                        <img className="dashboardimg" src="/images/dashboard.png" alt="Dashboard" />
                        <li className="li-outer">Dashboard</li>
                    </div>

                    <div className="dashboard">
                        <img className="templateimg" src="/images/home.png" alt="Template" />
                        <li className="li-outer" style={{ cursor: "pointer" }}>Home</li>
                    </div>

                    <div className="dashboard">
                        <img className="campaignimg" src="/images/campaign-removebg-preview (1).png" alt="Campaign" />
                        <li className="li-outer" style={{ cursor: "pointer" }}>Connection</li>
                    </div>
                </ul>
            </div>

            <h1 className="register">Your Connections!</h1>
            <div className="request-list">
                {requests.length === 0 ? (
                    <p>No food requests available.</p>
                ) : (
                    requests.map((request) => (
                        <div key={request._id} className="request-card">
                            <h2><strong>Hotel:</strong> {request.hotelId.hotel_name}</h2>
                            <p><strong>Food Name:</strong> {request.food_name}</p>
                            <p><strong>Quantity:</strong> {request.food_quantity}</p>
                            <p><strong>Pickup Time:</strong> {request.pickup_time}</p>
                            <p><strong>hotel Address:</strong> {request.hotelId.address}</p>
                            <p><strong>NGO Name:</strong> {request.assign_ngoId.ngoName}</p>
                            <p><strong>NGO Address:</strong> {request.assign_ngoId.address}</p>

                            <button 
                                className="accept-button" 
                                onClick={() => handleRequest(request._id)}
                                style={{ backgroundColor: buttonStates[request._id]?.color || "#4CAF50", color: "#fff" }}
                            >
                                {buttonStates[request._id]?.text || "Accept"}
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default VolunteerRequests;
