import { useEffect, useState } from "react";

export default function UseFetch(api) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRefetching, setRefetching] = useState(false);

  const refetch = () => {
    setRefetching(true);
    setData([]);
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        console.log("data: ", data);
        setData(data);
      })
      .catch((error) => {
        console.log("error: ", error);
        setError(error);
      })
      .finally(() => {
        setRefetching(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        console.log("data: ", data);
        setData(data);
      })
      .catch((error) => {
        console.log("error: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, loading, error, refetch, isRefetching };
}
