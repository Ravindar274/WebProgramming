// src/components/Notifications.js
import React from 'react';
import mailIcon from '../images/email.png';  // Import your image assets
import commentIcon from '../images/chat-bubble.png';
import likeIcon from '../images/like.png';
import videoIcon from '../images/play-button.png';
import '../css/notifications.css';

// Updated notifications with image icons
const notifications = [
  { id: 1, message: 'You have a new message.', icon: mailIcon },
  { id: 2, message: 'New comment on your post.', icon: commentIcon },
  { id: 3, message: 'Someone liked your photo.', icon: likeIcon },
  { id: 4, message: 'Your video has been uploaded successfully.', icon: videoIcon },
];

function Notifications() {
  return (
    <div className="notifications-popover">
      <h3>Notifications</h3>
      {notifications.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id} className="notification-item">
              {/* Display the icon image alongside the text */}
              <img src={notification.icon} alt="Notification icon" className="notification-icon" />
              {notification.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notifications;
