export const Task = ({ name, status, index, onEdit, onDelete, isEditing, onSave, onCancel, taskName, taskStatus }) => {
    return (
      <tr>
        <td>
          {isEditing ? (
            <input 
              type="text" 
              value={taskName} 
              onChange={(e) => onEdit('name', e.target.value, index)} 
            />
          ) : (
            name
          )}
        </td>
        <td>
          {isEditing ? (
            <select 
              value={taskStatus} 
              onChange={(e) => onEdit('status', e.target.value, index)}
            >
              <option value="Processing">Processing</option>
              <option value="Done">Done</option>
            </select>
          ) : (
            status
          )}
        </td>
        <td>
          {isEditing ? (
            <>
              <button onClick={() => onSave(index)}>Save</button>
              <button onClick={() => onCancel(index)}>Cancel</button>
            </>
          ) : (
            <>
              <button onClick={() => onEdit('start', '', index)}>Edit</button>
              <button onClick={() => onDelete(index)}>Delete</button>
            </>
          )}
        </td>
      </tr>
    );
  };