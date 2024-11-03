// 288650c8
const apiKey = `288650c8`
let fetchTitle = '';
console.log("Bailey, fetch!")

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    fetchTitle = document.getElementById("search-name").value;
    console.log("Search term:", fetchTitle);
    getMovieData(fetchTitle)
    this.reset()
});

async function getMovieData(title) {
    const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${title}`)
    const data = await res.json()
    data.Search.forEach(async (movie) => {
        const movieDetail = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`)
        const movieData = await movieDetail.json()
        console.log(movieData)
        document.getElementById("cards-display").innerHTML += `
            <div class="card-info">
                <img class="moviePoster" src="${movieData.Poster}" alt="movie poster">
                <div class="movie-detail">
                    <div class="movie-detail-top">
                        <h3 class="title">${movieData.Title}</h3>
                        <div class="rating">
                        <p><i class="fa-solid fa-star star"></i> ${movieData.Ratings[0].Value}</p>                          
                    </div>                                               
                </div>
                <div class="movie-detail-middle">
                        <p id="length">${movieData.Runtime}</p>
                        <p id="genre">${movieData.Genre}</p>
                        <p id="add-movie" class="add-movie"><i class="fa-solid fa-circle-plus fa-sm"></i> watchlist</p>
                    </div>
                    <div class="movie-detail-bottom">
                        <p>${movieData.Plot}</p>
                    </div>               
            </div>
            `
    })
}