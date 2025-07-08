import React, { useContext } from 'react';
import { NotificationContext } from './NotificationContext';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const NotificationPage = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const { notifications } = useContext(NotificationContext);

  const track = ()=> {
      navigate(`/${hotelId}/track`);
  }

  return (
    <div>
      <h2>📢 Notifications</h2>
      <ul>
        {notifications.length === 0 ? (
          <li>No notifications yet</li>
        ) : (
          notifications.map((n, idx) => <li key={idx}>{n.message} </li>)
        )}
      </ul>
      <button onClick={track}>Track Volunteer</button>
    </div>
  );
};

export default NotificationPage;
