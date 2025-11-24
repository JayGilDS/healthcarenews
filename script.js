// API Configuration
const API_KEY = '3e37329fd0ec4d75ac4a1e28ad585900';
const API_BASE_URL = 'https://api.worldnewsapi.com';

// DOM Elements
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('errorMessage');
const newsGrid = document.getElementById('newsGrid');

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}

function getImageUrl(imageUrl) {
    if (!imageUrl) {
        return 'https://via.placeholder.com/400x200?text=No+Image+Available';
    }
    return imageUrl;
}

function truncateText(text, maxLength = 150) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength).trim() + '...';
}

function capitalizeCategory(category) {
    if (!category) return 'General';
    return category.charAt(0).toUpperCase() + category.slice(1);
}

// Main function to create news card HTML
function createNewsCard(article) {
    const imageUrl = getImageUrl(article.image);
    const publishDate = formatDate(article.publish_date);
    const summary = article.summary || truncateText(article.text || '', 150);
    const author = article.authors && article.authors.length > 0 ? article.authors[0] : article.author || 'Unknown';
    const category = capitalizeCategory(article.category);

    return `
        <article class="news-card">
            <img src="${imageUrl}" alt="${article.title}" class="news-image" onerror="this.src='https://via.placeholder.com/400x200?text=No+Image+Available'">
            <div class="news-content">
                <h2 class="news-title">
                    <a href="${article.url}" target="_blank" rel="noopener noreferrer">
                        ${article.title}
                    </a>
                </h2>
                <p class="news-summary">${summary}</p>
                <div class="news-meta">
                    <span class="news-author">By ${author}</span>
                    <span class="category-tag">${category}</span>
                    <time class="news-date">${publishDate}</time>
                </div>
            </div>
        </article>
    `;
}

// Function to show loading state
function showLoading() {
    loadingElement.style.display = 'block';
    errorElement.style.display = 'none';
    newsGrid.innerHTML = '';
}

// Function to show error state
function showError() {
    loadingElement.style.display = 'none';
    errorElement.style.display = 'block';
    newsGrid.innerHTML = '';
}

// Function to show news articles
function showNews(articles) {
    loadingElement.style.display = 'none';
    errorElement.style.display = 'none';
    
    if (articles.length === 0) {
        newsGrid.innerHTML = '<p class="no-news">No news articles found.</p>';
        return;
    }

    const newsHTML = articles.map(article => createNewsCard(article)).join('');
    newsGrid.innerHTML = newsHTML;
}

// Main function to load news
async function loadNews() {
    try {
        showLoading();
        console.log('Loading healthcare news...');
        
        // Get date range for last 3 days
        const today = new Date();
        const threeDaysAgo = new Date(today);
        threeDaysAgo.setDate(today.getDate() - 3);
        
        const earliestPublishDate = threeDaysAgo.toISOString().split('T')[0];
        const latestPublishDate = today.toISOString().split('T')[0];
        
        // Search for healthcare news from last 3 days, in English
        const response = await fetch(`${API_BASE_URL}/search-news?categories=health&language=en&earliest-publish-date=${earliestPublishDate}&latest-publish-date=${latestPublishDate}&number=20&sort=publish-time&sort-direction=DESC`, {
            headers: { 'x-api-key': API_KEY }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Healthcare articles found:', data.news ? data.news.length : 0);
            
            if (data.news && data.news.length > 0) {
                showNews(data.news);
            } else {
                console.error('No healthcare articles found');
                showError();
            }
        } else {
            console.error('API error:', response.status);
            showError();
        }

    } catch (error) {
        console.error('Error loading healthcare news:', error);
        showError();
    }
}

// No test function needed - direct loading works fine

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, loading news...');
    loadNews();
});

// Auto-refresh news every 30 minutes
setInterval(loadNews, 30 * 60 * 1000);