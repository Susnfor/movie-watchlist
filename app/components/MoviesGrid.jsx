import MovieCard from "./MovieCard"
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


export default function MoviesGrid({onAddToWatchlist, movies}) {

     // If there are no movies, display a message to the user
    if (!movies || movies.length === 0) {
        return (
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography>Search for movies to see results here.</Typography>
            </Box>
        );
    }

    return (
       
            <Grid container 
            spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
            >
  {movies.map((movie) => (
                <Grid key={movie.imdbID} 
                size={{ xs: 2, sm: 3}}   
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex"}}
                    >
                <MovieCard key={movie.imdbID} movie={movie} 
                onActionClick={onAddToWatchlist} actionStyle={"add"}
                />
                </Grid>
            ))}
</Grid>
   
    );

}