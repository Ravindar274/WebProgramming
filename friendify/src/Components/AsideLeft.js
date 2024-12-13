import React, { useState } from 'react';
import createIcon from '../images/create.png'; // Example path
import friendsIcon from '../images/friends.png';
import groupsIcon from '../images/group.png';
import savedIcon from '../images/saved.png';
import birthdaysIcon from '../images/birthday.png';
import '../css/aside.css';

function AsideLeft({ setCurrentPage, activeSideMenu, setActiveSideMenu }) {
  

  const handleSideMenuClick = (currentPage) => {
    setActiveSideMenu(currentPage);
    setCurrentPage(currentPage);
  };

  return (
    <aside className="aside">
    
      <ul className="ulist">
        <li
          onClick={() => handleSideMenuClick('/create')}
          className={activeSideMenu === '/create' ? 'active' : ''}
        >
          <div className="menu-item">
            <div className="icon-wrapper create">
              <img src={createIcon} alt="create" />
            </div>
            <span>Create</span>
          </div>
        </li>
        <li
          onClick={() => handleSideMenuClick('/friends')}
          className={activeSideMenu === '/friends' ? 'active' : ''}
        >
          <div className="menu-item">
            <div className="icon-wrapper friends">
              <img src={friendsIcon} alt="Friends" />
            </div>
            <span>Friends</span>
          </div>
        </li>
        <li
          onClick={() => handleSideMenuClick('/groups')}
          className={activeSideMenu === '/groups' ? 'active' : ''}
        >
          <div className="menu-item">
            <div className="icon-wrapper groups">
              <img src={groupsIcon} alt="groups" />
            </div>
            <span>Groups</span>
          </div>
        </li>
        <li
          onClick={() => handleSideMenuClick('/saved')}
          className={activeSideMenu === '/saved' ? 'active' : ''}
        >
          <div className="menu-item">
            <div className="icon-wrapper saved">
              <img src={savedIcon} alt="Saved" />
            </div>
            <span>Saved</span>
          </div>
        </li>
        <li
          onClick={() => handleSideMenuClick('/birthdays')}
          className={activeSideMenu === '/birthdays' ? 'active' : ''}
        >
          <div className="menu-item">
            <div className="icon-wrapper birthdays">
              <img src={birthdaysIcon} alt="Birthdays" />
            </div>
            <span>Birthdays</span>
          </div>
        </li>
      </ul>
    </aside>
  );
}

export default AsideLeft;
