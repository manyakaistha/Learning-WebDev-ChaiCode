// API endpoint configuration
const API_URL = 'https://api.freeapi.app/api/v1/public/books';

// State management
let currentPage = 1;
let currentView = 'grid';
let books = [];
let filteredBooks = [];

// DOM elements
const booksContainer = document.getElementById('booksContainer');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const sortSelect = document.getElementById('sortSelect');
const gridViewBtn = document.getElementById('gridView');
const listViewBtn = document.getElementById('listView');
const loadingSpinner = document.getElementById('loadingSpinner');

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    fetchBooks();
    setupEventListeners();
    setInitialView();
});

function setupEventListeners() {
    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    sortSelect.addEventListener('change', handleSort);
    gridViewBtn.addEventListener('click', () => switchView('grid'));
    listViewBtn.addEventListener('click', () => switchView('list'));

    // Infinite scroll
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
            loadMoreBooks();
        }
    });
}

function setInitialView() {
    booksContainer.classList.add('grid-view');
    gridViewBtn.classList.add('active-view');
}

async function fetchBooks(page = 1) {
    try {
        showLoading();
        const response = await fetch(`${API_URL}?page=${page}`);
        const data = await response.json();

        if (data.success && data.data && data.data.data) {
            const newBooks = data.data.data;
            books = page === 1 ? newBooks : [...books, ...newBooks];
            filteredBooks = [...books];
            renderBooks();
        }
    } catch (error) {
        console.error('Error fetching books:', error);
    } finally {
        hideLoading();
    }
}

function renderBooks() {
    if (currentPage === 1) booksContainer.innerHTML = '';

    filteredBooks.forEach(book => {
        const bookCard = createBookCard(book);
        booksContainer.appendChild(bookCard);
    });
}

function createBookCard(book) {
    const card = document.createElement('div');
    card.className = `col-12 ${currentView === 'grid' ? 'col-md-4 col-lg-3' : ''} mb-4`;

    const cardContent = `
        <div class="card book-card shadow-sm">
            <img src="${book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192?text=No+Image'}" 
                 class="card-img-top" alt="${book.volumeInfo.title}">
            <div class="card-body">
                <h5 class="card-title">${book.volumeInfo.title}</h5>
                <p class="card-text">
                    <small class="text-muted">
                        ${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}
                    </small>
                </p>
                <p class="card-text">
                    <small class="text-muted">
                        Published: ${new Date(book.volumeInfo.publishedDate).getFullYear() || 'N/A'}
                    </small>
                </p>
                <a href="${book.volumeInfo.infoLink}" class="btn btn-primary" target="_blank">
                    More Details
                </a>
            </div>
        </div>
    `;

    card.innerHTML = cardContent;
    return card;
}

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    filteredBooks = books.filter(book => {
        const title = book.volumeInfo.title.toLowerCase();
        const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(' ').toLowerCase() : '';
        return title.includes(searchTerm) || authors.includes(searchTerm);
    });
    renderBooks();
}

function handleSort() {
    const sortBy = sortSelect.value;
    if (!sortBy) return;

    filteredBooks.sort((a, b) => {
        if (sortBy === 'title') {
            return a.volumeInfo.title.localeCompare(b.volumeInfo.title);
        } else if (sortBy === 'date') {
            const dateA = new Date(a.volumeInfo.publishedDate || '1900');
            const dateB = new Date(b.volumeInfo.publishedDate || '1900');
            return dateB - dateA;
        }
    });

    renderBooks();
}

function switchView(view) {
    currentView = view;
    booksContainer.className = 'row g-4 ' + view + '-view';

    // Update active button states
    gridViewBtn.classList.toggle('active-view', view === 'grid');
    listViewBtn.classList.toggle('active-view', view === 'list');

    // Re-render books to adjust layout
    renderBooks();
}

function loadMoreBooks() {
    if (!loadingSpinner.style.display || loadingSpinner.style.display === 'none') {
        currentPage++;
        fetchBooks(currentPage);
    }
}

function showLoading() {
    loadingSpinner.style.display = 'block';
}

function hideLoading() {
    loadingSpinner.style.display = 'none';
}