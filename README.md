🍽 FoodBridge
FoodBridge is a web-based platform designed to bridge the gap between hotels, NGOs, and volunteers to reduce food wastage and ensure surplus food reaches those in need efficiently.

🌟 Features
 Hotel Dashboard

Hotels can notify NGOs about surplus food availability.

Set food type, quantity, and pick-up time.

 NGO Dashboard

NGOs receive real-time notifications from hotels.

View location-based requests and accept food donations.

Volunteer Module

Volunteers register with live location tracking to assist NGOs in pick-ups.

Real-Time Notifications

Uses Socket.io for live communication between hotels and NGOs.

 Geolocation Support

Automatically fetches live location of volunteers and NGOs for better coordination.

🛠️ Tech Stack
Frontend: React.js, CSS

Backend: Node.js, Express.js

Database: MongoDB

Real-Time Communication: Socket.io

APIs: OpenStreetMap for address suggestions and geolocation

Authentication: JWT for secure login and registration

🚀 How to Run Locally
Clone the repository


git clone https://github.com/<your-username>/foodbridge.git
cd foodbridge

Install dependencies

For backend:
cd backend
npm install

For frontend:
cd ../frontend
npm install

Start the backend server
npm start

Start the frontend server
npm start

Open the app in your browser at:
http://localhost:3000

