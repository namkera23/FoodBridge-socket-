// NotificationContext.js
import React, { createContext, useState,useParams } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  
  const [notifications, setNotifications] = useState([]);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
