import React, { useState } from "react";
import { useTodoContext } from "../context/todoContext";

export default function TodoInput() {
  const { addTodo } = useTodoContext();
  const [todo, setTodo] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Enter a todo item"
        value={todo.todo}
        onChange={(t) => setTodo(t.target.value)}
      />
      <button onClick={() => addTodo(todo)}>Add</button>
    </div>
  );
}
