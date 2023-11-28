
const apiKey = "f73e5e85e64145d3868ca9128f797d3a";
const suggestUrl = "https://newsapi.org/v2/top-headlines?country=us&apiKey=f73e5e85e64145d3868ca9128f797d3a";
const resultsContainer = document.querySelector('.results');
//SUGGEST ARTICLES UPON LOADING THE PAGE
document.addEventListener("DOMContentLoaded", function () {
    fetchSuggestions(resultsContainer);

});

function fetchSuggestions() {
    fetch(suggestUrl)
    .then(response =>response.json())
    .then(data => {

        const maxSuggestions = 20;
        let suggestionsShown = 0;//counter variable

        console.log(data);

        if(data.articles && data.articles.length > 0) {
            data.articles.forEach(article => { // accessing the data.articles array here from the JSON response I no longer need to access them in my innerHTML
                if (suggestionsShown < maxSuggestions) {

                    const card = document.createElement('div');
                    card.classList.add('article-card')
                    card.innerHTML= `
                        <img src = "${article.urlToImage}">
                        <a href = "${article.url}" target= "_blank"><h2>${article.title}</h2></a><br>
                        <p>${article.description}</p>`; //here we can just use the individual article variable from the forEach loop and print from there
                        resultsContainer.appendChild(card);
                        suggestionsShown++;
                } else {

                    return;//break the loop once the max number of articles is exceeded
                }
            })
           
        } else {
            console.log("No articles Found");
        }
       
    })
}

//SEARCH FOR ARTICLES
console.log('Adding event listener');
document.getElementById('searchForm').addEventListener('submit', function(event) {

    event.preventDefault();

    const input = document.getElementById('bar').value;

    const apiKey = "f73e5e85e64145d3868ca9128f797d3a";
    const url = `https://newsapi.org/v2/everything?q=${input}&from=2023-11-27&sortBy=popularity&apiKey=${apiKey}`;
    // inserting my variable input(const input) into the query parameters, and inserting my apiKey variable(const apiKey) into the query parameters

    fetch(url)
    .then(response => response.json())
    .then(data => {

        
        resultsContainer.innerHTML = "";//clearing the previous articles

        let articlesShown = 0;
        const maxArticles = 20;//defining the max articles allowed

        if(data.articles && data.articles.length > 0) {
            data.articles.forEach(article => { // accessing the data.articles array here from the JSON response I no longer need to access them in my innerHTML
                if (articlesShown < maxArticles) {

                    const card = document.createElement('div');
                    card.classList.add('article-card')
                    card.innerHTML= `
                        <img src = "${article.urlToImage}">
                        <a href = "${article.url}" target= "_blank"><h2>${article.title}</h2></a><br>
                        <p>${article.description}</p>`; //here we can just use the individual article variable from the forEach loop and print from there
                        resultsContainer.appendChild(card);
                        articlesShown++;
                } else {

                    return;//break the loop once the max number of articles is exceeded
                }
            })
           
        } else {
            console.log("No articles Found");
        }
    })
    .catch(error => console.error("Error fetching data:", error));
});



