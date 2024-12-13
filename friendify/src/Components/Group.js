import React from 'react';
import humberGroupPic from '../images/humber.png';
import torontoGroupPic from '../images/toronto.png';
import jnvGroupPic from '../images/jnv.png';
import collegeFriendsGroupPic from '../images/college.png';
import projectGroupPic from '../images/infor.png';
import sportsGroupPic from '../images/sports.png';
import '../css/groups.css'; // Import the CSS for styling

const groupsList = [
  {
    id: 1,
    name: 'Humber College',
    profilePic: humberGroupPic,
    members: 120,
  },
  {
    id: 2,
    name: 'Toronto Explorers',
    profilePic: torontoGroupPic,
    members: 80,
  },
  {
    id: 3,
    name: 'JNV School Friends',
    profilePic: jnvGroupPic,
    members: 50,
  },
  {
    id: 4,
    name: 'College Friends',
    profilePic: collegeFriendsGroupPic,
    members: 75,
  },
  {
    id: 5,
    name: 'Infor Project Team',
    profilePic: projectGroupPic,
    members: 15,
  },
  {
    id: 6,
    name: 'Sports Enthusiasts',
    profilePic: sportsGroupPic,
    members: 100,
  },
];

function Groups() {
  return (
    <div className="groups-container">
      <h2 className="groups-title">Your Groups</h2>
      <ul className="groups-list">
        {groupsList.map((group) => (
          <li key={group.id} className="group-item">
            <div className="group-profile">
              <img
                src={group.profilePic}
                alt={group.name}
                className="group-profile-pic"
              />
            </div>
            <div className="group-info">
              <h3 className="group-name">{group.name}</h3>
              <p className="group-members">{group.members} members</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Groups;
