export const Task = (props) => {
    return (
      <tr>
        <td>{props.name}</td>
        <td>{props.status}</td>
      </tr>
    );
  };