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

function getMovieData(title) {
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${title}`)
        .then(res => res.json())
        .then(data => {
            data.Search.forEach(movie => {
                document.getElementById("cards-display").innerHTML += `
                    <div class="card-info">
                        <img class="moviePoster" src="${movie.Poster}" alt="movie poster">
                        <div class="movie-detail">
                            <div class="movie-detail-top">
                                <h3 class="title">${movie.Title}</h3>
                                <div class="rating">
                                    <p><i class="fa-solid fa-star star"></i> Rating not available here</p>                          
                                </div>                                               
                            </div>
                            <div class="movie-detail-middle">
                                <p id="year">Year: ${movie.Year}</p>
                                <p id="type">Type: ${movie.Type}</p>
                                <p id="add-movie" class="add-movie"><i class="fa-solid fa-circle-plus fa-sm"></i> watchlist</p>
                            </div>                  
                        </div>                
                    </div>
                `
            })
        })
}