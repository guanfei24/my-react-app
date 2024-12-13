const mockData = [
  {
    eventid: 1,
    eventname: "Tech Conference 2024",
    starttime: "2024-12-21",
    endtime: "2024-12-21",
  },
  {
    eventid: 2,
    eventname: "AI Workshop",
    starttime: "2024-12-18",
    endtime: "2024-12-18",
  },
  {
    eventid: 3,
    eventname: "Holiday Party",
    starttime: "2024-12-20",
    endtime: "2024-12-20",
  },
  {
    eventid: 4,
    eventname: "New Year Marathon",
    starttime: "2025-01-01",
    endtime: "2025-01-01",
  },
  {
    eventid: 5,
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
  await sleep(1000);
  return mockData;
}

// think about error condition
async function fetchMockDataWithError() {
  throw new Error("404 not found!");
}

export { fetchMockData };
