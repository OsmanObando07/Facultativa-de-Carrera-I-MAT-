// app.js
document.addEventListener('DOMContentLoaded', () => {
  const listEl = document.getElementById('booksList');
  const template = document.getElementById('bookCardTemplate').content;
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const favFilter = document.getElementById('favFilter');

  function render() {
    const q = searchInput.value.trim().toLowerCase();
    const cat = categoryFilter.value;
    const favOnly = favFilter.checked;
    const books = getBooks().filter(b => {
      if (favOnly && !b.favorite) return false;
      if (cat && b.category !== cat) return false;
      if (!q) return true;
      return (b.title + ' ' + b.author).toLowerCase().includes(q);
    });
    listEl.innerHTML = '';
    if (books.length === 0) {
      listEl.innerHTML = '<p>No se encontraron libros. Agrega uno 😊</p>';
      return;
    }
    books.forEach(b => {
      const node = template.cloneNode(true);
      node.querySelector('.cover').src = b.cover;
      node.querySelector('.cover').alt = `Portada ${b.title}`;
      node.querySelector('.title').textContent = b.title;
      node.querySelector('.author').textContent = b.author;
      const viewBtn = node.querySelector('.viewBtn');
      const delBtn = node.querySelector('.delBtn');
      const favBtn = node.querySelector('.favBtn');

      favBtn.textContent = b.favorite ? '★' : '☆';
      favBtn.setAttribute('aria-pressed', b.favorite ? 'true' : 'false');

      viewBtn.addEventListener('click', () => {
        alert(`${b.title}\n\nAutor: ${b.author}\nCategoría: ${b.category}\nAño: ${b.year || 'N/A'}\n\n${b.description || ''}`);
      });
      delBtn.addEventListener('click', () => {
        if (confirm('¿Eliminar este libro?')) {
          deleteBook(b.id);
          render();
        }
      });
      favBtn.addEventListener('click', () => {
        toggleFavorite(b.id);
        render();
      });

      listEl.appendChild(node);
    });
  }

  [searchInput, categoryFilter, favFilter].forEach(el => el.addEventListener('input', render));

  // seed ejemplo (solo si no hay libros)
  if (getBooks().length === 0) {
    addBook({
      id: 'bk_seed_1',
      title: 'Introducción a JS',
      author: 'E. Developer',
      category: 'Tecnología',
      year: 2020,
      description: 'Manual breve para principiantes.',
      cover: 'https://via.placeholder.com/120x160?text=JS',
      favorite: false,
      createdAt: Date.now()
    });
  }

  render();
});
