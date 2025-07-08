// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./hosp2.css";
// import { useParams } from "react-router-dom";

// const NgoDashboard = () => {
//     const {ngoId} = useParams(); // Replace with actual logged-in NGO ID
//     console.log(ngoId)
//     const [requests, setRequests] = useState([]);
    
//     useEffect(() => {
//         fetchRequests();
//     }, []);

//     // Fetch all requests for the NGO
//     const fetchRequests = async () => {
//         try {
//             const response = await axios.get(`http://localhost:5000/dashboard/ngo/${ngoId}/all_requests`);
//             console.log(response)
//             setRequests(response.data.requests);
//         } catch (error) {
//             console.error("Error fetching requests:", error);
//         }
//     };

//     // Accept a food request
//     const acceptRequest = async (requestId) => {
//         try {
//             await axios.put(`http://localhost:5000/requests/${requestId}/accept`);
//             alert("Request Accepted!");
//             fetchRequests(); // Refresh the list after accepting
//         } catch (error) {
//             console.error("Error accepting request:", error);
//         }
//     };

//     return (
//         <div>
//             <div className="search-bar">
//                 <div className="logo">
//                     <img className="img-logo" src="/images/Screenshot_2024-09-24_210649-removebg-preview.png" alt="QuickSend logo" />
//                     <h1 className="Foodbridge">FoodBridge</h1>
//                 </div>
//                 <div className="search-head">
//                     <div className="account">
//                         <img className="login-top" src="/images/account-removebg-preview.png" alt="Login" />
//                         <select className="logout-option">
//                             <option value="">Account</option>
//                             <option value="logout">Logout</option>
//                         </select>
//                     </div>
//                 </div>
//             </div>

//             <div className="sidebar">
//                 <ul className="sidebar-menu">
//                     <div className="dashboard">
//                         <img className="dashboardimg" src="/images/dashboard.png" alt="Dashboard" />
//                         <li className="li-outer">Dashboard</li>
//                     </div>

//                     <div className="dashboard">
//                         <img className="templateimg" src="/images/home.png" alt="Template" />
//                         <li className="li-outer" style={{ cursor: "pointer" }}>Home</li>
//                     </div>

//                     <div className="dashboard">
//                         <img className="campaignimg" src="/images/campaign-removebg-preview (1).png" alt="Campaign" />
//                         <li className="li-outer" style={{ cursor: "pointer" }}>Connection</li>
//                     </div>
//                 </ul>
//             </div>

//             <div >
//                 <h1 className="register">Your Connections!</h1>
                
//                 <div className="request-list">
//                     {requests.length === 0 ? (
//                         <p>No food requests available.</p>
//                     ) : (
//                         requests.map((request) => (
//                             <div key={request._id} className="request-card">
//                                <h2><strong>Hotel:</strong> {request.hotelId.hotel_name}</h2> 
//                                <p><strong>Food Name:</strong>{request.food_name}</p>
//                                 <p><strong>Quantity:</strong> {request.food_quantity}</p>
//                                 <p><strong>Pickup Time:</strong> {request.pickup_time}</p>
//                                 <p><strong>Status:</strong> {request.status}</p>
                                
//                                 <button 
//                                     className="accept-button" 
//                                     onClick={() => acceptRequest(request._id)}
//                                     disabled={request.status === "accepted"}
//                                 >
//                                     {request.status === "accepted" ? "Accepted" : "Accept"}
//                                 </button>
//                             </div>
//                         ))
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default NgoDashboard;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./hosp2.css";
// import { useParams } from "react-router-dom";


// const NgoDashboard = () => {
//     const { ngoId } = useParams(); 
//     const [requests, setRequests] = useState([]);
//     const [isRequest,setIsRequest] = useState("Accept")

//     useEffect(() => {
//         fetchRequests();
//     }, []);

//     const handleRequest = (e) =>{
//         e.preventDefault();
        
//         setIsRequest(isRequest==="Accept"?"Pending":"Accept");               
//     }
//     // Fetch all requests for the NGO
//     const fetchRequests = async () => {
//         try {
//             const response = await axios.get(`http://localhost:5000/dashboard/ngo/${ngoId}/all_requests`);
//             setRequests(response.data.requests);
//         } catch (error) {
//             console.error("Error fetching requests:", error);
//         }
//     };

   
    
    
    
    

//     return (
       
