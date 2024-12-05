import styles from "./App.module.css";

export const User = (props) => {
    return (
      <tr>
        <td>{props.name}</td>
        <td>{props.age}</td>
        <td>{props.sex}</td>
      </tr>
    );
  };