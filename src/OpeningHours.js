import React from 'react';
import { Container, Typography } from '@mui/material';

function OpeningHours() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Opening Hours
      </Typography>
      <Typography>Monday - Friday: 6:00 AM - 10:00 PM</Typography>
      <Typography>Saturday: 8:00 AM - 6:00 PM</Typography>
      <Typography>Sunday: Closed</Typography>
    </Container>
  );
}

export default OpeningHours;
