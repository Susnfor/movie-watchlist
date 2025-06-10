import connectDB from "@/app/lib/connectDB"
import WatchListItem from "@/app/model/WatchListItem";
import { NextResponse } from "next/server";

//fetch watchlist items for a user
export async function GET(req) {
    await connectDB();

    try {
        //saves the search params from the request
        const { searchParams } = new URL(req.url);
        // then gets the userId from the search params
        const userId = searchParams.get('userId');

        // if userId is not provided, return an error response
        if (!userId) {
            // return a JSON response with a 400 status code
            return NextResponse.json({ message: "userId is required" }, { status: 400 });
        }

        // fetch watchlist items for the userId
        const items = await WatchListItem.find({ userId: userId  });
        console.log("Watchlist items fetched successfully for userId:", userId);
        return NextResponse.json(items, { status: 200 });

    }catch(e) {
        //this will catch any errors that occur during the connection to the database or fetching the watchlist items
        console.error("Error connecting to the database or fetching watchlist items:", e);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}


//create a watchlist item for a user
export async function POST(req){
    await connectDB();

    try{
        //get the data from the request body
        const {userId, movieId, title, posterPath, year} = await req.json();

        //if any of the required fields are missing, return an error response
        if (!userId || !movieId || !title) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        //create a new watchlist item
        const newItem = new WatchListItem({
            userId,
            movieId,
            title,
            posterPath,
            year
        });
        //save the new item to the database
        await newItem.save();
        console.log("Watchlist item created successfully for userId:", userId);
        return NextResponse.json(newItem, { status: 201 });


    }catch(e){
        //this will catch any errors that occur during the connection to the database or creating the watchlist item
        console.error("Error connecting to the database or creating watchlist item:", e);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}


export async function DELETE(req) {
    await connectDB();

    try{
        //saves the search params from the request
        const {searchParams} = new URL(req.url);
        //then gets the userId and movieId from the search params
        const userId = searchParams.get('userId');
        const movieId = searchParams.get('movieId');
        //if userId or movieId is not provided, return an error response
        if (!userId || !movieId) {
            return NextResponse.json({ message: "userId and movieId are required" }, { status: 400 });
        }
        //delete the watchlist item for the userId and movieId
        const deletedItem = await WatchListItem.findOneAndDelete({ userId: userId, movieId: movieId });
        //if the item is not found, return an error response
        if (!deletedItem) {
            return NextResponse.json({ message: "Watchlist item not found" }, { status: 404 });
        }
        console.log("Watchlist item deleted successfully for userId:", userId, "and movieId:", movieId);
        return NextResponse.json({ message: "Watchlist item deleted successfully" }, { status: 200 });



    }catch(e) {
        //this will catch any errors that occur during the connection to the database or deleting the watchlist item
        console.error("Error connecting to the database or deleting watchlist item:", e);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}