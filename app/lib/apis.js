// this is the service layer for the application
// it will handle the API calls to the backend
// so i can use it in the components, and keep compoenents clean 
// and focused on rendering the UI


const API_BASE_URL = '/api'; // Using a relative path

export const searchMovies = async (searchTerms) => {
    const {title, imdbId, year, type} = searchTerms
    try {
        // Construct the URL with search parameters
        const url = new URL(`${API_BASE_URL}/search`);
        if (imdbId) {
            url.searchParams.set('i', imdbId);
        } else if (title) {
            url.searchParams.set('s', title);
            // Optional parameters
            if (year) {
                url.searchParams.set('y', year);
            }
            if (type) {
                url.searchParams.set('type', type);
            }
        } else {
            throw new Error("Title or IMDb ID is required");
        }
        // Fetch data from the OMDB API
        const response = await fetch(url);
        // Check if the response is successful
        // If the response is not ok, throw an error with the message from the API
        // Note for me: response.ok is true only for successful status codes (200-299).
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch movies');
            }
        
        return response.json();
        }
    catch (error) {
        //when the fetch() request fails to reach the server
            console.error("Error fetching data in searchMovies", error);
            throw error
        
        
        }}

export const getWatchList = async (userId) => {
    try {
    // Fetch watchlist items for a specific user. 
    //fetch from the API endpoint, it'll expect a userId to be passed in
    //needs to be in url as api endpoint is expecting a userId parameter
    const response = await fetch(`${API_BASE_URL}/watchlist?userId=${userId}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch watchlist: ${response.statusText}`);
    }
     // If the response is successful, return the watchlist items
        //parse the response as JSON
        const watchlist = await response.json();
        return watchlist;      

    } catch (error) {
        //when the fetch() request fails to reach the server
        console.error("Error in getWatchList", error);
        throw error;
    }
}

export const addMovieToWatchlist = async (movieData) => {
    try {
        //doesnt need userId as it will be passed in the body of the request
        const response = await fetch(`${API_BASE_URL}/watchlist`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieData),
        });
        // Check if the response is successful
        if (!response.ok) {
            // If the response is not ok, throw an error with the message from the API
            throw new Error(`Failed to add movie to watchlist: ${response.statusText}`);
        }
         // If the response is successful, parse the JSON data
            const newItem = await response.json();
            return newItem;

    } catch(error) {
        //when the fetch() request fails to reach the server
        console.error("Error in addMovieToWatchlist", error);
        throw error
    }
}

export const removeMovieFromWatchlist = async (movieId, userId) => {
    try{
         //expecting it to be passed as query parameters
    const response = await fetch(`${API_BASE_URL}/watchlist?movieId=${movieId}&userId=${userId}`, {
        method: 'DELETE',
    });
    // Check if the response is successful
    if (!response.ok) {
        // If the response is not ok, throw an error with the message from the API
        throw new Error(`Failed to remove movie from watchlist: ${response.statusText}`);

    }
     // If the response is successful, parse
        const deletedItem = await response.json();
        return deletedItem;

    } catch (error) {
        console.error("Error in removeMovieFromWatchlist", error);
        throw error;
    }
}