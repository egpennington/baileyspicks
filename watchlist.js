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
                        <button class="add-movie">
                            <i class="fa-solid fa-circle-plus fa-sm"></i> Watchlist
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
    watchlistDisplay.innerHTML = ""
    
    if (watchlist.length === 0) {
        watchlistDisplay.classList.remove('hide-icon')
    } else {
        watchlistDisplay.classList.add('hide-icon')
    }

    watchlist.forEach(movieData => {
         watchlistDisplay.innerHTML += renderWatchlist(movieData)
    })

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
            }, 500)
        })
    })
}
