import React from 'react';
import { Container } from '@mui/material';

const AppContainer = ({ children }) => {
  return (
    <Container 
      maxWidth="xl" // xs, sm, md, lg, xl
      sx={{
        py: 6, // padding vertical
        minHeight: '100sm'
      }}
    >
      {children}
    </Container>
  );
};

export default AppContainer;