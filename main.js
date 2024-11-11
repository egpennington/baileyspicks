// const apiKey = process.env.API_KEY
const apiKey = '288650c8'
let fetchTitle = ''
const addMovie = document.querySelectorAll(".add-movie")
const searchMessage = document.getElementById("search-message")

function renderMovie(movieData) {    
    return `
        <div class="card-info">
            <div class="card-info-display">
                <div class="movie-title-rate">   
                    <img class="moviePoster" src="${movieData.Poster !== 'N/A' ? movieData.Poster : `/images/placeholder.jfif`}" 
                    alt="movie poster" 
                    onerror="this.onerror=null; this.src='placeholder.jfif';">
                                    
                    <div class="movie-detail-top">
                        <h3 class="title" data-imdbid="${movieData.imdbID}">${movieData.Title}</h3>
                            <div class="rating">
                                <p><i class="fa-solid fa-star star"></i> ${movieData.Ratings[0]?.Value || "N/A"}</p>                          
                            </div>                                               
                    </div>

                    <div class="movie-detail-bottom">
                        <p>${movieData.Plot}</p>
                    </div> 
                </div>

                <div class="movie-detail">
                    <div class="movie-detail-middle">
                        <p class="length">${movieData.Runtime}</p>
                        <p class="genre">${movieData.Genre}</p>
                        <button class="add-movie">
                            <i class="fa-solid fa-circle-plus fa-sm"></i> Watchlist
                        </button>
                    </div>
                                  
                </div>
            </div>              
        </div>
    `
}

async function getMovieData(title) {
    try{ 
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
    } catch(err) {
        console.log("something went wrong", err)
        document.getElementById("cards-display").innerHTML = `
            <div class="bg-image">
                <svg class="background" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg><br>
                <p id="search-message">...MOVIE NOT FOUND...</p>
            </div>
            `
    }
}

function addMovieToLocalStorage() {
    document.querySelectorAll(".add-movie").forEach(button => {
        button.addEventListener("click", (e) => {
            const movieElement = e.target.closest(".card-info");

            if (!movieElement) {
                console.error("Parent .card-info not found for the clicked button.");
                return;
            }

            const movie = {
                imdbID: movieElement.querySelector(".title").dataset.imdbid,
                Title: movieElement.querySelector(".title").textContent,
                Poster: movieElement.querySelector(".moviePoster").src,
                Rating: movieElement.querySelector(".rating p").textContent,
                Runtime: movieElement.querySelector(".length").textContent,
                Genre: movieElement.querySelector(".genre").textContent,
                Plot: movieElement.querySelector(".movie-detail-bottom p").textContent
            };

            let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

            const originalText = button.innerHTML;

            if (!watchlist.some(watchlistMovie => watchlistMovie.imdbID === movie.imdbID)) {
                watchlist.push(movie);
                button.innerHTML = '<i class="fa-solid fa-circle-check fa-sm"></i> Added';
                localStorage.setItem("watchlist", JSON.stringify(watchlist));
            } else {
                button.innerHTML = '<i class="fa-solid fa-circle-check fa-sm"></i> Already added';
            }
            setTimeout(() => {
                button.innerHTML = originalText;
            }, 1500);
        });
    });
}

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const cardsDisplay = document.querySelector('.cards-display')
    cardsDisplay.innerHTML = ''    
    cardsDisplay.classList.add('search-active')    
    fetchTitle = document.getElementById("search-name").value
    getMovieData(fetchTitle)
    this.reset()
})

document.getElementById("background-focus").addEventListener("click", function() {
    document.getElementById("search-name").focus()
})