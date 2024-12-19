import React from "react";
import { useTodoContext } from "../context/todoContext";

export default function TodoList() {
  const { todos, deleteTodo } = useTodoContext();
  console.log("todos: ", todos);
  return (
    <div>
      {todos.map((todo) => {
        return (
          <div key={todo.id}>
            <p>{todo.todo}</p>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}
