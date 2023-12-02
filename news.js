
const apiKey = "f73e5e85e64145d3868ca9128f797d3a";
const suggestUrl = "https://newsapi.org/v2/top-headlines?country=us&apiKey=f73e5e85e64145d3868ca9128f797d3a";
const resultsContainer = document.querySelector('.results');
//SUGGEST ARTICLES ON LOADING THE PAGE
document.addEventListener("DOMContentLoaded", function () {
    fetchSuggestions(resultsContainer);

});



function fetchSuggestions() {
    fetch(suggestUrl)
        .then(response => response.json()) //Looking to record my response size as part of the "Performance" Mode of the app
        .then(data => {
            const maxSuggestions = 15;

            


            if (data.articles && data.articles.length > 0) {
                const validArticles = data.articles
                    .filter(article =>article.title !== null && article.title !== "[Removed]")
                    .slice(0, maxSuggestions);

                console.log(validArticles.length);

               
               

                validArticles.forEach(article => {
                    const card = document.createElement('div');
                    card.classList.add('article-card');
                    
                    if(article.urlToImage !== null) {
                    card.innerHTML = 
                    `
                        <img src="${article.urlToImage}">
                        <a href="${article.url}" target="_blank"><h2>${article.title}</h2></a><br>
                        <p>${article.description}</p>`;
                    } else {
                    card.innerHTML = `
                    <img src="images/fallback.jpg">
                        <a href="${article.url}" target="_blank"><h2>${article.title}</h2></a><br>
                        <p>${article.description}</p>`;

                    }
                   // console.log(`${article.title}`);
                    resultsContainer.appendChild(card);
                });

                if (validArticles.length === 0) {
                    console.log("No valid articles found");
                }
            } else {
                console.log("No articles found");
            }
        });
}

//SEARCH FOR ARTICLES
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

            const validFound = data.articles.filter(article => article.title !== "[Removed]");

            validFound.forEach(article => { // accessing the data.articles array here from the JSON response I no longer need to access them in my innerHTML

                if (articlesShown < maxArticles) {

                    const card = document.createElement('div');
                    card.classList.add('article-card')

                    if(article.urlToImage !== null) {
                      card.innerHTML = 
                      `
                          <img src="${article.urlToImage}">
                          <a href="${article.url}" target="_blank"><h2>${article.title}</h2></a><br>
                          <p>${article.description}</p>`;
                      } else {
                      card.innerHTML = `
                      <img src="images/fallback.jpg">
                          <a href="${article.url}" target="_blank"><h2>${article.title}</h2></a><br>
                          <p>${article.description}</p>`;
  
                      }
                   
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



