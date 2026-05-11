import { useCallback, useRef, useState } from "react";
import axios from "axios";

import { API_KEY } from "../constants/environment";
import { HTTP_METHODS } from "../constants/httpMethods";
import { AUTH_TOKEN_KEY } from "../constants/authStorage";

const useAxios = <T>() => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<Error | null>(null);
  const requestInProgressRef = useRef<Record<string, boolean>>({});
  const abortControllerRef = useRef<AbortController | null>(null);

  const axiosFetch = useCallback(
    async (method: keyof typeof HTTP_METHODS, url: string, body?: any) => {
      const requestKey = `${method}-${url}-${JSON.stringify(body || {})}`;

      if (requestInProgressRef.current[requestKey]) {
        return;
      }

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      requestInProgressRef.current[requestKey] = true;

      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem(AUTH_TOKEN_KEY);
        const responseAxios = await axios({
          method,
          url,
          headers: {
            "api-key": API_KEY,
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          data: body,
          signal: abortControllerRef.current.signal,
        });

        let responseData = responseAxios.data;

        if (method === HTTP_METHODS.GET) {
          if (/[?&]id=/.test(url)) {
            responseData = responseAxios.data.data[0];
          } else {
            responseData = responseAxios.data.data;
          }
        }

        setData(responseData);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(err as Error);
          console.error(`Error with ${method} request:`, err);
        }
      } finally {
        setLoading(false);
        requestInProgressRef.current[requestKey] = false;
      }
    },
    [],
  );

  return { loading, data, error, axiosFetch };
};

export default useAxios;
