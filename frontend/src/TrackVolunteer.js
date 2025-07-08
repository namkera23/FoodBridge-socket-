import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from './SocketContext';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup,Polygon,Path, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import axios from 'axios';

const TrackVolunteer = () => {
  const { hotelId } = useParams();
  const socket = useContext(SocketContext);
  const [hotelLocation, setHotelLocation] = useState(null);
  const [volunteerLocation, setVolunteerLocation] = useState(null);


  // 👉 Fetch Hotel Location on Mount
  useEffect(() => {
    const fetchHotelLocation = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/hotel/${hotelId}/location`);
        const { lat, lng } = res.data.location;
        if (lat && lng) {
          setHotelLocation({ lat, lng });
        } else {
          console.warn("Invalid hotel coordinates");
        }
      } catch (err) {
        console.error("Error fetching hotel location:", err);
      }
    };
    fetchHotelLocation();
  }, [hotelId]);

  useEffect(() => {
  if (!socket) return;

  const handleConnect = () => {
    console.log("Connected to socket:", socket.id);
    console.log("Joining room for hotel ID:", hotelId);
    socket.emit("join", hotelId);

    socket.on("volunteerLocationUpdate", (data) => {
      alert(`🔔 Volunteer location updated: ${data.latitude}, ${data.longitude}`);
      console.log("Volunteer location update received:", data);
      setVolunteerLocation({ lat: data.latitude, lng: data.longitude });
    });
  };

  socket.on("connect", handleConnect);

  return () => {
    socket.off("connect", handleConnect);
    socket.off("volunteerLocationUpdate");
  };
}, [socket, hotelId]);


  return (
    <div>
      <h2>Track Volunteer</h2>
      {hotelLocation ? (
        <MapContainer center={hotelLocation} zoom={13} style={{ height: "500px", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <Marker position={hotelLocation}>
            <Popup>🏨 Hotel Location</Popup>
          </Marker>

          {volunteerLocation && (
            <>
              <Marker position={volunteerLocation}>
                <Popup>🚶 Volunteer Location</Popup>
              </Marker>
              <Polyline positions={[hotelLocation, volunteerLocation]} color="blue" />
            </>
          )}
        </MapContainer>
      ) : (
        <p>Loading hotel location...</p>
      )}
    </div>
  );
};

export default TrackVolunteer;