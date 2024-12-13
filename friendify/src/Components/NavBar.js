import React, { useContext, useState } from 'react';
import homeIcon from '../images/home.png';
import videosIcon from '../images/videos.png';
import notificationIcon from '../images/notification.png';
import settingsIcon from '../images/settings.png';
import chatIcon from '../images/chat.png';
import '../css/navbar.css';
import Notifications from './Notifications';
import ChatPopover from './ChatPopover';
import lightModeIcon from '../images/light-mode.png'; // Example light mode icon
import darkModeIcon from '../images/dark-mode.png'; // Example dark mode icon
import { ActiveSideMenuContext } from './Home';

function NavBar({ setCurrentPage }) {
  const setActiveSideMenu = useContext(ActiveSideMenuContext);

  const [activeLink, setActiveLink] = useState('/posts');
  const [showNotifications, setShowNotifications] = useState(false);  
  const [showChat, setShowChat] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); 

  const handleLinkClick = (path) => {
    setCurrentPage(path);
    setActiveLink(path);
    setShowNotifications(false); 
    setActiveSideMenu('');
  };

  const handleChatIconClick = () => {
    setShowChat(!showChat);  // Toggle the chat popover visibility
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);  // Toggle notifications popover
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode'); // Toggle dark mode on body
  };



  return (
    <nav className="nav">
      <ul className="nav-list">
        {/* Home Icon */}
        <li>
          <a
            onClick={() => handleLinkClick('/posts')}
            className={activeLink === '/posts' ? 'active' : ''}
          >
            <img src={homeIcon} alt="Home" title='Home' className="navbaricon navbaricondark" />
          </a>
        </li>


        {/* Videos Icon */}
        <li>
          <a
            onClick={() => handleLinkClick('/videos')}
            className={activeLink === '/videos' ? 'active' : ''}
          >
            <img src={videosIcon} alt="Videos" title='Videos' className="navbaricon navbaricondark" />
          </a>
        </li>

         {/* chat Icon */}
         <li>
          <a
            onClick={handleChatIconClick}  // Toggle chat popover
            className={activeLink === '/chat' ? 'active' : ''}
          >
            <img src={chatIcon} alt="Chat" title='Chat' className="navbaricon navbaricondark" />
          </a>
        </li>

      

        {/* Notifications Icon */}
        <li>
          <a
            onClick={handleNotificationClick}  // Toggle notification popover
            className={activeLink === '/notifications' ? 'active' : ''}
          >
            <img src={notificationIcon} alt="Notifications" title='Notifications' className="navbaricon navbaricondark" />
          </a>
        </li>

        

        {/* settings Icon */}
        <li>
          <a
            onClick={() => handleLinkClick('/settings')}
            className={activeLink === '/settings' ? 'active' : ''}
          >
            <img src={settingsIcon} alt="settings" title='Settings' className="navbaricon navbaricondark" />
          </a>
        </li>

        {/* Theme Toggle Icon */}
        <li>
          <a onClick={toggleTheme} className="theme-toggle">
            <img
              src={isDarkMode ? darkModeIcon : lightModeIcon} title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
              alt={isDarkMode ? 'Dark Mode' : 'Light Mode'}
              className="navbaricon"
            />
          </a>
          </li>
      </ul>

       {/* Conditionally render Notifications popover */}
       {showNotifications && <Notifications />}

      {/* Show Chat Popover if 'showChat' is true */}
      {showChat && <ChatPopover />}
    </nav>
  );
}

export default NavBar;
