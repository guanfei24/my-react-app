import React from "react";
import todoAPI from "./getTodoList.js";
import { createContext } from "react";
import { useReducer } from "react";
import { useContext } from "react";
import { useEffect } from "react";

const TodoContext = createContext();

//reducer function
const todoReducer = (state, action) => {
  //destructure action
  const { type, payload } = action;
  //switch case for action
  switch (type) {
    case "SET_TODOS":
      return payload;
    case "ADD_TODO":
      return [...state, payload];
    case "DELETE_TODO":
      const { id } = payload;
      console.log(
        "state.filter: ",
        state.filter((todo) => todo.id !== id)
      );

      return state.filter((todo) => todo.id !== id);
  }
};
export function TodoProvider({ children }) {
  //useReducer to manage state
  const [todos, dispatch] = useReducer(todoReducer, []);
  //useEffect to initialize TodoList
  useEffect(() => {
    (async () => {
      const todos = await todoAPI.fetchTodoList();
      console.log(todos);
      dispatch({ type: "SET_TODOS", payload: todos });
    })();
  }, []);
  //add todo function
  const addTodo = async (todo) => {
    const newTodo = await todoAPI.addTodo(todo);
    dispatch({ type: "ADD_TODO", payload: newTodo });
    return newTodo;
  };
  //delete todo function
  const deleteTodo = (id) => {
    dispatch({ type: "DELETE_TODO", payload: { id } });
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodoContext() {
  return useContext(TodoContext);
}