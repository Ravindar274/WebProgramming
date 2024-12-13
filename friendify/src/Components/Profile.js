import React, { useContext } from 'react';
import profilePic from '../images/profile-pic.jpg';
import coverPic from '../images/cover-pic.jpg'; 
import postImage from '../images/post-pic.jpg'; 
import '../css/profile.css';
import { UserContext } from './Home';

function Profile() {
  const user = useContext(UserContext);
  return (
    <div className="profile-page">
      {/* Cover Photo */}
      <div className="cover-photo">
        <img src={coverPic} alt="Cover" className="cover-photo-img" />
      </div>

      {/* Profile Picture and Basic Info */}
      <div className="profile-info">
        <img src={profilePic} alt="Profile" className="profile-pic" />
        <h2 className="user-name">{user.username}</h2>
        <p className="user-bio">Full Stack Developer | Tech Enthusiast | Blogger</p>
        <div className="stats">
          <div className="stat">
            <h3>200</h3>
            <p>Posts</p>
          </div>
          <div className="stat">
            <h3>500</h3>
            <p>Followers</p>
          </div>
          <div className="stat">
            <h3>300</h3>
            <p>Following</p>
          </div>
        </div>
      </div>

      {/* User Posts */}
      <div className="user-posts">
        <h2>Posts</h2>
        <div className="usrpost">
          <img src={postImage} alt="Post" className="post-image" />
          <div className="post-content">
            <h3 className="post-title">A Day in the Life of a Developer</h3>
            <p className="post-text-profile">
              Just sharing some insights on what it’s like to be a developer. It’s challenging but rewarding!
            </p>
          </div>
        </div>

        {/* Add more post components as needed */}
      </div>
    </div>
  );
}

export default Profile;
