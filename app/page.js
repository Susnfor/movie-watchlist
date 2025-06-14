'use client';
import { Container, Typography, Box, Paper } from '@mui/material';
import {SearchBox} from './components/SearchBox'; 

export default function Home() {
  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: 'background.default', 
      py: { xs: 2, sm: 4, md: 6 }, // Responsive vertical padding
    }}>
      <Container component="main" maxWidth="lg">
        {/* We wrap the main content in a Paper component for a nice container effect */}
        <Paper 
          elevation={3} 
          sx={{ 
            p: { xs: 2, sm: 4 },
            borderRadius: 2, // Softer corners
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', // Center all content within the Paper
          }}
        >
          <Typography 
            component="h1" 
            variant="h2" 
            align="center"
            gutterBottom 
            sx={{ fontWeight: 'bold', mb: 2 }} 
          >
            Movie Watchlist Tracker
          </Typography>
          
          <Typography 
            variant="h6"
            color="text.secondary"
            align="center"
            sx={{ mb: 4, maxWidth: 'md' }} 
          >
            Search for movies, series, and episodes to build your personal watchlist.
          </Typography>
          

          <SearchBox />

        </Paper>
      </Container>
    </Box>
  );
}
