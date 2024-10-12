import { useState } from 'react';
import axios from 'axios';
import { API_KEY } from '../constants/environment';

const usePatchDataAxios = <T,>() => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const patchData = async (url: string, body: any) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.patch<T>(url, body, {
        headers: { 'api-key': API_KEY },
      });
      setData(response.data);
    } catch (err) {
      setError(err as Error);
      console.error('Error updating data with Axios:', err);
      console.log(' >>> Err');
      console.log(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, patchData };
};

export default usePatchDataAxios;
