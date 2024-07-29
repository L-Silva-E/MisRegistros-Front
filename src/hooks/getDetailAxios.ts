import { useState } from "react";

import axios from "axios";

import { API_KEY } from "../constants/environment";

export default <T>() => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T>();

  const getAxios = (url: string) => {
    setLoading(true);

    axios
      .get(url, { headers: { "api-key": API_KEY } })
      .then(({ data }) => setData(data.data[0]))
      .finally(() => setLoading(false));
  };

  return { loading, setLoading, data, getAxios };
};
