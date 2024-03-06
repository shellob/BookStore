document.getElementById('searchButton').addEventListener('click', function() {
    const searchQuery = document.getElementById('searchInput').value.trim();
    if (searchQuery) {
        window.location.href = `search_results.html?query=${encodeURIComponent(searchQuery)}`;
    }
});

document.getElementById('searchInput').addEventListener('keyup', function(event) {
    if (event.key === "Enter") {
        document.getElementById('searchButton').click();
    }
});
