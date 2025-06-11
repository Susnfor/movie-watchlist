import { NextResponse } from 'next/server';

export async function GET(req) {
    //search for movie by title
    const apiKey = process.env.OMDB_API_KEY;
        if (!apiKey) {
            console.error("OMDB_API_KEY is not defined in environment variables.");
            return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
        }
        const { searchParams } = new URL(req.url);
        const title = searchParams.get('s');
        const imdbId = searchParams.get('i');
        const year = searchParams.get('y');
        const type = searchParams.get('type');

        const url = new URL('https://www.omdbapi.com/');
        url.searchParams.set('apikey', apiKey);

        //if imdbId is provided, fetch movie details by imdbId, else if title is provided, fetch movie details by title
        if (imdbId) {
            url.searchParams.set('i', imdbId);
        }
        else if (title) {
            url.searchParams.set('s', title); 

            //these are optional parameters
            if (year) {
                url.searchParams.set('y', year);
            }
            if (type) {
                url.searchParams.set('type', type);
            }
            
        } else {
            return NextResponse.json({ message: "Title or IMDb ID is required" }, { status: 400 });
        }
    try {
        
        //fetch data from the OMDB API
        //this will return a list of movies that match the title
        const response = await fetch(url);
        const data = await response.json();

        //if there are no results, return an error response
        if (data.Response === "False") {
            return NextResponse.json({ message: data.Error }, { status: 404 });
        }

        return NextResponse.json(data, { status: 200 });


    } catch(e) {
        //this will catch any errors that occur during the fetch request
        //such as network errors or issues with the OMDB API   
        console.error("Error fetching data from OMDB API:", e);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }


}