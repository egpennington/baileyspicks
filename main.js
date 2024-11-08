// const apiKey = process.env.API_KEY
const apiKey = '288650c8'
let fetchTitle = ''
const addMovie = document.querySelectorAll(".add-movie")

function renderMovie(movieData) {    
    return `
        <div class="card-info">
            <div class="card-info-display">
                <img class="moviePoster" src="${movieData.Poster !== 'N/A' ? movieData.Poster : `/images/placeholder.jfif`}" 
                 alt="movie poster" 
                 onerror="this.onerror=null; this.src='placeholder.jfif';">
                
                <div class="movie-detail">
                    <div class="movie-detail-top">
                        <h3 class="title" data-imdbid="${movieData.imdbID}">${movieData.Title}</h3>
                        <div class="rating">
                            <p><i class="fa-solid fa-star star"></i> ${movieData.Ratings[0]?.Value || "N/A"}</p>                          
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

async function getMovieData(title) {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${title}`)
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

