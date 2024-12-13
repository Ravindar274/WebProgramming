// src/components/ChatPopover.js
import React from 'react';
import profilePic1 from '../images/profile-pic.jpg'; // Example profile picture
import profilePic2 from '../images/avatar1.png'; // Example profile picture
import '../css/chatpopover.css';

function ChatPopover() {
  // Sample chat data
  const chats = [
    {
      id: 1,
      username: 'John Doe',
      profilePic: profilePic2,
      lastMessage: 'Hey, how are you?',
    },
    {
      id: 2,
      username: 'Jane Smith',
      profilePic: profilePic1,
      lastMessage: 'Let’s catch up soon!',
    },
    {
      id: 3,
      username: 'Alice Johnson',
      profilePic: profilePic2,
      lastMessage: 'Can you send me the document?',
    },
    {
        id: 4,
        username: 'Bruc Lee',
        profilePic: profilePic2,
        lastMessage: 'Where are you?',
      }
  ];

  return (
    <div className="chat-popover">
      <h3>Chats</h3>
      <div className="chat-list">
        {chats.map((chat) => (
          <div key={chat.id} className="chat-item">
            <img src={chat.profilePic} alt={chat.username} className="chat-profile-pic" />
            <div className="chat-details">
              <span className="chat-username">{chat.username}</span>
              <p className="chat-last-message">{chat.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatPopover;
