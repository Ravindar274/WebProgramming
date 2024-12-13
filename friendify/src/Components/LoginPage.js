import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/login.css';
import Footer from './Footer';
import axios from 'axios';

function LoginPage(props) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Send login request to the backend
            const response = await axios.post('http://localhost:5000/login', {
                email: email,
                password: password
            });

            // If login is successful
            if (response.data.success) {
                props.setLoggedIn(true);
                props.setUser(response.data.user); // Store user details in parent component (e.g., username)

                navigate("/home");
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <>
            <div className="login-main">
                <section className="login-section">
                    <h2>FriendiFy</h2>
                    <form className="login-form" onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input 
                                type="email" 
                                id="email" 
                                placeholder="Enter your email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                placeholder="Enter your password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <div className="form-group">
                            <button className="btn-login" type="submit">Login</button>
                        </div>

                        <div className="form-links">
                            <a href="#">Forgot Password?</a> |
                            <Link to="/register">Register</Link>
                        </div>
                    </form>
                </section>
            </div>
            <Footer />
        </>
    );
}

export default LoginPage;
