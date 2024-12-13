import { useEffect, useState } from "react";
import { fetchMockData } from "./getMockDataList";
import "./style.css";
export default function EventList() {
  //events List
  const [events, setEvents] = useState([]);
  const [copyEvents, setCopyEvents] = useState([]);
  const [orderStatus, setOrderStatus] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  //useEffect to initialize EventList
  useEffect(() => {
    fetchMockData().then((data) => {
      setEvents(
        data.map((eve) => {
          const { eventid, eventname, starttime, endtime } = eve;
          return { eventid, eventname, starttime, endtime, isEdit: false };
        })
      );
      setCopyEvents(
        data.map((eve) => {
          const { eventid, eventname, starttime, endtime } = eve;
          return { eventid, eventname, starttime, endtime, isEdit: false };
        })
      );
    });
  }, []);
  //id counter
  function counter() {
    const maxEvent = events.reduce((max, currentEvent) => {
      return currentEvent.eventid > max.eventid ? currentEvent : max;
    }, events[0]);
    console.log("Event with max ID:", maxEvent.eventid);
    return maxEvent.eventid + 1;
  }
  //add event function-----by form onSubmit
  const addEvent = () => {
    const id = counter();
    const newEvent = {
      eventid: id,
      eventname: "",
      starttime: "",
      endtime: "",
      isEdit: true,
    };
    setEvents([...events, newEvent]);
    setCopyEvents([...events, newEvent]);
  };
  //delete event  -------- delete event from events
  const deleteEvent = (id) => {
    const newEvents = events.filter((item) => item.eventid !== id);
    const newCopyEvents = copyEvents.filter((item) => item.eventid !== id);
    setEvents(newEvents);
    setCopyEvents(newCopyEvents);
  };
  // save edit function
  const saveEdit = (event) => {
    if (!inputValidation(event.eventid)) return;
    const newCopyEvent = copyEvents.find((item) => item.eventid === event.eventid);
    const newEvents = events.map((item) => {
      if (item.eventid === event.eventid) {
        return {
          ...newCopyEvent,
          isEdit: !item.isEdit,
        };
      } else {
        return item;
      }
    })
    //even is an Array [object]****
    //console.log(even[0]);***
    setEvents(newEvents);
    setCopyEvents(newEvents);
  };
  //edit handler(edit and cancel function)
  const editHandler = (id) => {
    const newEvents = events
      .filter((item) => item.eventname !== "")
      .map((item) => {
        if (item.eventid === id) {
          return { ...item, isEdit: !item.isEdit };
        } else {
          if (item.eventname !== "") return item;
        }
      });
    setEvents(newEvents);
    setCopyEvents(newEvents);
  };
  //update input of every item in events
  const updateInput = (id, type, value) => {
    setCopyEvents(
      copyEvents.map((item) => {
        if (id === item.eventid) {
          return { ...item, [type]: value };
        } else {
          return item;
        }
      })
    );
  };
  //input validation
  const inputValidation = (id) => {
    const { eventname, starttime, endtime } = copyEvents.filter(
      (item) => item.eventid === id
    )[0];
    if (eventname === "" || starttime === "" || endtime === "") {
      alert("Input Not Valid!");
      return false;
    }
    if (new Date(starttime).getTime() > new Date(endtime).getTime()) {
      alert("Start Date must greater than End Date!");
      return false;
    }

    return true;
  };
  //orderByDate
  const orderByDate = (type) => {
    console.log(orderStatus);
    const newEvents = [...events].sort((a, b) => {
      const preTime = new Date(a[type]).getTime();
      const behTime = new Date(b[type]).getTime();
      return orderStatus > 0 ? behTime - preTime : preTime - behTime;
    });
    const newOrderStatus = orderStatus > 0 ? -1 : 1;
    setOrderStatus(newOrderStatus);
    setEvents([...newEvents]);
  };
  //search function
  const eventSearch = (input) => {
    setSearchInput(input);
    const result = copyEvents.filter((item) =>
      item.eventname.toLowerCase().includes(input.toLowerCase())
    );
    setEvents(result);
  };
  /** make up
   *Error Handling
   */

  return (
    <>
      <div className="container">
        <button onClick={addEvent} className="add-event-btn">
          Add New Event
        </button>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => eventSearch(e.target.value)}
          className="input-search"
          placeholder="Search by Event"
        />
        <table className="event-table">
          <thead>
            <tr>
              <td>Event</td>
              <td onClick={() => orderByDate("starttime")}>Start</td>
              <td onClick={() => orderByDate("endtime")}>End</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => {
              let { eventid, eventname, starttime, endtime, isEdit } = event;
              return (
                <tr key={eventid}>
                  <td>
                    {isEdit ? (
                      <input
                        type="text"
                        defaultValue={eventname}
                        onChange={(e) =>
                          updateInput(eventid, "eventname", e.target.value)
                        }
                      />
                    ) : (
                      eventname
                    )}
                  </td>
                  <td>
                    {isEdit ? (
                      <input
                        type="date"
                        defaultValue={starttime}
                        onChange={(e) =>
                          updateInput(eventid, "starttime", e.target.value)
                        }
                      />
                    ) : (
                      starttime
                    )}
                  </td>
                  <td>
                    {isEdit ? (
                      <input
                        type="date"
                        defaultValue={endtime}
                        onChange={(e) =>
                          updateInput(eventid, "endtime", e.target.value)
                        }
                      />
                    ) : (
                      endtime
                    )}
                  </td>
                  <td>
                    {isEdit ? (
                      <button onClick={() => saveEdit(event)}>Save</button>
                    ) : (
                      <button onClick={() => editHandler(eventid)}>Edit</button>
                    )}
                    {isEdit ? (
                      <button onClick={() => editHandler(eventid)}>
                        Cancel
                      </button>
                    ) : (
                      <button onClick={() => deleteEvent(eventid)}>
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
