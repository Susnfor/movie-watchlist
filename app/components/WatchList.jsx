import MovieCard from "./MovieCard";
import { getWatchList, removeMovieFromWatchlist } from "../lib/apis";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import  CircularProgress  from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useSnackbar } from "notistack";

export default function WatchList() {
    const [watchlist, setWatchlist] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();


    const handleWatchList = async () => {
        setWatchlist([]); // Clear previous watchlist
        // Fetch the watchlist from the APIs/ mongoDB
        try {
            const watchlist = await getWatchList('user-123'); // Replace with actual user ID
            if (watchlist && watchlist.length > 0) {
                setWatchlist(watchlist);
            } 
            } catch (error) {
            console.error("Error fetching watchlist:", error);
            setError("Failed to fetch watchlist.");
            enqueueSnackbar('Failed to fetch watchlist.', {
                variant: 'error',
                action: (snackbarId) => (
                    <button onClick={() => closeSnackbar(snackbarId)}>
                        Dismiss
                    </button>
                )
            });
            return [];
        }
        finally {
            setIsLoading(false); // Set loading state to false after fetching
        }
    };
    // Call the function to get the watchlist
    useEffect(() => {
        handleWatchList()
    }, []);

    const handleremoveMovie = async (movieId) => {
        try {
            await removeMovieFromWatchlist(movieId, 'user-123'); 
            setWatchlist((prevWatchlist) =>
                prevWatchlist.filter((movie) => movie.movieId !== movieId) //remove the movie from the watchlist
            );
            enqueueSnackbar(`${watchlist.filter((movie) => movie.movieId === movieId)[0]?.title || 'Movie'} removed from watchlist successfully.`, {
                variant: 'success',
                action: (snackbarId) => (
                    <button onClick={() => closeSnackbar(snackbarId)}>
                        Dismiss
                    </button>
                )
            });

        } catch (error) {
            console.error("Error removing movie from watchlist:", error);
            setError("Failed to remove movie from watchlist.");
            enqueueSnackbar(`Failed to ${watchlist.filter((movie) => movie.movieId === movieId)[0]?.title || 'Movie'} movie from watchlist.`, {
                variant: 'error',
                action: (snackbarId) => (
                    <button onClick={() => closeSnackbar(snackbarId)}>
                        Dismiss
                    </button>
                )
            });
        }
    }

    // If there are no movies in the watchlist, display a message
    if (!watchlist || watchlist.length === 0) {
        return (
            <div>
                <h2>Your Watchlist is Empty</h2>
                <p>Search for movies to add to your watchlist.</p>
            </div>
        );
    }

    return (
       <Grid container 
            spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
            >
        {isLoading ? <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>:
        watchlist.map((watchlist, index) => (
            <Grid key={index}
               size={{ xs: 2, sm: 3}}   
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex"}}
            >
                <MovieCard key={watchlist.movieId} movie={{
                    Title: watchlist.title,
                    Year: watchlist.year,
                    Poster: watchlist.posterPath,
                    imdbID: watchlist.movieId
                }}
                onActionClick={() => handleremoveMovie(watchlist.movieId)}
                actionStyle={{ label: 'remove', variant: 'outlined', color: 'secondary' }}
                />
            </Grid>
        ))}

        </Grid>
    );
}