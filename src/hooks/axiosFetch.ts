import { useState } from "react";
import axios from "axios";
import { API_KEY } from "../constants/environment";

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

const useAxios = <T>() => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<Error | null>(null);

  const axiosFetch = async (method: HttpMethod, url: string, body?: any) => {
    setLoading(true);
    setError(null);

    try {
      const responseAxios = await axios({
        method,
        url,
        headers: { "api-key": API_KEY },
        data: body,
      });

      let responseData = responseAxios.data;

      if (method === "GET") {
        if (/[?&]id=/.test(url)) {
          responseData = responseAxios.data.data[0];
        } else {
          responseData = responseAxios.data.data;
        }
      }

      setData(responseData);
    } catch (err) {
      setError(err as Error);
      console.error(`Error with ${method} request:`, err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, axiosFetch };
};

export default useAxios;
