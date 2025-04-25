import React, { useState, useEffect } from 'react';
import { Button, Container, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function Booking({ loggedIn }) {
  const [classes, setClasses] = useState([]);
  const [bookedClasses, setBookedClasses] = useState([]);

  useEffect(() => {
    // Hardcoded class schedule with time slots
    setClasses([
      { id: 1, name: 'Yoga', date: '2025-04-26', time: '07:30 AM', trainer: 'Trainer 1', status: 'Available' },
      { id: 2, name: 'Boxing', date: '2025-04-26', time: '07:50 AM', trainer: 'Trainer 2', status: 'Available' },
      { id: 3, name: 'Zumba', date: '2025-04-26', time: '08:30 AM', trainer: 'Trainer 3', status: 'Fully Booked' },
      { id: 4, name: 'Spin Class', date: '2025-04-27', time: '09:00 AM', trainer: 'Trainer 4', status: 'Available' },
    ]);

    // Load booked classes from localStorage if any
    const storedBookedClasses = JSON.parse(localStorage.getItem('bookedClasses')) || [];
    setBookedClasses(storedBookedClasses);
  }, []);

  const handleBooking = (selectedClass) => {
    if (loggedIn) {
      // Check if class is already booked
      const isAlreadyBooked = bookedClasses.some(
        (bookedClass) => bookedClass.id === selectedClass.id
      );

      if (isAlreadyBooked) {
        alert('You have already booked this class.');
        return;
      }

      // Book the class and save it to localStorage
      const updatedBookedClasses = [...bookedClasses, selectedClass];
      setBookedClasses(updatedBookedClasses);
      localStorage.setItem('bookedClasses', JSON.stringify(updatedBookedClasses));
      alert(`Successfully booked ${selectedClass.name} with ${selectedClass.trainer}!`);
    } else {
      alert('You must be logged in to book a class.');
    }
  };

  const handleUnbooking = (classId) => {
    const updatedBookedClasses = bookedClasses.filter((cls) => cls.id !== classId);
    setBookedClasses(updatedBookedClasses);
    localStorage.setItem('bookedClasses', JSON.stringify(updatedBookedClasses));
    alert('Class unbooked successfully!');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Available Classes
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Class Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Trainer</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classes.map((cls) => (
              <TableRow key={cls.id}>
                <TableCell>{cls.name}</TableCell>
                <TableCell>{cls.date}</TableCell>
                <TableCell>{cls.time}</TableCell>
                <TableCell>{cls.trainer}</TableCell>
                <TableCell>
                  {bookedClasses.some((bookedClass) => bookedClass.id === cls.id) ? (
                    <Button variant="contained" color="secondary" onClick={() => handleUnbooking(cls.id)}>
                      Unbook
                    </Button>
                  ) : cls.status === 'Available' && loggedIn ? (
                    <Button variant="contained" color="primary" onClick={() => handleBooking(cls)}>
                      Book Now
                    </Button>
                  ) : (
                    <Button variant="contained" color="default" disabled>
                      Fully Booked
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Show Booked Classes */}
      <Typography variant="h4" gutterBottom style={{ marginTop: '30px' }}>
        Your Booked Classes
      </Typography>

      {bookedClasses.length > 0 ? (
        <Grid container spacing={3}>
          {bookedClasses.map((cls) => (
            <Grid item xs={12} md={6} key={cls.id}>
              <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
                <Typography variant="h6">{cls.name}</Typography>
                <Typography>Date: {cls.date}</Typography>
                <Typography>Time: {cls.time}</Typography>
                <Typography>Trainer: {cls.trainer}</Typography>
                <Button variant="contained" color="secondary" onClick={() => handleUnbooking(cls.id)}>
                  Unbook
                </Button>
              </div>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No classes booked yet.</Typography>
      )}
    </Container>
  );
}

export default Booking;
