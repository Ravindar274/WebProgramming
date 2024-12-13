import LoginPage from './Components/LoginPage';
import Register from './Components/Register'; // Import your Register component
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Home from './Components/Home';
import './css/darkmode.css'; // Import dark mode styles
import './App.css'; // Import dark mode styles

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Store the user details
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={loggedIn ? <Navigate to="/home" /> : <LoginPage setLoggedIn={setLoggedIn} setUser={setUser}  />} />
          <Route path="home"  element={loggedIn ? <Home  user={user} /> : <Navigate to="/" />} />
          <Route path="register" element={<Register />} />
          {/* <Route path="friends" element={loggedIn ? <Friends /> : <Navigate to="/" />} />
          <Route path="posts" element={loggedIn ? <Posts /> : <Navigate to="/" />} />
          <Route path="messages" element={loggedIn ? <Messages /> : <Navigate to="/" />} />
          <Route path="notifications" element={loggedIn ? <Notifications /> : <Navigate to="/" />} />
          <Route path="profile" element={loggedIn ? <Profile /> : <Navigate to="/" />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