//             <div>
//             <div className="search-bar">
//                  <div className="logo">
//                      <img className="img-logo" src="/images/Screenshot_2024-09-24_210649-removebg-preview.png" alt="QuickSend logo" />
//                      <h1 className="Foodbridge">FoodBridge</h1>
//                  </div>
//                  <div className="search-head">
//                      <div className="account">
//                          <img className="login-top" src="/images/account-removebg-preview.png" alt="Login" />
//                          <select className="logout-option">
//                              <option value="">Account</option>
//                              <option value="logout">Logout</option>
//                         </select>
//                     </div>
//                 </div>
//             </div>

//              <div className="sidebar">
//                  <ul className="sidebar-menu">
//                      <div className="dashboard">
//                         <img className="dashboardimg" src="/images/dashboard.png" alt="Dashboard" />
//                          <li className="li-outer">Dashboard</li>
//                      </div>

//                      <div className="dashboard">
//                          <img className="templateimg" src="/images/home.png" alt="Template" />
//                          <li className="li-outer" style={{ cursor: "pointer" }}>Home</li>
//                     </div>

//                      <div className="dashboard">
//                          <img className="campaignimg" src="/images/campaign-removebg-preview (1).png" alt="Campaign" />
//                         <li className="li-outer" style={{ cursor: "pointer" }}>Connection</li>
//                     </div>
//                  </ul>
//            </div>

//             <h1 className="register">Your Connections!</h1>
//             <div className="request-list">
//                 {requests.length === 0 ? (
//                     <p>No food requests available.</p>
//                 ) : (
//                     requests.map((request) => (
//                         <div key={request._id} className="request-card">
//                             <h2><strong>Hotel:</strong> {request.hotelId.hotel_name}</h2> 
//                             <p><strong>Food Name:</strong>{request.food_name}</p>
//                             <p><strong>Quantity:</strong> {request.food_quantity}</p>
//                             <p><strong>Pickup Time:</strong> {request.pickup_time}</p>
//                             <p><strong>Status:</strong> {request.status}</p>

//                             {/* <button 
//                                 className="accept-button" 
//                                 onClick={() => acceptRequest(request._id)}
//                                 disabled={request.status !== "pending"}
//                             >
//                                 {request.status === "accepted" ? "Accepted" : request.status === "pending" ? "Pending" : "Accept"}
//                             </button> */}
//                             {/* <button 
//                                 className="accept-button" 
//                                 onClick={handleRequest}
//                             >
//                                 {isRequest?"pending":"Accept"}
//                             </button> */}
//                             <button className="accept-button" onClick={handleRequest}>{isRequest}</button>

//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// };

// export default NgoDashboard;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./hosp2.css";
// import { useParams } from "react-router-dom";

// const NgoDashboard = () => {
//     const { ngoId } = useParams();
//     const [requests, setRequests] = useState([]);
//     const [buttonStates, setButtonStates] = useState({}); // Store both text and color

//     useEffect(() => {
//         fetchRequests();
//     }, []);

//     // Fetch all requests for the NGO
//     const fetchRequests = async () => {
//         try {
//             const response = await axios.get(`http://localhost:5000/dashboard/ngo/${ngoId}/all_requests`);
//             setRequests(response.data.requests);

//             // Initialize button states dynamically
//             const initialButtonStates = {};
//             response.data.requests.forEach(request => {
//                 initialButtonStates[request._id] = { text: "Accept", color: "#4CAF50" }; // Green for Accept
//             });
//             setButtonStates(initialButtonStates);
//         } catch (error) {
//             console.error("Error fetching requests:", error);
//         }
//     };

//     const handleRequest = async (id) => {
//         setButtonStates((prevStates) => ({
//             ...prevStates,
//             [id]: {
//                 text: prevStates[id].text === "Accept" ? "Pending" : "Accept",
//                 color: prevStates[id].text === "Accept" ? "#FFA500" : "#4CAF50", // Orange for Pending, Green for Accept
//             }
//         }));
//         try {
//             const response = await fetch("http://localhost:5000/accept-request", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     requestId: id,  
//                 ngoId: ngoId 
//                 })
//             });
    
//             const data = await response.json();
//             alert(data.message);
//         } catch (error) {
//             console.error("Error:", error);
//         }
//     };


//     const logout = () => {
        
//         window.location.href = '/login'; // Adjust the path as needed
//     }

