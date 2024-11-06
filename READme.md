# Bailey's Picks - Movie Search and Watchlist App

**Bailey's Picks** is a simple web application that allows users to search for movies, add selected titles to a personalized watchlist, and view their saved watchlist. The app leverages the [OMDb API](https://www.omdbapi.com/) to retrieve movie data and uses Local Storage to persist user watchlists across sessions.

## Project Overview

This app is part of the **Scrimba Bootcamp** solo project for **Module 8**. It is built with **HTML**, **CSS**, and **JavaScript** and demonstrates how to work with APIs and Local Storage.

- Scrimba fork [https://v1.scrimba.com/scrim/cof5c44e1b781bb0d685f9817]

## Features

- **Movie Search (index.html)**: Users can search for movies by title using the OMDb API, which displays the results dynamically.
- **Add to Watchlist**: Each movie result includes an "Add to Watchlist" button that allows users to save the movie to their watchlist in Local Storage.
- **Watchlist (watchlist.html)**: Users can view their saved movies on a separate watchlist page, displaying data pulled from Local Storage.

## Pages

### `index.html`
The main search page, where users can:
- Enter a movie title in the search bar.
- See a list of movies that match their search query, pulled from the OMDb API.
- Click the "Add to Watchlist" button for a movie to save it to Local Storage.

### `watchlist.html`
The watchlist page, where users can:
- View all saved movies that they previously added from the search page.
- Remove movies from the watchlist as needed.

## Technologies Used

- **HTML**: Structure of the web pages.
- **CSS**: Styling for the user interface.
- **JavaScript**: Functionality for API calls, data storage, and page interactivity.
- **OMDb API**: Provides movie data based on user search input.
- **Local Storage**: Stores the watchlist data locally for persistence across sessions.

## Setup Instructions

1. Clone this repository to your local machine.
2. Open `index.html` in your browser to use the search feature.
3. Use the search function and add movies to your watchlist.
4. Open `watchlist.html` to view and manage your watchlist.

## OMDb API

This app uses the [OMDb API](https://www.omdbapi.com/) to retrieve movie data. You may need an API key from OMDb to enable the search functionality. Replace `YOUR_API_KEY` in the JavaScript code with your actual key.

## How to Use

1. **Search for a Movie**:
   - Go to `index.html` and enter a movie title in the search bar.
   - Results will display movies matching the title you entered.

2. **Add to Watchlist**:
   - Click the "Add to Watchlist" button on any movie you want to save.
   - The movie will be added to Local Storage and will appear on the `watchlist.html` page.

3. **View Your Watchlist**:
   - Go to `watchlist.html` to view your saved movies.
   - Here, you can see all the movies you added to your watchlist.

## License

This project is a practice assignment and is for educational purposes only as part of the Scrimba Bootcamp.

---

Happy movie hunting with **Bailey's Picks**! "Fetching your next must-watch."
