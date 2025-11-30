# Healthcare News

#### Video Demo: <[Healthcare News](https://youtu.be/2BbWxjjXQio)>
#### see the website <[here](https://jaygilds.github.io/healthcarenews/)>

## Description:

Healthcare News is a web application designed to curate and display the most recent healthcare-related news articles from around the world. The project was created as my final project for CS50's Introduction to Computer Science course. The primary goal was to build a clean, responsive news aggregation website that focuses exclusively on healthcare topics, helping users stay informed about medical developments, public health issues, and healthcare policy changes without having to sift through unrelated news.

The website leverages the World News API to fetch real-time news articles, filtering them specifically for healthcare content in English from the past three days. The application displays up to 20 articles at a time, sorted by publication date to ensure users see the most recent developments first. The interface features a modern card-based layout with article images, summaries, author information, and publication dates, making it easy to scan multiple stories quickly.

## Design Philosophy and Choices

When designing Healthcare News, I made several deliberate choices to balance functionality, simplicity, and user experience. First and foremost, I decided to use vanilla JavaScript instead of a framework like React or Vue. While frameworks offer powerful features, I wanted to demonstrate my understanding of core web technologies and keep the project lightweight and accessible. This decision also meant faster load times and no build process complexity.

For the visual design, I chose a light blue gradient header (#87CEEB to #4A90E2) to evoke trust and calmness—colors commonly associated with healthcare and medical institutions. The card-based layout was chosen for its modern appearance and excellent mobile responsiveness. Each news card contains all essential information (title, image, summary, author, category, and date) without overwhelming the user.

One of the most significant design challenges was deciding how to filter news for healthcare relevance. Initially, I experimented with client-side filtering using keyword matching in article titles and bodies. However, after several iterations and testing, I realized that the World News API's built-in category filtering (`categories=health`) was more reliable and efficient than trying to maintain an extensive keyword list. This decision simplified the codebase considerably and reduced the chance of miscategorization.

Another critical decision involved handling the API's limitations. The World News API offers a `/top-news` endpoint that returns importance-ranked articles, but it doesn't support category filtering. Meanwhile, the `/search-news` endpoint supports category filtering but doesn't provide importance rankings. I debated extensively between these two approaches: should I prioritize healthcare specificity or news importance? Ultimately, I chose healthcare specificity because that was the core purpose of the website. Users specifically visiting "Healthcare News" expect to see only healthcare-related content.

## File Descriptions

### index.html

The HTML file serves as the structural foundation of the website. It defines three main sections: a header with the website logo and introductory text, a loading spinner that appears while fetching data, and a grid container for displaying news articles. The header features a custom logo image that I created specifically for this project, sized at 350 pixels wide to ensure it's prominent but not overwhelming.

The file also includes error handling elements that display when the API fails to return results, providing users with clear feedback rather than leaving them with a blank screen. I used semantic HTML5 elements like `<header>`, `<main>`, and `<article>` to improve accessibility and SEO. The structure is intentionally minimal, with most dynamic content being generated via JavaScript and inserted into the `newsGrid` div.

### style.css

The CSS file implements a fully responsive design using modern layout techniques. The stylesheet is organized into logical sections: CSS variables for colors, base styles, header styling, news grid layout, card styling, and responsive breakpoints. I used CSS Grid for the news article layout because it provides automatic responsivity and handles various screen sizes elegantly with the `auto-fit` and `minmax` functions.

The color scheme was carefully chosen to create a professional, medical aesthetic. The light blue gradient header conveys trust and cleanliness, while the news cards use subtle shadows and hover effects to enhance interactivity. Each card has rounded corners and a clean white background that makes the content easy to read.

For responsiveness, I implemented two breakpoints: one at 768px for tablets and one at 480px for mobile devices. On smaller screens, the grid collapses to a single column, font sizes adjust for readability, and spacing is optimized for touch interactions. The loading spinner and error messages are also styled to be clear and visually consistent with the rest of the design.

### script.js

The JavaScript file contains all the application logic and is organized into several key functions. At the top, I define configuration constants including the API key and base URL. I chose to expose the API key in the client-side code rather than building a backend server because this is an educational project with a free API tier. For a production application, I would absolutely implement a backend proxy to protect the API key.

The core functionality revolves around the `loadNews()` async function, which constructs a date range for the last three days and makes a fetch request to the World News API's search endpoint. I chose a three-day window after testing revealed that limiting to just "today" often returned zero results, likely because healthcare news isn't published every single day in high volumes. Three days provides a good balance between recency and having sufficient content.

The API call includes four key parameters: `categories=health` to filter for healthcare articles, `language=en` to ensure English-only content, date range parameters (`earliest-publish-date` and `latest-publish-date`), and sorting parameters to show the newest articles first. All filtering is done server-side by the API itself, which was a deliberate design choice to keep the client-side code simple and efficient.

The `createNewsCard()` function generates HTML for each article using template literals. It handles missing data gracefully—if an article doesn't have an image, it displays a placeholder; if there's no summary, it truncates the full text; if author information is missing, it displays "Unknown." This defensive programming ensures the site doesn't break when encountering incomplete data.

I also implemented an auto-refresh feature using `setInterval()` that reloads the news every 30 minutes. This keeps the content fresh without requiring manual page refreshes, though I was careful not to refresh too frequently to avoid hitting API rate limits.

### images/healthcare news.png

The logo image is a custom graphic I created for the website. It's displayed prominently in the header at 350 pixels wide and uses a rectangular format rather than a square or circular shape. The logo helps establish brand identity and makes the site feel more professional and polished.

## Technical Challenges and Solutions

One of the biggest technical challenges was dealing with inconsistent data from the API. Some articles had complete metadata (author, image, summary), while others were missing one or more fields. I solved this by implementing fallback logic throughout the code—using the OR operator (`||`) to provide default values and the optional chaining operator to safely access nested properties.

Another challenge was ensuring the site worked across different browsers and screen sizes. I tested extensively on Chrome, Firefox, and Edge, and on devices ranging from large desktop monitors to small mobile phones. CSS Grid proved invaluable here, as it handled most of the responsive layout automatically once configured correctly.

CORS (Cross-Origin Resource Sharing) was initially an issue when testing by opening the HTML file directly in a browser. The solution was to always run a local development server using Python's built-in HTTP server (`python -m http.server 8000`), which I documented in the README for other users.

## Future Improvements

While the current implementation meets all project requirements, there are several enhancements I would add given more time. First, I would implement article search functionality, allowing users to search for specific healthcare topics or keywords. Second, I would add geographic filtering to let users focus on healthcare news from specific regions or countries. Third, implementing a backend server to protect the API key and potentially cache results would improve security and performance. Finally, adding social sharing buttons would make it easy for users to share important healthcare news with others.

## Conclusion

Healthcare News represents a complete, functional web application that successfully aggregates and displays healthcare-related news from around the world. The project demonstrates proficiency in HTML, CSS, and JavaScript, as well as API integration, responsive design, and user experience considerations. Through multiple iterations and design refinements, I created a clean, efficient, and user-friendly news platform that serves its intended purpose effectively.

## How to Run

1. **Local Server (Recommended)**
   - Open a terminal/command prompt
   - Navigate to the project directory: `cd path/to/project`
   - Start a Python HTTP server: `python -m http.server 8000`
   - Open your browser and go to: `http://localhost:8000`

2. **Direct File Opening**
   - Simply open `index.html` in any modern web browser
   - Note: Some browsers may block API requests due to CORS when opening files directly, so the local server method is preferred

## Browser Compatibility

The website works on all modern browsers:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
