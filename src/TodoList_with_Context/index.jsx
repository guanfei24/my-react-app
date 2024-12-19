import React from "react";
import TodoInput from "./todo/todoInput";
import TodoList from "./todo/todoList";
import { TodoProvider } from "./context/todoContext";

export default function Index() {
  return (
    <div>
      <h2>Todo List</h2>
      <TodoProvider>
        <TodoInput />
        <TodoList />
      </TodoProvider>
    </div>
  );
}
