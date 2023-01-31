import React, { useState } from "react";

interface Todo {
  id: number;
  text: string;
  complete: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  const handleTodoAdd = (text: string) => {
    setTodos([...todos, { id: Date.now(), text, complete: false }]);
  };

  const handleTodoToggle = (selectedTodo: Todo) => {
    setTodos(
      todos.map((todo) =>
        todo.id === selectedTodo.id
          ? { ...todo, complete: !todo.complete }
          : todo
      )
    );
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`bg-${darkMode ? "gray-800" : "gray-200"} text-${
        darkMode ? "white" : "black"
      }`}
    >
      <div className="container mx-auto py-10">
        <button
          className="bg-gray-400 px-4 py-2 mb-10"
          onClick={handleDarkModeToggle}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <form
          className="bg-white p-6 rounded-lg shadow-md"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="w-full border border-gray-400 p-2 mb-4"
            type="text"
            placeholder="Add Todo"
          />
          <button className="bg-blue-500 text-white px-4 py-2">Add</button>
        </form>
        <ul className="mt-10">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="p-2 mb-2 border border-gray-400 rounded-lg"
              onClick={() => handleTodoToggle(todo)}
            >
              {todo.text}
              <span className="ml-2 text-sm text-gray-600">
                {todo.complete ? "(completed)" : ""}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
