async function fetchSearchResults(query) {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok.');
        const data = await response.json();
        displayBooks(data.docs);
    } catch (error) {
        console.error("Error fetching data: ", error);
        document.getElementById('results').innerHTML = '<p>Error loading results. Please try again.</p>';
    }
}

function displayBooks(books) {
    const results = document.getElementById('results');
    results.innerHTML = ''; // Обратите внимание, что мы меняем 'bookList' на 'results'

    if (books.length > 0) {
        books.forEach(book => {
            const coverImage = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : 'fallback-image-url.jpg';
            const bookItem = document.createElement('div');
            bookItem.classList.add('book-item');
            bookItem.innerHTML = `
                <img src="${coverImage}" alt="${book.title}" onerror="this.onerror=null;this.src='fallback-image-url.jpg';">
                <h3>${book.title}</h3>
                <p>${book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</p>
            `;
            results.appendChild(bookItem); // Также замените здесь 'bookList' на 'results'
        });
    } else {
        results.innerHTML = '<p>No books found. Try again!</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query');
    if (query) {
        fetchSearchResults(query);
    }
});
