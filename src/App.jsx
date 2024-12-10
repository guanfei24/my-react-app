import "./Day5/style.css";
import { Task } from "./Task.jsx";
import { useState } from "react";
import { useEffect } from "react";
import Counter from "./problem/Counter.jsx";
import DataList from "./Day4/DataList.jsx";
import AddUserForm from "./Day5/AddUserForm.jsx";
import CheckBoxGroup from "./Day5/CheckBoxGroup.jsx";

function App() {
  return (
    <>
      {/* <Counter /> */}
      {/* <DataList /> */}
      <AddUserForm />
      <CheckBoxGroup/>

    </>
  );
}

export default App;
