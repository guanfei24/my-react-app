import { useEffect, useState } from "react";
import "./style.css";
function CheckBoxGroup() {
  const [selectAll, setSelectAll] = useState(false);
  const [kosher, setKosher] = useState(false);
  const [noCelery, setNoCelery] = useState(false);
  const [noEgg, setNoEgg] = useState(false);
  const [selectValue, setSelectValue] = useState("");

  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      setKosher(true);
      setNoCelery(true);
      setNoEgg(true);
    } else {
      setKosher(false);
      setNoCelery(false);
      setNoEgg(false);
    }
  };
  useEffect(() => {
    if (kosher && noCelery && noEgg) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
    let str = "";
    if (kosher) str = "Kosher,";
    if (noCelery) str = str + " No Celery,";
    if (noEgg) str = str + " No Egg";

    setSelectValue(str.replace(/,$/, ""));
  }, [kosher, noCelery, noEgg]);

  const clearAll = () => {
    setSelectAll(false);
    setKosher(false);
    setNoCelery(false);
    setNoEgg(false);
  };
  return (
    <div className="divCheckBoxGroup">
      <h1>CheckBoxGroup</h1>
      <h3>Selected Value : {selectValue}</h3>
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
      <div>
        <label>
          <input
            type="checkbox"
            checked={kosher}
            onChange={(e) => {
              setKosher(e.target.checked);
            }}
          />
          Kosher
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={noCelery}
            onChange={(e) => {
              setNoCelery(e.target.checked);
            }}
          />
          No Celery(inc celeriac)
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={noEgg}
            onChange={(e) => {
              setNoEgg(e.target.checked);
            }}
          />
          No Egg
        </label>
      </div>
      <div>
        <button type="button" onClick={clearAll} className="btnClearAll">
          Clear All
        </button>
      </div>
    </div>
  );
}

export default CheckBoxGroup;
