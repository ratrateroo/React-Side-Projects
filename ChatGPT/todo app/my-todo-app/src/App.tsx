import React, { useState } from "react";

interface Todo {
  id: number;
  text: string;
  complete: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

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

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="Add Todo" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} onClick={() => handleTodoToggle(todo)}>
            {todo.text} {todo.complete ? "(completed)" : ""}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
