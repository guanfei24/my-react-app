import React from "react";
import { useTodoContext } from "../context/todoContext";

export default function TodoInput() {
  const { addTodo } = useTodoContext();
  const [todo, setTodo] = React.useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Enter a todo item"
        value={todo}
        onChange={(t) => setTodo(t.target.value)}
      />
      <button onClick={() => addTodo(todo)}>Add</button>
    </div>
  );
}
