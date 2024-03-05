const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const bookList = document.getElementById('bookList'); 

async function searchBooksByName(bookName) {
    try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(bookName)}&limit=10`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        return data.docs; 
    } catch (error) {
        console.error("Error fetching data:", error);
        return []; 
    }
}

function displayBooks(books) {
    bookList.innerHTML = '';
    if (books.length > 0) {
        books.forEach(book => {
            const coverImage = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : 'placeholder-image-url.jpg'; // Укажите URL запасного изображения
            const bookItem = document.createElement('div');
            bookItem.classList.add('book-item');
            bookItem.innerHTML = `
                <img src="${coverImage}" alt="${book.title}" onerror="this.onerror=null;this.src='fallback-image-url.jpg';"> 
                <h3>${book.title}</h3>
            `;
            bookList.appendChild(bookItem);
        });
    } else {
        bookList.innerHTML = '<p>No books found. Try again!</p>'; 
    }
}

searchButton.addEventListener('click', async () => {
    const bookName = searchInput.value.trim();
    if (bookName) {
        const books = await searchBooksByName(bookName);
        displayBooks(books);
    }
});

searchInput.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        searchButton.click();
    }
});
