import { generateId } from "./util";

const mockData = [
  {
    id: generateId(),
    todo: "Tech Conference 2024",
    isCompleted: false
  },
  {
    id: generateId(),
    todo: "AI Workshop",
    isCompleted: true
  }
];

async function sleep(time) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, time);
  });
}
// return a mock datalist
async function fetchTodoList() {
  // await sleep(1000);
  return [...mockData];
}
// add event to mock datalist
async function addTodo(todo) {
  //await sleep(1000);
  console.log("addTodo: ", todo);
  const newTodo = { id: generateId(), todo, isCompleted: false };
  mockData.push(newTodo);
  return newTodo;
}

// think about error condition
async function fetchMockDataWithError() {
  throw new Error("404 not found!");
}

export default { fetchTodoList, addTodo };
