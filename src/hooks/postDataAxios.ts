import { useState } from 'react';
import axios from 'axios';
import { API_KEY } from '../constants/environment';

const usePostDataAxios = <T,>() => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const postData = async (url: string, body: any) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<T>(url, body, {
        headers: { 'api-key': API_KEY },
      });
      setData(response.data);
    } catch (err) {
      setError(err as Error);
      console.error('Error posting data with Axios:', err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, postData };
};

export default usePostDataAxios;
