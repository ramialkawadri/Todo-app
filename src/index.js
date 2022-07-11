import { renderTodos } from "./views";
import { setFilters } from './filters';
import { createTodo, loadTodos } from "./todos";

renderTodos();

document.getElementById('search-text').addEventListener('input', (e) => {
  setFilters({
    searchText: e.target.value,
    });
  renderTodos();
});

document.getElementById('new-todo').addEventListener('submit', (e) => {
  e.preventDefault();
  const text = e.target.elements.text.value.trim();
  if (!text) return;

  createTodo(text);
  e.target.elements.text.value = '';
  renderTodos();
});

document.getElementById('hide-completed').addEventListener('change', (e) => {
  setFilters({
    hideCompleted: e.target.checked,
  });
  renderTodos();
});

window.addEventListener('storage', (e) => {
  if (e.key === 'todos') {
    loadTodos();
    renderTodos();
  }
});
