const apiKey = '3c3fb31fcfaf44b5bb58dc43fe3e4f65'; // Replace with your NewsAPI key
let page = 1;
let currentCategory = '';
let currentSearchTerm = '';

const newsContainer = document.getElementById('newsContainer');
const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');
const loadMoreBtn = document.getElementById('loadMoreBtn');

// Fetch and display news articles
async function fetchNews() {
    const query = currentSearchTerm ? `&q=${currentSearchTerm}` : '';
    const category = currentCategory ? `&category=${currentCategory}` : '';

    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us${category}${query}&pageSize=6&page=${page}&apiKey=${apiKey}`);
    const data = await response.json();

    if (data.articles.length > 0) {
        renderNews(data.articles);
    } else {
        loadMoreBtn.style.display = 'none';
    }
}

// Render news articles in the DOM
function renderNews(articles) {
    articles.forEach(article => {
        const articleEl = document.createElement('article');
        articleEl.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'p-6', 'hover:shadow-lg', 'transition', 'duration-300', 'transform', 'hover:-translate-y-1');
        
        // Set default image if no image available
        const imageUrl = article.urlToImage ? article.urlToImage : 'https://via.placeholder.com/300x200?text=No+Image';

        articleEl.innerHTML = `
            <img src="${imageUrl}" alt="${article.title}" class="w-full h-40 object-cover rounded-lg mb-4">
            <h2 class="text-xl font-bold text-indigo-600 mb-2">${article.title}</h2>
            <p class="text-sm text-gray-600 mb-4">${article.description || 'No description available'}</p>
            <p class="text-sm text-gray-500">Source: ${article.source.name}</p>
            <p class="text-sm text-gray-500">Author: ${article.author || 'Unknown'}</p>
            <p class="text-sm text-gray-500">Published: ${new Date(article.publishedAt).toLocaleDateString()}</p>
            <a href="${article.url}" target="_blank" class="text-indigo-500 hover:text-indigo-700 mt-4 block">Read more...</a>
        `;
        newsContainer.appendChild(articleEl);
    });
}

// Handle search and category filter
function handleSearchAndFilter() {
    page = 1;
    newsContainer.innerHTML = ''; // Clear previous results
    currentSearchTerm = searchInput.value;
    currentCategory = categorySelect.value;
    fetchNews();
}

// Load more news articles
function loadMoreNews() {
    page++;
    fetchNews();
}

// Event listeners
searchInput.addEventListener('input', handleSearchAndFilter);
categorySelect.addEventListener('change', handleSearchAndFilter);
loadMoreBtn.addEventListener('click', loadMoreNews);

// Initial fetch
fetchNews();
