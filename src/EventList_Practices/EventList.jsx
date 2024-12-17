import { useEffect, useState } from "react";
import MockDataApi from "./getMockDataList";
import "./style.css";
export default function EventList() {
  //events List
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [orderStatus, setOrderStatus] = useState(0);
  const [searchInput, setSearchInput] = useState("");

  //useEffect to initialize EventList
  useEffect(() => {
    (async () => {
      const events = await MockDataApi.fetchMockData();
      setEvents(events);
    })();
  }, []);

  //add event function-----by form onSubmit
  const openForm = () => {
    setShowForm(true);
  };
  const closeForm = () => {
    setShowForm(false);
  };
  //add event function
  const addEvent = async (event) => {
    const newEvent = await MockDataApi.addEvent(event);
    setEvents((prev) => [...prev, newEvent]);
    return newEvent;
  };
  //delete event  -------- delete event from events
  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((event) => event.eventid !== id));
  };
  // save edit function
  const saveEdit = (id, newEvent) => {
    // if (!inputValidation(event.eventid)) return;
    console.log("id: ", id);
    console.log("newEvent: ", newEvent);
    setEvents((prev) =>
      prev.map((event) => {
        return event.eventid === id
          ? {
              eventid: id,
              ...newEvent,
            }
          : event;
      })
    );
    console.log("events: ", events);
  };
  //edit handler(edit and cancel function)
  const editEvent = (id) => {};
  //update input of every item in events
  const updateInput = (id, type, value) => {};
  //input validation
  const inputValidation = (id) => {
    const { eventname, starttime, endtime } = events.filter(
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
    const result = events.filter((item) =>
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
        <button onClick={openForm} className="add-event-btn">
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
              <td>Start</td>
              <td>End</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => {
              return (
                <EventRow
                  key={event.eventid}
                  event={event}
                  deleteEvent={deleteEvent}
                  editEvent={editEvent}
                  saveEdit={saveEdit}
                />
              );
            })}
          </tbody>
          <tfoot>
            {showForm && (
              <NewEventForm addEvent={addEvent} closeForm={closeForm} />
            )}
          </tfoot>
        </table>
      </div>
    </>
  );
}

function NewEventForm({ addEvent, closeForm }) {
  const [event, setEvent] = useState({
    eventname: "",
    starttime: "",
    endtime: "",
  });

  const { eventName, start, end } = event;

  const inputHandle = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };
  const formSubmit = async () => {
    const res = await addEvent(event);
    closeForm();
  };

  return (
    <tr>
      <td>
        <input
          type="text"
          value={eventName}
          name="eventname"
          onChange={inputHandle}
        />
      </td>
      <td>
        <input
          type="date"
          value={start}
          name="starttime"
          onChange={inputHandle}
        />
      </td>
      <td>
        <input type="date" value={end} name="endtime" onChange={inputHandle} />
      </td>
      <td>
        {}
        <button type="button" onClick={formSubmit}>
          Add
        </button>
        <button type="button" onClick={closeForm}>
          Cancel
        </button>
      </td>
    </tr>
  );
}

function EventRow({ event, deleteEvent, saveEdit }) {
  const [isEdit, setIsEdit] = useState(false);
  const { eventid, eventname, starttime, endtime } = event;
  const [eventInstance, setEventInstance] = useState({
    eventid,
    eventname,
    starttime,
    endtime,
  });

  const inputHandle = (e) => {
    const { name, value } = e.target;
    setEventInstance({ ...eventInstance, [name]: value });
  };
  const editEvent = () => {
    setIsEdit(!isEdit);
  };
  const handleSave = () => {
    editEvent(eventid, eventInstance);
    setIsEdit(false);
  };
  return (
    <tr>
      <td>
        {isEdit ? (
          <input
            type="text"
            name="eventname"
            value={eventInstance.eventname}
            onChange={inputHandle}
          />
        ) : (
          eventInstance.eventname
        )}
      </td>
      <td>
        {isEdit ? (
          <input
            type="date"
            name="starttime"
            value={eventInstance.starttime}
            onChange={inputHandle}
          />
        ) : (
          eventInstance.starttime
        )}
      </td>
      <td>
        {isEdit ? (
          <input
            type="date"
            name="endtime"
            defaultValue={eventInstance.endtime}
            onChange={inputHandle}
          />
        ) : (
          eventInstance.endtime
        )}
      </td>
      <td>
        {isEdit ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={() => editEvent(eventid)}>Edit</button>
        )}
        {isEdit ? (
          <button onClick={editEvent}>Cancel</button>
        ) : (
          <button onClick={() => deleteEvent(eventid)}>Delete</button>
        )}
      </td>
    </tr>
  );
}
