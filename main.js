// 288650c8
const apiKey = `288650c8`
let fetchTitle = ''
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
                        <i class="fa-solid fa-circle-plus fa-sm"></i> Watchlist
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
    const movies = data.Search

    for (let movie of movies) {
        const movieDetail = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`)
        const movieData = await movieDetail.json()
        
        document.getElementById("cards-display").innerHTML += renderMovie(movieData)
    }
    document.querySelectorAll(".add-movie").forEach(button => {
        button.addEventListener("click", (e) => {
            console.log("Movie added to watchlist:", e.target.closest(".card-info").querySelector(".title").textContent)
        })
    })
}

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const cardsDisplay = document.querySelector('.cards-display')
    cardsDisplay.innerHTML = ''    
    cardsDisplay.classList.add('search-active')    
    fetchTitle = document.getElementById("search-name").value;
    console.log("Search term:", fetchTitle);
    getMovieData(fetchTitle)
    this.reset()
})