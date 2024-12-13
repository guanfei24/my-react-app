import { useEffect, useState } from "react";
import { fetchMockData } from "./getMockDataList";

export default function EventList() {
  //events List
  const [events, setEvents] = useState([]);
  const [copyEvents, setCopyEvents] = useState([]);
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
  function counter(userlist) {
    let id = userlist.length + 1;
    return id;
  }
  //add event function-----by form onSubmit
  const addEvent = () => {
    const id = counter(events);
    setEvents([
      ...events,
      {
        eventid: id,
        eventname: "",
        starttime: "",
        endtime: "",
        isEdit: true,
      },
    ]);
    setCopyEvents([
      ...events,
      {
        eventid: id,
        eventname: "",
        starttime: "",
        endtime: "",
        isEdit: true,
      },
    ]);
  };
  //delete event  -------- delete event from events
  const deleteEvent = (id) => {
    setEvents(events.filter((item) => item.eventid !== id));
  };
  // save edit function
  const saveEdit = (event) => {
    if (!inputValidation(event.eventid)) return;
    const even = copyEvents.filter((item) => item.eventid === event.eventid);

    //even is an Array [object]****
    //console.log(even[0]);***
    setEvents(
      events.map((item) => {
        if (item.eventid === event.eventid) {
          return {
            ...even[0],
            isEdit: !item.isEdit,
          };
        } else {
          return item;
        }
      })
    );
  };
  //edit handler(edit and cancel function)
  const editHandler = (id) => {
    setEvents(
      events
        .filter((item) => item.eventname !== "")
        .map((item) => {
          if (item.eventid === id) {
            return { ...item, isEdit: !item.isEdit };
          } else {
            if (item.eventname !== "") return item;
          }
        })
    );
  };
  //udpate input of every item in events
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
  /** make up
   *search function
   *order function
   *Error Handling
   */

  return (
    <>
      <div>
        <h1>Event List</h1>
        <button onClick={addEvent}>Add Event</button>
        <table>
          <thead>
            <tr>
              <td>Event</td>
              <td>Start</td>
              <td>End</td>
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
          <tfoot>{}</tfoot>
        </table>
      </div>
    </>
  );
}
