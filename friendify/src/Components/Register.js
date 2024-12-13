import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/login.css';  // Assuming the same style for the register page
import Footer from './Footer';
import DialogBox from './DialogBox';

function RegisterPage(props) {
    const navigate = useNavigate();
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isDialogOpen, setIsDialogOpen] = useState(false); // To control dialog visibility
    const [dialogMessage, setDialogMessage] = useState(''); //
    
    const handleRegister = async (e) => {
        e.preventDefault();

        // Validation
        if (!username || !email || !password) {
            alert("All fields are required.");
            return;
        }

        // Prepare the data to be sent to the backend
        const userData = {
            username,
            email,
            password
        };

        try {
          const response = await axios.post('http://localhost:5000/register', userData);
          console.log(response.data);

          // Set dialog message and open dialog box
          setDialogMessage(response.data.message);
          setIsDialogOpen(true);

      } catch (error) {
          console.error("There was an error registering the user:", error);
          setDialogMessage("Failed to register. Please try again.");
          setIsDialogOpen(true);
      }
    };

    const handleDialogClose = () => {
      setIsDialogOpen(false);
      if (dialogMessage.includes('successfully')) {
          navigate('/');  // Redirect to login page after successful registration
      }
  };

    return (
        <>
            <div className="login-main">
                <section className="login-section">
                    <h2>FriendiFy</h2>
                    <form className="login-form" onSubmit={handleRegister}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                placeholder="Enter your username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <button className="btn-login" type="submit">Register</button>
                        </div>

                        <div className="form-links">
                            <a href="#">Forgot Password?</a> | <a href="/login">Login</a>
                        </div>
                    </form>
                </section>
            </div>
            <Footer />
            {/* Show DialogBox when isDialogOpen is true */}
            <DialogBox
                isOpen={isDialogOpen}
                message={dialogMessage}  // Pass the message to the DialogBox
                onClose={handleDialogClose}
            />
        </>
    );
}

export default RegisterPage;
