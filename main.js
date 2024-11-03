// 288650c8
const apiKey = `288650c8`
const title = 'start-up';
console.log("Bailey, fetch!")

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const searchName = document.getElementById("search-name").value;
    console.log("Search term:", searchName);
});

function getMovieData() {
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${title}`)
        .then(res => res.json())
        .then(data => {
            
            console.log(data.Poster)
            console.log(data.Plot)
        })
}

function getMoviePoster() {
    fetch(`http://img.omdbapi.com/?apikey=${apiKey}&t=${title}`)
        .then(res => res.json())
    .then(data => {
        console.log(data)
    })
}

// https://www.omdbapi.com/?i=tt3896198&apikey=288650c8

getMovieData()