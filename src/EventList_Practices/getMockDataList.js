import { generateId } from "./util";

const mockData = [
  {
    eventid: generateId(),
    eventname: "Tech Conference 2024",
    starttime: "2024-12-21",
    endtime: "2024-12-21",
  },
  {
    eventid: generateId(),
    eventname: "AI Workshop",
    starttime: "2024-12-18",
    endtime: "2024-12-18",
  },
  {
    eventid: generateId(),
    eventname: "Holiday Party",
    starttime: "2024-12-20",
    endtime: "2024-12-20",
  },
  {
    eventid: generateId(),
    eventname: "New Year Marathon",
    starttime: "2025-01-01",
    endtime: "2025-01-01",
  },
  {
    eventid: generateId(),
    eventname: "Coding Bootcamp",
    starttime: "2025-01-05",
    endtime: "2025-01-07",
  },
];

async function sleep(time) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, time);
  });
}
// return a mock datalist
async function fetchMockData() {
  // await sleep(1000);
  return [...mockData];
}
// add event to mock datalist
async function addEvent(event) {
  //await sleep(1000);
  console.log("addEvent", event);
  const newEvent = { eventid: generateId(), ...event };
  console.log("newEvent", newEvent);
  mockData.push(newEvent);
  console.log("mockData", mockData);
  return newEvent;
}

// think about error condition
async function fetchMockDataWithError() {
  throw new Error("404 not found!");
}

export default { fetchMockData, addEvent };
