// 288650c8
const apiKey = `288650c8`
let fetchTitle = ''
const watchlistDisplay = document.getElementById("watchlist-display")
const addMovie = document.querySelectorAll(".add-movie")
console.log("Bailey, fetch!")

function renderMovie(movieData) {    
    return `
        <div class="card-info">
            <img class="moviePoster" src="${movieData.Poster}" alt="movie poster">
            <div class="movie-detail">
                <div class="movie-detail-top">
                    <h3 class="title">${movieData.Title}</h3>
                    <div class="rating">
                        <p><i class="fa-solid fa-star star"></i> ${movieData.Ratings[0]?.Value || "N/A"}</p>                          
                    </div>                                               
                </div>
                <div class="movie-detail-middle">
                    <p class="length">${movieData.Runtime}</p>
                    <p class="genre">${movieData.Genre}</p>
                    <button class="add-movie">
                        <i class="fa-solid fa-circle-plus fa-sm"></i><span id="message"> Watchlist</span>
                    </button>
                </div>
                <div class="movie-detail-bottom">
                    <p>${movieData.Plot}</p>
                </div>               
            </div>                
        </div>
    `
}

async function getMovieData(title) {
    const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${title}`)
    const data = await res.json()

    document.getElementById("cards-display").innerHTML = ""

    const movies = data.Search

    for (let movie of movies) {
        const movieDetail = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`)
        const movieData = await movieDetail.json()
        
        document.getElementById("cards-display").innerHTML += renderMovie(movieData)
    }
    addMovieToLocalStorage()
}

function addMovieToLocalStorage() {
    document.querySelectorAll(".add-movie").forEach(button => {
        button.addEventListener("click", (e) => {
            const movieElement = e.target.closest(".card-info")
            if (!movieElement) {
                console.error("Parent .card-info not found for the clicked button.");
                return
            }

            const movie = {
                Title: movieElement.querySelector(".title").textContent,
                Poster: movieElement.querySelector(".moviePoster").src,
                Rating: movieElement.querySelector(".rating p").textContent,
                Runtime: movieElement.querySelector(".length").textContent,
                Genre: movieElement.querySelector(".genre").textContent,
                Plot: movieElement.querySelector(".movie-detail-bottom p").textContent
            }

            let watchlist = JSON.parse(localStorage.getItem("watchlist")) || []

            if (!watchlist.some(watchlistMovie => watchlistMovie.Title === movie.Title)){
                                    
                watchlist.push(movie)
                localStorage.setItem("watchlist", JSON.stringify(watchlist))
                } else {
                console.log("Movie is already in the watchlist.")                
                }
            })            
    })
}

function renderWatchlist(movieData) {
    const ratingValue = movieData.Ratings?.[0]?.Value || "N/A"
    return `
        <div class="card-info">
            <img class="moviePoster" src="${movieData.Poster}" alt="movie poster">
            <div class="movie-detail">
                <div class="movie-detail-top">
                    <h3 class="title">${movieData.Title}</h3>
                    <div class="rating">
                        <p><i class="fa-solid fa-star star"></i> ${ratingValue}</p>                          
                    </div>                                               
                </div>
                <div class="movie-detail-middle">
                    <p class="length">${movieData.Runtime}</p>
                    <p class="genre">${movieData.Genre}</p>
                    <button id="delete-movie" class="delete-movie">
                        <i class="fa-solid fa-circle-minus fa-sm"></i> Remove
                    </button>
                </div>
                <div class="movie-detail-bottom">
                    <p>${movieData.Plot}</p>
                </div>               
            </div>                
        </div>
    `
}

function loadWatchlist() {
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || []
    watchlistDisplay.innerHTML = ""   

    watchlist.forEach(movieData => {
         watchlistDisplay.innerHTML += renderWatchlist(movieData)
    })
}

document.addEventListener("DOMContentLoaded", loadWatchlist)

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const cardsDisplay = document.querySelector('.cards-display')
    cardsDisplay.innerHTML = ''    
    cardsDisplay.classList.add('search-active')    
    fetchTitle = document.getElementById("search-name").value
    getMovieData(fetchTitle)
    this.reset()
})
