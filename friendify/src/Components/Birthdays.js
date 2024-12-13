import React from 'react';
import '../css/birthdays.css';
import cakeIcon from '../images/birthday.png'; // Import cake icon
import emmaPic from '../images/emma.png';
import dwaynePic from '../images/dwayne.png';
import jenniferPic from '../images/jennifer.png';
import elonPic from '../images/elon.png';
import taylorPic from '../images/taylor.png';
import markPic from '../images/mark.png';

const friendsBirthdays = [
  { id: 1, name: 'Emma Watson', date: '2024-11-28', profilePic: emmaPic },
  { id: 2, name: 'Dwayne Johnson', date: '2024-11-29', profilePic: dwaynePic },
  { id: 3, name: 'Jennifer Lawrence', date: '2024-12-01', profilePic: jenniferPic },
  { id: 4, name: 'Elon Musk', date: '2024-12-05', profilePic: elonPic },
  { id: 5, name: 'Taylor Swift', date: '2024-12-15', profilePic: taylorPic },
  { id: 6, name: 'Mark Zuckerberg', date: '2024-12-25', profilePic: markPic },
];

function Birthdays() {
  const today = new Date();
  const thisWeekEnd = new Date();
  thisWeekEnd.setDate(today.getDate() + 7);

  const todayBirthdays = friendsBirthdays.filter((friend) => {
    const birthday = new Date(friend.date);
    return (
      birthday.getDate() === today.getDate() &&
      birthday.getMonth() === today.getMonth()
    );
  });

  const weekBirthdays = friendsBirthdays.filter((friend) => {
    const birthday = new Date(friend.date);
    return birthday > today && birthday <= thisWeekEnd;
  });

  const monthBirthdays = friendsBirthdays.filter((friend) => {
    const birthday = new Date(friend.date);
    return (
      birthday.getMonth() === today.getMonth() &&
      birthday > thisWeekEnd
    );
  });

  const renderBirthdayItems = (birthdays) => {
    return birthdays.map((friend) => (
      <div key={friend.id} className="birthday-item">
        <img
          src={friend.profilePic}
          alt={friend.name}
          className="birthday-profile-pic"
        />
        <div className="birthday-details">
          <span className="name">{friend.name}</span>
          <span className="date">{friend.date}</span>
        </div>
        <img src={cakeIcon} alt="Birthday Cake" className="cake-icon" />
      </div>
    ));
  };

  return (
    <div className="birthday-container">
      <h2>Birthdays</h2>

      <div className="birthday-section">
        <h3>Today's Birthdays</h3>
        {todayBirthdays.length === 0 ? (
          <p>No birthdays today</p>
        ) : (
          <div className="birthday-list">{renderBirthdayItems(todayBirthdays)}</div>
        )}
      </div>

      <div className="birthday-section">
        <h3>This Week's Birthdays</h3>
        {weekBirthdays.length === 0 ? (
          <p>No birthdays this week</p>
        ) : (
          <div className="birthday-list">{renderBirthdayItems(weekBirthdays)}</div>
        )}
      </div>

      <div className="birthday-section">
        <h3>This Month's Birthdays</h3>
        {monthBirthdays.length === 0 ? (
          <p>No more birthdays this month</p>
        ) : (
          <div className="birthday-list">{renderBirthdayItems(monthBirthdays)}</div>
        )}
      </div>
    </div>
  );
}

export default Birthdays;
