import { useEffect, useState } from "react";

function CheckBoxGroup() {
  const [selectAll, setSelectAll] = useState(false);
  const [kosher, setKosher] = useState(false);
  const [noCelery, setNoCelery] = useState(false);
  const [noEgg, setNoEgg] = useState(false);

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
  const handleKosher = (e) => {
    setKosher(e.target.checked);
  };
  const handleNoCelery = (e) => {
    setNoCelery(e.target.checked);
  };
  const handleNoEgg = (e) => {
    setNoEgg(e.target.checked);
  };
  useEffect(() => {
    if (kosher && noCelery && noEgg) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
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
          <input type="checkbox" checked={kosher} onChange={handleKosher} />
          Kosher
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" checked={noCelery} onChange={handleNoCelery} />
          No Celery(inc celeriac)
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" checked={noEgg} onChange={handleNoEgg} />
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
