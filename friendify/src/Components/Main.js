import React from 'react';
import Posts from './Posts';
import Profile from './Profile'; 
import CreatePost from './CreatePost';
import Settings from './Settings';
import Videos from './Videos';
import Friends from './Friends';
import Groups from './Group';
import Saved from './Saved';
import Birthdays from './Birthdays';

function Main({currentPage}) {
  
  let content;

  if (currentPage === '/posts') {
    content = <Posts />;
  } else if (currentPage === '/profile') {
    content = <Profile />;
  } else if (currentPage === '/create') {
    content = <CreatePost />;  
  } else if (currentPage === '/photos') {
    content = <photos />; 
  } else if (currentPage === '/settings') {  // Add settings page condition
    content = <Settings />;
  }  else if (currentPage === '/videos') {  // Add videos page condition
    content = <Videos />;
  } else if (currentPage === '/friends') {
    content = <Friends />;
  } else if (currentPage === '/groups') {
    content = <Groups />;
  } else if (currentPage === '/saved') {
    content = <Saved />;
  } else if (currentPage === '/birthdays') {
    content = <Birthdays />;
  }

  return (
    <main className="content-main">
      {content}
    </main>
  );
}

export default Main;
