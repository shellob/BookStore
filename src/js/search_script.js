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
    results.innerHTML = '';

    books.forEach(book => {
        const coverImage = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : 'fallback-image-url.jpg';
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');
        bookItem.innerHTML = `
            <img src="${coverImage}" alt="${book.title}" onerror="this.onerror=null;this.src='fallback-image-url.jpg';">
            <h3>${book.title}</h3>
            <p>${book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</p>
        `;
        bookItem.addEventListener('click', () => {
            showBookDetails(book);
        });
        results.appendChild(bookItem);
    });
}

function showBookDetails(book) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalAuthor = document.getElementById('modalAuthor');
    const modalPrice = document.getElementById('modalPrice');

    modalTitle.textContent = book.title;
    modalAuthor.textContent = book.author_name ? book.author_name.join(', ') : 'Unknown Author';
    modalPrice.textContent = `Price: $${generatePrice()}`;
    modal.style.display = 'flex';
}

function generatePrice() {
    return (Math.random() * 50).toFixed(2);
}

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query');
    if (query) {
        fetchSearchResults(query);
    }
});

document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});
