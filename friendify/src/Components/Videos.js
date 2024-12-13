// src/components/Videos.js
import React from 'react';
import video1 from '../videos/video1.mp4'; // Sample video file
import video2 from '../videos/video2.mp4'; // Sample video file
import video3 from '../videos/video3.mp4'; // Sample video file
import profilePic1 from '../images/profile-pic.jpg'; // Sample profile picture
import profilePic2 from '../images/profile-pic.jpg'; // Another profile picture
import '../css/video.css';

function Videos() {
  // Sample video data (you can replace this with actual data later)
  const videos = [
    {
      id: 1,
      name: 'John Doe',
      profilePic: profilePic1,
      videoSrc: video1,
      description: 'Fall Foliage',
    },
    {
      id: 2,
      name: 'Jane Smith',
      profilePic: profilePic2,
      videoSrc: video2,  // You can use a different video here
      description: 'The Toronto city',
    },
    {
        id: 3,
        name: 'Adam Sandler',
        profilePic: profilePic2,
        videoSrc: video3,  // You can use a different video here
        description: 'Beautiful Park',
      },
  ];

  return (
    <div className="videos-container">
      <h2>Videos</h2>
      <div className="videos-list">
        {videos.map((video) => (
          <div key={video.id} className="video-item">
            <div className="video-header">
              <img src={video.profilePic} alt={video.name} className="profile-pic-video" />
              <span className="video-username">{video.name}</span>
            </div>
            <video controls className="video-player">
              <source src={video.videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p>{video.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Videos;
