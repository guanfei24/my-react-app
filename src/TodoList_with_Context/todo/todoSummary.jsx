import React, { useState } from "react";
import { useTodoContext } from "../context/todoContext";
import "./todoSummary.css";

export default function TodoSummary() {
  const { todos } = useTodoContext();

  return (
    <div className="div-summary">
      Completed:
      <span>{todos.filter((todo) => todo.isCompleted === true).length}</span>
      Undone:
      <span>
        {todos.length -
          todos.filter((todo) => todo.isCompleted === true).length}
      </span>
    </div>
  );
}
