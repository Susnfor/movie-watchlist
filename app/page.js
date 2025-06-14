'use client';
import { Container, Typography, Box, Paper } from '@mui/material';
import {SearchBox} from './components/SearchBox'; 
import Button from '@mui/material/Button';
import Link from 'next/link'; 

export default function Home() {
  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: 'background.default', 
      py: { xs: 2, sm: 4, md: 6 }, // Responsive vertical padding
    }}>
      <Container component="main" maxWidth="lg">

         <Paper 
          elevation={3} 
          sx={{ 
            p: { xs: 2, sm: 4 },
            borderRadius: 2,
            position: 'relative', 
          }}
        >
           <Button 
            component={Link} 
            href="/watchlist" 
            variant="contained" 
            size="large"
            sx={{
              position: 'absolute',
              top: { xs: 16, sm: 24 }, 
              right: { xs: 16, sm: 24 },
            }}
          >
            My Watchlist
          </Button>
<Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>

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

          </Box>

        </Paper>
      </Container>
    </Box>
  );
}
