import { useState } from "react";

export default function AddUserForm() {
  const [userList, setUserList] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setUserList([
      ...userList,
      {
        firstName,
        lastName,
        phone,
      },
    ]);
    setFirstName("");
    setLastName("");
    setPhone("");
  };
  return (
    <div className="divAddUser">
      <h1>Add User</h1>
      <div>
        <form onSubmit={onSubmit}>
          <label>First Name </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            required
          ></input>
          <label>Last Name </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            required
          ></input>
          <label>Phone</label>
          <input
            type="number"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            required
          ></input>
          <button type="submit" className="btnAddUser">
            Add User
          </button>
        </form>
        <table>
          <thead>
            <tr>
              <td className="td">Frist Name</td>
              <td className="td">Last Name</td>
              <td className="td">Phone</td>
            </tr>
          </thead>
          <tbody>
            {userList.length > 0 ? (
              userList.map((user, index) => {
                const { firstName, lastName, phone } = user;
                return (
                  <tr key={index}>
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>{phone}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="3">No Data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
