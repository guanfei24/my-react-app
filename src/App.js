import styles from './App.module.css';
import { Task } from './Task';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const output = [
    { name: "Cooking", status: "Processing" },
    { name: "Cleaning", status: "Processing" }
  ];

  const [searchResult, setSearchResult] = useState(output);
  const [inputVal, setInputVal] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Processing");
  const [editIndex, setEditIndex] = useState(null);
  const [taskName, setTaskName] = useState("");
  const [taskStatus, setTaskStatus] = useState("Processing");

  const getTaskName = (val) => setName(val.target.value);
  const getStatus = (val) => setStatus(val.target.value);

  // Handle task edit
  const handleEdit = (field, value, index) => {
    if (field === 'name') {
      setTaskName(value);
    } else if (field === 'status') {
      setTaskStatus(value);
    } else if (field === 'start') {
      setEditIndex(index);
      const task = searchResult[index];
      setTaskName(task.name);
      setTaskStatus(task.status);
    }
  };

  // Save edited task
  const saveTask = (index) => {
    const updatedTasks = [...searchResult];
    updatedTasks[index] = { name: taskName, status: taskStatus };
    setSearchResult(updatedTasks);
    setEditIndex(null);
    setTaskName("");
    setTaskStatus("Processing");
  };

  // Cancel editing
  const cancelEdit = (index) => {
    setEditIndex(null);
    setTaskName("");
    setTaskStatus("Processing");
  };

  const deleteTask = (index) => {
    const updatedTasks = searchResult.filter((_, i) => i !== index);
    setSearchResult(updatedTasks);
  };

  const createOrUpdateTask = () => {
    setSearchResult([...searchResult, { name, status }]);
    setStatus("Processing");
    setName("");
  };

  const getInputVal = (val) => setInputVal(val.target.value);

  const taskSearch = () => {
    inputVal === ""
      ? setSearchResult(output)
      : setSearchResult(
          searchResult.filter((task) => task.name.toLowerCase().includes(inputVal.toLowerCase()))
        );
  };

  return (
    <div>
      <h1>Tasks</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {searchResult.map((task, index) => (
            <Task
              key={index}
              index={index}
              name={task.name}
              status={task.status}
              isEditing={editIndex === index}
              onEdit={handleEdit}
              onSave={saveTask}
              onCancel={cancelEdit}
              onDelete={deleteTask}
              taskName={taskName}
              taskStatus={taskStatus}
            />
          ))}
        </tbody>
      </table>
      <div>
        <input
          type="text"
          value={name}
          onChange={getTaskName}
          placeholder="Enter task name"
        />
        <select value={status} onChange={getStatus}>
          <option value="Processing">Processing</option>
          <option value="Done">Done</option>
        </select>
        <button onClick={createOrUpdateTask}>Add Task</button>
      </div>
      <div>
        <input
          type="text"
          onChange={getInputVal}
          placeholder="Search by name"
        />
        <button onClick={taskSearch}>Search</button>
      </div>
    </div>
  );
}

export default App;