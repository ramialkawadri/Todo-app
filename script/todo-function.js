'use strict';

const getSavedTodos = () => {
  const todosJSON = localStorage.getItem('todos');
  try {
    return todosJSON ? JSON.parse(todosJSON) : [];
  } catch (_) {
    return [];
  }
};

const saveTodos = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

const findTodoIndex = (todos, id) => {
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  return todoIndex;
};

const findTodo = (todos, id) => {
  const todo = todos.find((todo) => todo.id === id);
  return todo;
};

const removeTodo = (id) => {
  const todoIndex = findTodoIndex(todos, id);

  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

const toggleTodo = (id) => {
  const todo = findTodo(todos, id);

  if (todo) {
    todo.completed = !todo.completed;
  }
};

const generateTodoDom = (todo) => {
  const todoEl = document.createElement('label');
  const containerEl = document.createElement('div');
  const todoTextEl = document.createElement('span');
  const checkBoxEl = document.createElement('input');
  const removeButton = document.createElement('button');

  // Setting up the checkbox
  checkBoxEl.setAttribute('type', 'checkbox');
  checkBoxEl.checked = todo.completed;
  containerEl.appendChild(checkBoxEl);

  checkBoxEl.addEventListener('change', () => {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  // Setting up the todo text
  todoTextEl.textContent = todo.text;
  containerEl.appendChild(todoTextEl);

  // Setup contianer
  todoEl.classList.add('list-item');
  containerEl.classList.add('list-item__container');
  todoEl.appendChild(containerEl);

  // Setting up the remove button
  removeButton.textContent = 'remove';
  removeButton.classList.add('button', 'button--text');
  todoEl.appendChild(removeButton);
  removeButton.addEventListener('click', () => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  return todoEl;
};

const generateSummaryDom = (incompleteTodos) => {
  const summary = document.createElement('h2');
  const plural = incompleteTodos.length === 1 ? '' : 's';
  summary.classList.add('list-title');
  summary.textContent = `You have ${incompleteTodos.length} todo${plural} left`;
  return summary;
};

const renderTodos = (todos, filters) => {
  let filteredTodos = todos.filter((todo) => {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

    return searchTextMatch && hideCompletedMatch;
  });

  const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);
  const todosEl = document.getElementById('todos');
  const summary = generateSummaryDom(incompleteTodos);

  todosEl.innerHTML = '';
  todosEl.appendChild(summary);

  if (filteredTodos.length > 0) {
    filteredTodos.forEach((todo) => {
      const todoEl = generateTodoDom(todo);
      todosEl.appendChild(todoEl);
    });
  } else {
    const emptyEl = document.createElement('p');
    emptyEl.classList.add('empty-message');
    emptyEl.textContent = 'No todos to show!';
    todosEl.appendChild(emptyEl);
  }
};
