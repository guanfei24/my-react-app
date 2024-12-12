import { useEffect, useState } from "react";
import "./style.css";
const itemList = [
  { id: 1, name: "Kosher", checked: false },
  { id: 2, name: "NO Celery", checked: false },
  { id: 3, name: "No Egg", checked: false },
];
function CheckBoxGroup() {
  const [checkBoxes, setCheckBoxes] = useState(itemList);
  const selectAll = checkBoxes.every((item) => item.checked);

  const handleSelectAll = () => {
    setCheckBoxes(
      checkBoxes.map((item) => {
        return { ...item, checked: !selectAll };
      })
    );
  };

  const handleCheckBox = (id) => {
    setCheckBoxes(
      checkBoxes.map((item) => {
        if (id === item.id) {
          return { ...item, checked: !item.checked };
        } else {
          return item;
        }
      })
    );
  };
  const clearAll = () => {
    setCheckBoxes(
      checkBoxes.map((item) => {
        return { ...item, checked: false };
      })
    );
  };
  const selectedValues = Array.prototype.join.call(
    checkBoxes.filter((item) => item.checked === true).map((ee) => ee.name),
    ", "
  );
  return (
    <div className="divCheckBoxGroup">
      <h1>CheckBoxGroup</h1>
      <h3>Selected Value :{<span>{selectedValues}</span>}</h3>
      <div>
        <label>
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
          />
          Select All
        </label>
      </div>
      {checkBoxes.map((item) => {
        const { id, name, checked } = item;
        return (
          <div key={id}>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => handleCheckBox(id)}
            />
            <span>{name}</span>
          </div>
        );
      })}
      <div>
        <button type="button" onClick={clearAll} className="btnClearAll">
          Clear All
        </button>
      </div>
    </div>
  );
}

export default CheckBoxGroup;
