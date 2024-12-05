import styles from './App.module.css';
import { User } from './User';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {

  const output = [
    { name: "Fei", age: 35}, 
    { name: "Lin", age: 44}
  ];

  const [searchResult, setSearchResult] = useState(output);
  const [inputVal, setInputVal] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  //get the user name from the input field
  const getUserName = (val) => {
    setName(val.target.value);
  };
  //get the user age from the input field
  const getUserAge = (val) => {
    setAge(parseInt(val.target.value, 10));
  };
  // create a function that will create a new user
  const createUser = () => { 
    console.log("Name: ", name);
    setSearchResult([...searchResult, { name: name, age: age }]);
    setAge(0);
    setName("");
  };
  useEffect(() => {
    console.log("User List Updated: ", searchResult);
  }, [searchResult]);
  const getInputVal = (val) => {
    setInputVal(val.target.value);
  };
  const userSearch = () => {
    inputVal === ""
      ? setSearchResult(output)
      : setSearchResult(
          searchResult.filter((user) => user.name.toLowerCase().includes(inputVal))
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
          {searchResult.map((user) => (
            <User name={user.name} age={user.age} />
          ))}
        </tbody>
        <div>
        <input type="text" value={name} onChange={getUserName}/>
        <input type="number" value={age} onChange={getUserAge}/>   
        <button onClick = {createUser}>Add User</button>
        </div>
        <div>
          <input type="text" onChange={getInputVal}/>
          <button onClick={userSearch}>User Search by Name</button>
        </div>
      </table>
    </div>
  );
}

export default App;
