import styles from "./App.module.css";
import { Task } from "./Task.jsx";
import { useState } from "react";
import { useEffect } from "react";
import Counter from "./problem/Counter.jsx";
import DataList from "./Day4/DataList.jsx";

function App() {
  return (
    <>
      {/* <Counter /> */}
      {/* <DataList /> */}
      <AddUserForm />
    </>
  );
}

export default App;
