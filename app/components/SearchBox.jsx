'use client'
import { useState } from 'react'
import  SearchBoxForm  from "./SearchBoxForm"
import MoviesGrid from './MoviesGrid'; 
import { searchMovies, addMovieToWatchlist } from "../lib/apis"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import  CircularProgress  from '@mui/material/CircularProgress';
import { useSnackbar } from 'notistack'; 



export const SearchBox = () => {
    // State to manage loading state
    // This will be used to show a loading spinner or message while fetching data
    const [isLoading, setIsLoading] = useState(false)

    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const handleSearch = async (searchTerms) => {
        setIsLoading(true); // Set loading state to true
        setError(null); // Reset error state
        setResults([]); // Clear previous results

    const action = snackbarId => (
  <>
    <button onClick={() => { closeSnackbar(snackbarId) }}>
      Dismiss
    </button>
  </>
);

        try {
          const data = await searchMovies(searchTerms);
            
          if (data.imdbID) {
                // Handle single result from an ID search
                setResults([data]);
            } else if (data.Search) {
                // Handle list of results from a title search
                setResults(data.Search);
            } else {
                // Handle cases where the API call was successful but found no movies
                setError(data.Error);
            }
        } catch (err) {
            setError(err.message || 'An error occurred while searching');
            enqueueSnackbar('No movies found with the specified criteria', {action, variant: 'warning' });
        } finally {
            setIsLoading(false);
        }
    };
    const handleAddToWatchlist = async (movie) => {
    // This function will be called when the user clicks "Add to Watchlist" on a movie card
    // hard coded userId for demonstration purposes
    const userId = 'user-123'; 
    const movieData = {
      userId: userId,
      movieId: movie.imdbID,
      title: movie.Title,
      posterPath: movie.Poster,
      year: movie.Year,
    };

    try {
      await addMovieToWatchlist(movieData);
      // Show a success message using the Snackbar
      enqueueSnackbar(`${movie.Title} added to your watchlist!`, {
        variant: 'success',
        action: (snackbarId) => (
          <button onClick={() => closeSnackbar(snackbarId)}>
            Dismiss
          </button>
        ),
      });
    } catch (err) {
      enqueueSnackbar(`Failed to add ${movie.Title} to watchlist`, {
        variant: 'error',
        action: (snackbarId) => (
          <button onClick={() => closeSnackbar(snackbarId)}>
            Dismiss
          </button>
        ),
      });
    }
  };

    return ( 
   <Box  sx={{ 
      width: '100%', 
     
    }}>
      {/* 1. Render the Search Form */}
      <SearchBoxForm onSearch={handleSearch} isLoading={isLoading} />

      {/* 2. Render the Results Area */}
      <Box sx={{ width: '100%', mt: 4 }}>
        
        {/* Render the MoviesGrid */}
        {isLoading ?  (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>
        ):
        <MoviesGrid 
            movies={results} 
            onAddToWatchlist={handleAddToWatchlist} 
        />}
      </Box>
    </Box>
        )
}