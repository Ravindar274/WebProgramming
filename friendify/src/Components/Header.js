import React, { useContext } from 'react';
import '../css/header.css';
import friendifyIcon from '../images/friendify.png'
import profilePic from '../images/avatar1.png';
import NavBar from './NavBar';
import { ActiveSideMenuContext } from './Home';

function Header({ setCurrentPage }) {

  const setActiveSideMenu = useContext(ActiveSideMenuContext);

  const handleProfileClick =()=>{
    setCurrentPage('/profile');
    setActiveSideMenu('');
  }

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <div className="logo-icon"><img class="logo-icon-img" src={friendifyIcon} /></div>
          <span className="logo-text">Friendify.</span>
        </div>
        
        <div className="search-container">
          <input
            type="text"
            placeholder="Start typing to search..."
            className="search-bar"
          />
        </div>
        <div className="navbar-container">
          <NavBar setCurrentPage={setCurrentPage}/>
        </div>
        <div className="profile-picture">
          <img
            onClick={handleProfileClick}
            src={profilePic}
            alt="Profile"
            title='View Profile'
            className="profile-img"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
