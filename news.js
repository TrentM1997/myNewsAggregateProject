
const apiKey = "f73e5e85e64145d3868ca9128f797d3a";
const suggestUrl = "https://newsapi.org/v2/top-headlines?country=us&apiKey=f73e5e85e64145d3868ca9128f797d3a";
const resultsContainer = document.querySelector('.results');
const performanceWindow = document.querySelector('.performance-window');
const pageSection = document.querySelector('div.show-pages');
//Pagination Variables
let currentPage = 1;
let perPage = 20;
let articlesData = [];
//SUGGEST ARTICLES ON LOADING THE PAGE
document.addEventListener("DOMContentLoaded", function () {
    fetchSuggestions(resultsContainer);

});

//GET TRENDING ARTICLES
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
                    card.classList.add('fade-in');

                    
                    if(article.urlToImage !== null) {
                    card.innerHTML = 
                    `
                        <img src="${article.urlToImage}">
                        <a href="${article.url}" target="_blank"><h2><span>${article.source.name}</span> - ${article.title}</h2></a><br>
                        `;
                    } else {
                    card.innerHTML = `
                    <img src="images/icon.PNG">
                        <a href="${article.url}" target="_blank"><h2><span>${article.source.name}</span> - ${article.title}</h2></a><br>
                        `;

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
    let endTime;
    let responseTime;
    let dataSize;

    fetch(url)
    .then(response => { //calculating metrics for performance 
   
      startTime = performance.now();
      dataSize = response.headers.get('Content-Length');
      const contentType = response.headers.get('Content-Type');
        console.log(`Content-Type: ${contentType}`);
      return response.json();
    })
    .then(data => {
        const totalResults = data.totalResults;
        const validFound = data.articles.filter(article => article.title !== "[Removed]");
        articlesData = validFound;
        console.log(articlesData.length);

    performanceWindow.innerHTML = ""; //clearning previous search metrics
  
    endTime = performance.now();
    responseTime = endTime - startTime;//response time of request 

      //create window for performance display
    const window = document.createElement('div');
      window.classList.add('records');
      window.innerHTML = `
      
      <p><span class = "record">Response Time: </span>${responseTime.toFixed(2)} m/s</p>
      <p><span class = "record">Total Results: </span>${totalResults}</p>
      `;
      performanceWindow.appendChild(window);//Need to figure out why this continuously 
      renderArticles(currentPage);//paginated view
      renderButtons();
      document.querySelector(pageButton).classList.add('active');
     
    })
    .catch(error => console.error("Error fetching data:", error));
});

//Performance Button
const metricsBtn = document.querySelector('.advanced');

metricsBtn.addEventListener("click", displayMetrics);//

function displayMetrics() {

  performanceWindow.classList.toggle('hidden');
  performanceWindow.classList.add('fade-in');


};

//PAGINATION

function renderArticles(page) {
    resultsContainer.innerHTML = "";
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const articlesToDisplay = articlesData.slice(startIndex, endIndex);

    console.log(articlesToDisplay.length);

    articlesToDisplay.forEach(article => {

            const card = document.createElement('div');
            card.classList.add('article-card');

            if(article.urlToImage !== null) {
                card.innerHTML = 
                `
                    <img src="${article.urlToImage}">
                    <a href="${article.url}" target="_blank"><h2><span>${article.source.name}</span> - ${article.title}</h2></a><br>
                    `;
                } else {
                card.innerHTML = `
                <img src="images/icon.PNG">
                    <a href="${article.url}" target="_blank"><h2><span>${article.source.name}</span> - ${article.title}</h2></a><br>
                    `;

                }
                  resultsContainer.appendChild(card);
                  card.classList.add('fade-in');
    });
   
}

function renderButtons() {
    const totalPages = Math.ceil(articlesData.length / perPage);

    pageSection.innerHTML = "";//Clearning the buttons created from previous searches

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('li');
        pageButton.classList.add('next-btn');
        pageButton.textContent = i;
        
        if(i == 1) {

            pageButton.classList.add('active');
        }

        pageButton.addEventListener('click', (function (currentPage) {
            return function () {
                // Remove 'active' class from all buttons
                document.querySelectorAll('.next-btn').forEach(btn => btn.classList.remove('active')); //critical difference: selecting all the buttons as opposed to just 1 being clicked on

                // Add 'active' class to the clicked button
                pageButton.classList.add('active');

                // Update currentPage
                renderArticles(currentPage);
            };
        })(i,pageButton));

        pageSection.appendChild(pageButton);
    }
}  



