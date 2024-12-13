// src/components/Settings.js
import React from 'react';
import '../css/settings.css';

function Settings() {
  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <div className="settings-option">
        <h3>Edit Profile</h3>
        <p>Update your personal details and profile picture.</p>
        <button>Edit Profile</button>
      </div>

      <div className="settings-option">
        <h3>Change Password</h3>
        <p>Change your account password for added security.</p>
        <button>Change Password</button>
      </div>

      <div className="settings-option">
        <h3>Notification Preferences</h3>
        <p>Manage how you receive notifications.</p>
        <button>Manage Notifications</button>
      </div>

      <div className="settings-option">
        <h3>Privacy Settings</h3>
        <p>Control who can see your profile and posts.</p>
        <button>Privacy Settings</button>
      </div>
    </div>
  );
}

export default Settings;
