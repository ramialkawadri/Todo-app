import uuidv4 from 'uuid';

let todos = [];

const loadTodos = () => {
  const todosJSON = localStorage.getItem('todos');
  try {
    todos = todosJSON ? JSON.parse(todosJSON) : [];
  } catch (_) {
    todos = [];
  }
};
loadTodos();

const saveTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

const getTodos = () => todos;

const createTodo = (todoText) => {
  todos.push({
    text: todoText,
    completed: false,
    id: uuidv4(),
  });
  saveTodos();
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
    saveTodos();
  }
}

const toggleTodo = (id) => {
  const todo = findTodo(todos, id);

  if (todo) {
    todo.completed = !todo.completed;
  }
  saveTodos();
}

export { loadTodos, getTodos, createTodo, removeTodo, toggleTodo };
