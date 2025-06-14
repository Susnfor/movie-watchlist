'use client';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Watchlist from '@/app/components/WatchList';
import Link from 'next/link'; 

export default function WatchlistPage() {
  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: 'background.default',
      py: { xs: 2, sm: 4, md: 6 },
    }}>
      <Container component="main" maxWidth="lg">
        <Paper 
          elevation={3} 
          sx={{ 
            p: { xs: 2, sm: 4 },
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography 
              component="h1" 
              variant="h2" 
              sx={{ fontWeight: 'bold' }}
            >
              My Watchlist
            </Typography>

            <Button component={Link} href="/" variant="outlined">
              Back to Search
            </Button>
          </Box>
          
          <Watchlist />

        </Paper>
      </Container>
    </Box>
  );
}
