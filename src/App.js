import styles from './App.module.css';
import { Task } from './Task';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {

  const output = [
    { name: "Cooking", status: 0}, 
    { name: "Cleaning", status: 0}
  ];

  const [searchResult, setSearchResult] = useState(output);
  const [inputVal, setInputVal] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState(0);
  //get the user name from the input field
  const getTaskName = (val) => {
    setName(val.target.value);
  };
  //get the user age from the input field
  const getStatus = (val) => {
    setStatus(parseInt(val.target.value, 10));
  };
  // create a function that will create a new user
  const createTask = () => { 
    setSearchResult([...searchResult, { name: name, status: status }]);
    setStatus(0);
    setName("");
  };
  //useEffect to check if the user list is updated
  useEffect(() => {
    console.log("Task List Updated: ", searchResult);
  }, [searchResult]);
  //get the value from the input field
  const getInputVal = (val) => {
    setInputVal(val.target.value);
  };
  //search for the user by name
  const taskSearch = () => {
    inputVal === ""
      ? setSearchResult(output)
      : setSearchResult(
          searchResult.filter((task) => task.name.toLowerCase().includes(inputVal))
        );
  };

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <th>Name</th>
          <th>Age</th>
        </thead>
        <tbody>
          {searchResult.map((task) => (
            <Task name={task.name} status={task.status} />
          ))}
        </tbody>
        <div>
        <input type="text" value={name} onChange={getTaskName}/>
        <input type="number" value={status} onChange={getStatus}/>   
        <button onClick = {createTask}>Add TAsk</button>
        </div>
        <div>
          <input type="text" onChange={getInputVal}/>
          <button onClick={taskSearch}>Search by Name</button>
        </div>
      </table>
    </div>
  );
}

export default App;
