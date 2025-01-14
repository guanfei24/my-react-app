import { useEffect, useState } from "react";
import { fetchMockData } from "./getMockDataList";
import "./style.css";

export default function DataList() {
  const [datalist, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchMockData().then((data) => {
      setDataList(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <h1>DataList</h1>
      <div>
        {isLoading
          ? "Data is loading"
          : datalist.map((data) => {
              const { userId, title, body } = data;
              return (
                <ul key={userId}>
                  <li>{title}</li>
                  <p>{body}</p>
                </ul>
              );
            })}
      </div>
    </>
  );
}
