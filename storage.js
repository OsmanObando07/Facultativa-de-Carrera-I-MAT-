// storage.js
const BOOKS_KEY = 'bookshelf_books_v1';

function getBooks() {
  try {
    const raw = localStorage.getItem(BOOKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error leyendo libros', e);
    return [];
  }
}

function saveBooks(list) {
  localStorage.setItem(BOOKS_KEY, JSON.stringify(list));
}

function addBook(book) {
  const list = getBooks();
  list.unshift(book);
  saveBooks(list);
}

function deleteBook(id) {
  const list = getBooks().filter(b => b.id !== id);
  saveBooks(list);
}

function toggleFavorite(id) {
  const list = getBooks().map(b => {
    if (b.id === id) b.favorite = !b.favorite;
    return b;
  });
  saveBooks(list);
}
