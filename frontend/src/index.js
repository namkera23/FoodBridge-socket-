import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HotelRegister from './HotelRegister';
import NgoRegister from './NgoRegister';
import HotelDashboard from './HotelDashboard';
import HotelLogin from './Login';
import NgoDashboard from './NgoDashboard';
import Who from './who';
import VolunteerRegister from './VolunteerRegister';
import VolunteerRequests from './VolunteerRequests'
import { NotificationProvider } from './NotificationContext';
import NotificationPage from './NotificationPage';
import { SocketContext, socket } from "./SocketContext";
import TrackVolunteer from './TrackVolunteer';
import Homepage from './homepage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SocketContext.Provider value={socket}>
    
      <NotificationProvider>
      <Router>
        <Routes>
        <Route path='/who' element={<Who/>}/>
          <Route path='/register/hotel' element={<HotelRegister/>}/>
          <Route path='/register/ngo' element={<NgoRegister/>}/>
          <Route path='/register/volunteer' element={<VolunteerRegister/>}/>
          <Route path='/login' element={<HotelLogin/>}/>
          <Route path='/dashboard/hotel/:hotelId/make_request' element={<HotelDashboard/>}/>
          <Route path='/dashboard/hotel/:hotelId/notifications' element={<NotificationPage/>}/>
          <Route path='/dashboard/ngo/:ngoId/all_requests' element={<NgoDashboard/>}/>
          <Route path='/dashboard/volunteer/:volunteerId/all_requests' element={<VolunteerRequests/>}/>
          <Route path='/:hotelId/track' element={<TrackVolunteer/>}/>
          <Route path='/homepage' element={<Homepage/>}/>
        </Routes>
      </Router>
      </NotificationProvider>
    
    </SocketContext.Provider>
  </React.StrictMode>
);


