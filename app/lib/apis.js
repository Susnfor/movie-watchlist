// this is the service layer for the application
// it will handle the API calls to the backend
// so i can use it in the components, and keep compoenents clean 
// and focused on rendering the UI


const API_BASE_URL = '/api'; // Using a relative path

export const searchMovies = async (searchTerms) => {
    const {title, imdbId, year, type} = searchTerms
        try {
            // URLSearchParams is used to construct a query string for the API request
            // It allows to easily append parameters to the URL
            const params = new URLSearchParams();

            if (imdbId) {
                params.set('i', imdbId);
            } else if (title) {
                params.set('s', title);
                // Optional parameters
                if (year) {
                    params.set('y', year);
                }
                if (type) {
                    params.set('type', type);
                }
            } else {
                throw new Error("Title or IMDb ID is required");
            }

        // Construct the final URL string. fetch() can handle this relative path.
        const url = `${API_BASE_URL}/search?${params.toString()}`;
        // const url = '/api/search?s=Matrix&y=1999'
         // DEBUG: Log the URL to the browser console
        console.log("Attempting to fetch:", url);


        // Fetch data from the OMDB API
         const response = await fetch(url);
        
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || data.Error || 'Failed to fetch movies');
        }
        console.log("Data fetched successfully:", data);
        return data;
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