const apiKey = 'YOUR_API_KEY'; // Replace with your NewsAPI key
let page = 1;
let currentSearchTerm = '';

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const newsContainer = document.getElementById('newsContainer');
const loadMoreBtn = document.getElementById('loadMoreBtn');

// Fetch and display news articles
const apiKey = 'YOUR_GUARDIAN_API_KEY'; // Replace with your Guardian API key
const query = currentSearchTerm ? `&q=${currentSearchTerm}` : '';

const response = await fetch(`https://content.guardianapis.com/search?api-key=${apiKey}${query}&page=${page}&page-size=5&show-fields=thumbnail,headline,trailText,short-url`);
const data = await response.json();

if (data.response.results.length > 0) {
    renderNews(data.response.results);
}


// Render news articles in the DOM
function renderNews(articles) {
    articles.forEach(article => {
        const articleEl = document.createElement('article');
        
        const imageUrl = article.urlToImage || 'https://via.placeholder.com/300x200?text=No+Image';
        articleEl.innerHTML = `
            <img src="${imageUrl}" alt="${article.title}">
            <h2>${article.title}</h2>
            <p>${article.description || 'No description available'}</p>
            <p><strong>Source:</strong> ${article.source.name}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;
        
        newsContainer.appendChild(articleEl);
    });
}

// Handle search functionality
function handleSearch() {
    currentSearchTerm = searchInput.value;
    page = 1;
    newsContainer.innerHTML = ''; // Clear previous results
    fetchNews();
}

// Load more articles on button click
function loadMoreNews() {
    page++;
    fetchNews();
}

// Event listeners
searchBtn.addEventListener('click', handleSearch);
loadMoreBtn.addEventListener('click', loadMoreNews);

// Initial fetch (optional)
fetchNews();
