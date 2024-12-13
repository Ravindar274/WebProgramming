import React from 'react';
import dwaynePic from '../images/dwayne.png';
import emmaPic from '../images/emma.png';
import jenniferPic from '../images/jennifer.png';
import elonPic from '../images/elon.png';
import taylorPic from '../images/taylor.png';
import markPic from '../images/mark.png';
import '../css/friends.css'; // Import the CSS for styling

const friendsList = [
  {
    id: 1,
    name: 'Dwayne Johnson',
    profilePic: dwaynePic,
    mutualFriends: 10,
  },
  {
    id: 2,
    name: 'Emma Watson',
    profilePic: emmaPic,
    mutualFriends: 15,
  },
  {
    id: 3,
    name: 'Jennifer Lawrence',
    profilePic: jenniferPic,
    mutualFriends: 5,
  },
  {
    id: 4,
    name: 'Elon Musk',
    profilePic: elonPic,
    mutualFriends: 8,
  },
  {
    id: 5,
    name: 'Taylor Swift',
    profilePic: taylorPic,
    mutualFriends: 12,
  },
  {
    id: 6,
    name: 'Mark Zuckerberg',
    profilePic: markPic,
    mutualFriends: 20,
  },
];


function Friends() {
  return (
    <div className="friends-container">
      <h2 className="friends-title">Your Friends</h2>
      <ul className="friends-list">
        {friendsList.map((friend) => (
          <li key={friend.id} className="friend-item">
            <div className="friend-profile">
              <img
                src={friend.profilePic}
                alt={friend.name}
                className="friend-profile-pic"
              />
            </div>
            <div className="friend-info">
              <h3 className="friend-name">{friend.name}</h3>
              <p className="mutual-friends">{friend.mutualFriends} mutual friends</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Friends;
