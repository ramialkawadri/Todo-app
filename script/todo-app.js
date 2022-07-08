'use strict';

let todos = getSavedTodos();

const filters = {
  searchText: '',
  hideCompleted: false,
};

renderTodos(todos, filters);

document.getElementById('search-text').addEventListener('input', (e) => {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});

document.getElementById('new-todo').addEventListener('submit', (e) => {
  e.preventDefault();
  const text = e.target.elements.text.value.trim();
  if (!text) return;

  todos.push({
    text: text,
    completed: false,
    id: uuidv4(),
  });
  saveTodos(todos);

  e.target.elements.text.value = '';
  renderTodos(todos, filters);
});

document.getElementById('hide-completed').addEventListener('change', (e) => {
  filters.hideCompleted = e.target.checked;
  renderTodos(todos, filters);
});
