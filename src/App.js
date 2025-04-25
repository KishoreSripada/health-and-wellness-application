import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Tabs, Tab, Button } from '@mui/material';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Booking from './Booking';
import OpeningHours from './OpeningHours';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  // Check if the user is logged in using sessionStorage
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('loggedIn');
    const storedUsername = sessionStorage.getItem('username');

    if (isLoggedIn) {
      setLoggedIn(true);
      setUsername(storedUsername); // Set username after login
    }
  }, []);

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem('loggedIn');
    sessionStorage.removeItem('username');
    window.location.href = '/login'; // Redirect to login page after logout
  };
  
  return (
    // Wrap your entire app with a Router (only one instance)
    <Router>
      <div>
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" style={{ flex: 1 }}>
              Fitness Management System
            </Typography>
            <Tabs value={false}>
              <Tab label="Home" value="/" component={Link} to="/" />
              <Tab label="Register" value="/register" component={Link} to="/register" />
              <Tab label="Book a Service" value="/booking" component={Link} to="/booking" />
              <Tab label="Opening Hours" value="/opening-hours" component={Link} to="/opening-hours" />
              {/* Conditionally render Login/Logout tab */}
              {loggedIn ? (
                <>
                  <Typography variant="h6" style={{ display: 'inline', marginRight: '10px' }}>
                    Welcome, {username}
                  </Typography>
                  <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </>
              ) : (
                <Tab label="Login" value="/login" component={Link} to="/login" />
              )}
            </Tabs>
          </Toolbar>
        </AppBar>

        {/* Routes for different pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/booking" element={<Booking loggedIn={loggedIn} />} />
          <Route path="/opening-hours" element={<OpeningHours />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
