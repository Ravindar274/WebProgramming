import React from 'react';
import '../css/dialogbox.css'; // Add custom styles for your dialog

const DialogBox = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <p>{message}</p>
        <button onClick={onClose} className="dialog-close-button">
          Close
        </button>
      </div>
    </div>
  );
};

export default DialogBox;
