const watchlistDisplay = document.getElementById("watchlist-display")

function renderWatchlist(movieData) {
    const ratingValue = movieData.Ratings?.[0]?.Value || "N/A"
    return `
        <div class="card-info">
            <div class="card-info-display">
                <img class="moviePoster" src="${movieData.Poster}" alt="movie poster">
                <div class="movie-detail">
                    <div class="movie-detail-top">
                        <h3 class="title" data-imdbid="${movieData.imdbID}">${movieData.Title}</h3>
                        <div class="rating">
                            <p><i class="fa-solid fa-star star"></i> ${ratingValue || "N/A"}</p>                          
                        </div>                                               
                    </div>
                    <div class="movie-detail-middle">
                        <p class="length">${movieData.Runtime}</p>
                        <p class="genre">${movieData.Genre}</p>
                        <button class="delete-movie">
                            <i class="fa-solid fa-circle-minus fa-sm"></i></i> Delete
                        </button>
                    </div>
                    <div class="movie-detail-bottom">
                        <p>${movieData.Plot}</p>
                    </div>               
                </div>
            </div>              
        </div>
    `
}

function loadWatchlist() {
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || []
    const watchlistDisplay = document.getElementById("watchlist-display")

    watchlistDisplay.innerHTML = ''

    if (watchlist.length === 0) {
         watchlistDisplay.innerHTML = `
            <div class="bg-image">
            <a href="index.html">
                <svg class="background" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 96C0 60.7 28.7 32 64 32l384 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM48 368l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM48 240l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM48 112l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16L64 96c-8.8 0-16 7.2-16 16zM416 96c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM160 128l0 64c0 17.7 14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-64c0-17.7-14.3-32-32-32L192 96c-17.7 0-32 14.3-32 32zm32 160c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-64c0-17.7-14.3-32-32-32l-128 0z"/></svg>
            </a>
                <p id="search-message">...Add movies...</p>
            
            </div>
            `
        } else {
             watchlist.forEach(movieData => { 
                watchlistDisplay.innerHTML += renderWatchlist(movieData)
        })
    }

    removeMovieFromLocalStorage()
}

document.addEventListener("DOMContentLoaded", loadWatchlist)

function removeMovieFromLocalStorage() {
    document.querySelectorAll(".delete-movie").forEach(button => {
        button.addEventListener("click", (e) => {
            console.log("Movie  deleted")
            const movieElement = e.target.closest(".card-info")

            if (!movieElement) {
                console.error("Parent .card-info not found for the clicked button.")
                return
            }

            let watchlist = JSON.parse(localStorage.getItem("watchlist")) || []

            const movieTitle = movieElement.querySelector(".title").textContent
            watchlist = watchlist.filter(movie => movie.Title !== movieTitle)

            localStorage.setItem("watchlist", JSON.stringify(watchlist))

            const originalText = button.innerHTML            
            button.innerHTML = '<i class="fa-solid fa-circle-xmark fa-sm"></i> Deleted'
            button.style.color = "red"

            setTimeout(() => {
                movieElement.remove();
                button.innerHTML = originalText

                if (watchlist.length === 0) { const watchlistDisplay = document.getElementById("watchlist-display"); watchlistDisplay.innerHTML = `
                    <div class="bg-image"> <a href="index.html"> <svg class="background" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> <path d="M0 96C0 60.7 28.7 32 64 32l384 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM48 368l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM48 240l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM48 112l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16L64 96c-8.8 0-16 7.2-16 16zM416 96c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM160 128l0 64c0 17.7 14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-64c0-17.7-14.3-32-32-32L192 96c-17.7 0-32 14.3-32 32zm32 160c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-64c0-17.7-14.3-32-32-32l-128 0z"/></svg> </a> <p>...Add movies...</p> </div> 
                    `
                }
            }, 500)
        })
    })
}