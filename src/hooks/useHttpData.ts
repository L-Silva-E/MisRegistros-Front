import axios from "axios";
import { useEffect, useState } from "react";
import { API_KEY } from "../constants/environment";

export default function useHttpData<T>(url: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    let ignore = false;
    setLoading(true);

    axios
      .get<{ data: T[] }>(url, {
        signal,
        headers: { "api-key": API_KEY },
      })
      .then(({ data }) => {
        if (!ignore) {
          setData(data.data);
        }
      })
      .catch((error) => {
        if (!ignore && error.name !== "CanceledError") {
          console.error("Error fetching data:", error);
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
      ignore = true;
    };
  }, [url]);

  return { data, setData, loading, setLoading };
}
