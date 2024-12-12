const eventList = [
    {
        "eventid": 1,
        "eventname": "Tech Conference 2024",
        "starttime": "2024-12-15T09:00:00",
        "endtime": "2024-12-15T17:00:00"
    },
    {
        "eventid": 2,
        "eventname": "AI Workshop",
        "starttime": "2024-12-18T13:00:00",
        "endtime": "2024-12-18T16:00:00"
    },
    {
        "eventid": 3,
        "eventname": "Holiday Party",
        "starttime": "2024-12-20T18:30:00",
        "endtime": "2024-12-20T23:00:00"
    },
    {
        "eventid": 4,
        "eventname": "New Year Marathon",
        "starttime": "2025-01-01T06:00:00",
        "endtime": "2025-01-01T12:00:00"
    },
    {
        "eventid": 5,
        "eventname": "Coding Bootcamp",
        "starttime": "2025-01-05T10:00:00",
        "endtime": "2025-01-07T16:00:00"
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
async function fetchMockData() {
  await sleep(1000);
  return mockData;
}

// think about error condition
async function fetchMockDataWithError() {
  throw new Error("404 not found!");
}

export { fetchMockData };
