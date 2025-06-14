'use client'
import { useState } from 'react'
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Select from "@mui/material/Select"
import Box from "@mui/material/Box"
import MenuItem from "@mui/material/MenuItem"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import CircularProgress from "@mui/material/CircularProgress"


export default function SearchBoxForm( {onSearch, isLoading}) {
    //this will hold the type of movie to search for, such as movie, series, or episode
    const [type, setType] = useState('')
    const [title, setTitle] = useState('')
    const [imdbId, setImdbId] = useState('')
    const [year, setYear] = useState('')

     const isTitleSearchInvalid = !imdbId && title.trim().length > 0 && title.trim().length < 3;

    // Function to handle form submission, call searchMovies (will pass it down as prop)
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        // Check if either title or imdbId is provided
        if (title === '' && imdbId === '') {
            alert('Please enter a Title or IMDB ID');
            return;
        }
        if (isTitleSearchInvalid) return;
        // Call the onSearch function with the current state values
        onSearch({ title, imdbId, year, type });
     }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, width: '100%', justifyContent: 'center'}}>
            <TextField
                id="outlined-basic"
                label="Movie Title"
                variant="outlined"
                value={title}
                error={isTitleSearchInvalid}
                helperText={isTitleSearchInvalid ? "Please enter at least 3 characters for a title search." : ""}
                onChange={(e) => {
                    //set the title of the movie to search for
                    setTitle(e.target.value)
                }}
        />
            <TextField
                id="outlined-basic"
                label="IMBD ID"
                variant="outlined"
                value={imdbId}
                onChange={(e) => {
                    //set the imdb id of the movie to search for
                    setImdbId(e.target.value)
                }}
            />
            <TextField
                id="outlined-number"
                label="Year"
                type="number"
                variant="outlined"
                // The year field is optional, so it can be left empty, disabled if imdbId is provided
                disabled={isLoading || imdbId} 
                value={year}
                    onChange={(e) => {
                        //set the year of the movie to search for
                        setYear(e.target.value)
                    }}
            />

            <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="type-select-label">Type</InputLabel>
            <Select 
                value={type}
                label="Type"
                // The type field is optional, so it can be left empty, disabled if imdbId is provided
                disabled={isLoading || imdbId} 
                onChange={(e) => {
                    //set the type of movie to search for
                    setType(e.target.value)
            }}>
                <MenuItem value={''}>(Select Type)</MenuItem>
                <MenuItem value={'movie'}>Movie</MenuItem>
                <MenuItem value={'series'}>Series</MenuItem>
                <MenuItem value={'episode'}>Episode</MenuItem>
            </Select>
            </FormControl>


        <Button
        variant="outlined"
        type="submit"
        > {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Search'}</Button>

        </Box>
    )
}