const searchInput = document.getElementById('searchInput')
const searchButton = document.getElementById('searchButton')
const bookList = document.getElementById('booklist')
const modalContainer = document.querySelector('modalContainer')
const bookDetailsContent = document.querySelector('book-details-content')
const bookCloseBtn = document.getElementById('bookCloseBtn')

searchButton.addEventListener('click', async () => {
    const bookName = searchInput.value.trim();
    if (bookName) {
        const books = await searchBooksByName(bookName);
        displayBooks(books);
    }
});

bookList.addEventListener('click', async(e) => {
    const card = e.target.closest('.book-item');
    if (card) {
        const bookId = card.dataset.id;
        const book = await getBookDetails(bookId);
        if(book) {
            showBookDetailsPopup(book);
        }

    }
})
async function searchBooksByName(bookName){
    try {
        const response = await fetch(`https://isbndb.com/search/books?search_param=books&x=${bookName}`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        return data.books;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null; 
    }
}

function displayBooks(bookArray){
    bookList.innerHTML = ''; // Предполагаем, что bookList - это DOM элемент, где отображаются книги
    if (bookArray && bookArray.length > 0){
        bookArray.forEach(book => {
            const bookItem = document.createElement('div');
            bookItem.classList.add('book-item');
            bookItem.dataset.id = book.idBook;
            bookItem.innerHTML = `<img src="${book.strBookThumb}" alt="${book.strBook}"> <h3>${book.strBook}</h3>`;
            bookList.appendChild(bookItem);
        });
    } else {
        bookList.innerHTML = '<p>No books found. Try again!</p>';
    }
}