//     return (
//         <div>
//             <div className="search-bar">
//                 <div className="logo">
//                     <img className="img-logo" src="/images/Screenshot_2024-09-24_210649-removebg-preview.png" alt="QuickSend logo" />
//                     <h1 className="Foodbridge">FoodBridge</h1>
//                 </div>
//                 <div className="search-head">
//                     <div className="account">
//                         <img className="login-top" src="/images/account-removebg-preview.png" alt="Login" />
//                         <select
//                             className='logout-option'
//                             onChange={(e) => {
//                                 if (e.target.value === 'logout') {
//                                 logout();
//                                 }
//                             }}
//                         ><option value=''>Account</option>
//                         <option value='logout'>Logout</option>
//                         </select>
//                     </div>
//                 </div>
//             </div>

//             <div className="sidebar">
//                 <ul className="sidebar-menu">
//                     <div className="dashboard">
//                         <img className="dashboardimg" src="/images/dashboard.png" alt="Dashboard" />
//                         <li className="li-outer">Dashboard</li>
//                     </div>

//                     <div className="dashboard">
//                         <img className="templateimg" src="/images/home.png" alt="Template" />
//                         <li className="li-outer" style={{ cursor: "pointer" }}>Home</li>
//                     </div>

//                     <div className="dashboard">
//                         <img className="campaignimg" src="/images/campaign-removebg-preview (1).png" alt="Campaign" />
//                         <li className="li-outer" style={{ cursor: "pointer" }}>Connection</li>
//                     </div>
//                 </ul>
//             </div>

//             <h1 className="register">Your Connections!</h1>
//             <div className="request-list">
//                 {requests.length === 0 ? (
//                     <p>No food requests available.</p>
//                 ) : (
//                     requests.map((request) => (
//                         <div key={request._id} className="request-card">
//                             <h2><strong>Hotel:</strong> {request.hotelId.hotel_name}</h2>
//                             <p><strong>Food Name:</strong> {request.food_name}</p>
//                             <p><strong>Quantity:</strong> {request.food_quantity}</p>
//                             <p><strong>Pickup Time:</strong> {request.pickup_time}</p>
                            

//                             <button 
//                                 className="accept-button" 
//                                 onClick={() => handleRequest(request._id)}
//                                 style={{ backgroundColor: buttonStates[request._id]?.color || "#4CAF50", color: "#fff" }}
//                             >
//                                 {buttonStates[request._id]?.text || "Accept"}
//                             </button>
//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// };

// export default NgoDashboard;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import "./hosp2.css";

// Connect socket
const socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"],
  withCredentials: true,
});

const NgoDashboard = () => {
  const { ngoId } = useParams();
  const [requests, setRequests] = useState([]);
  const [buttonStates, setButtonStates] = useState({});
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchRequests();

    // Join room for this NGO
    socket.on("connect", () => {
      console.log("Connected to socket:", socket.id);
      socket.emit("join", ngoId); // ✅ join room with ngoId
    });

    // Listen for new request notifications
    socket.on("notification", (data) => {
      alert(`🔔 ${data.message}`);
      fetchRequests(); // Reload list
    });

    // Cleanup
    return () => {
      socket.off("notification");
      
    };
  }, [ngoId,socket]); // ✅ Add ngoId dependency

  const fetchRequests = async () => {
    try {
        console.log("Fetching requests for NGO:", ngoId);
      const response = await axios.get(`http://localhost:5000/dashboard/ngo/${ngoId}/all_requests`);
      console.log("Fetched requests:", response);
      setRequests(response.data.requests);

      const initialButtonStates = {};
      response.data.requests.forEach(request => {
        initialButtonStates[request._id] = { text: "Accept", color: "#4CAF50" };
      });
      setButtonStates(initialButtonStates);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const handleRequest = async (id) => {
    setButtonStates(prev => ({
      ...prev,
      [id]: {
        text: prev[id].text === "Accept" ? "Pending" : "Accept",
        color: prev[id].text === "Accept" ? "#FFA500" : "#4CAF50",
      }
    }));

    try {
      const response = await fetch("http://localhost:5000/accept-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId: id, ngoId }),
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const logout = () => {
    window.location.href = '/login';
  };

  return (
    <div>
      {/* Header */}
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
                if (e.target.value === 'logout') logout();
              }}
            >
              <option value=''>Account</option>
              <option value='logout'>Logout</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sidebar */}
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

      {/* Main Content */}
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
      <div className="notifications">
          <h2>Notifications</h2>
          <ul>
            {notifications.map((n, idx) => (
              <li key={idx}>{n.message}</li>
            ))}
          </ul>
        </div>
    </div>
  );
};

export default NgoDashboard;
