console.log("Bailey, fetch!")

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const searchName = document.getElementById("search-name").value;
    console.log("Search term:", searchName); 
});