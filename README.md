# 🎬 Movie Watchlist Tracker

A full-stack web application built with Next.js that allows users to search for movies using the OMDB API, add them to a personal watchlist, and manage their selections. This project demonstrates a complete workflow from frontend user interaction to backend API routes and database management.

---

## ✨ Features

-   **Movie Search:** Search for movies, series, and episodes by title or IMDb ID.
-   **Advanced Search Options:** Filter searches by year and type (movie, series, etc.).
-   **Add to Watchlist:** Save movies from the search results to a personal watchlist.
-   **View Watchlist:** A dedicated page to view all movies saved to the watchlist.
-   **Remove from Watchlist:** Easily remove movies from the watchlist.
-   **Toast Notifications:** User-friendly, non-blocking notifications for actions like adding or removing movies.
-   **Responsive Design:** A clean, modern interface built with Material-UI that works on all screen sizes.

---

## 🛠️ Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/) (App Router)
-   **Frontend:** [React](https://reactjs.org/), [Material-UI (MUI)](https://mui.com/)
-   **Backend:** Next.js API Routes
-   **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
-   **External API:** [OMDB API](http://www.omdbapi.com/) for movie data
-   **Notifications:** [Notistack](https://notistack.com/)

---

## 🚀 Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

-   Node.js (v18 or later)
-   npm, yarn, or pnpm
-   A MongoDB database

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/susnfor/movie-watchlist.git](https://github.com/ysusnfor/movie-watchlist.git)
    cd movie-watchlist
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a new file named `.env.local` in the root of your project and add the following variables.

    ```env
    # Your MongoDB connection string
    DATABASE_URL="mongodb+srv://<user>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority"

    # Your API key from [http://www.omdbapi.com/apikey.asp](http://www.omdbapi.com/apikey.asp)
    OMDB_API_KEY="your_omdb_api_key"
    ```

### Running the Application

Once the setup is complete, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📂 Project Structure

-   `/app/api/`: Contains all backend API routes (`/search` and `/watchlist`).
-   `/app/components/`: Contains all reusable React components (`MovieCard`, `SearchBox`, `Watchlist`, etc.).
-   `/app/lib/`: Contains the database connection utility (`connectDB.js`) and the client-side API service (`apis.js`).
-   `/app/model/`: Contains the Mongoose schema for the watchlist items.
-   `/app/(pages)/`: Contains the page files (`/page.js`, `/watchlist/page.js`).

---

## 🔮 Future Improvements

-   **User Authentication:** Implement user accounts so that watchlists are truly private and persistent per user.
-   **Pagination:** Add pagination to the search results and watchlist pages.
-   **Movie Detail Page:** Create a dynamic page to show more detailed information about a single movie.
-   **Sorting & Filtering:** Allow users to sort and filter their watchlist (e.g., by year, by type).
