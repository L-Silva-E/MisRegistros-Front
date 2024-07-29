import { useEffect, useState } from "react";

import axios from "axios";

import { API_KEY } from "../constants/environment";

export default function getDataAxios<T>(url: string) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T[]>([]);

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
          console.error("Error getting data with Axios:", error);
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

  return { loading, setLoading, data, setData };
}
