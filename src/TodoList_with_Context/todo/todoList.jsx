import React, { useState } from "react";
import { useTodoContext } from "../context/todoContext";

export default function TodoList() {
  const { todos, deleteTodo, completeTodo } = useTodoContext();
  console.log("todos: ", todos);
  return (
    <div>
      {todos.map((todo) => {
        return (
          <div key={todo.id}>
            <p>{todo.todo}</p>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => completeTodo(todo.id)}
            />
          </div>
        );
      })}
    </div>
  );
}
