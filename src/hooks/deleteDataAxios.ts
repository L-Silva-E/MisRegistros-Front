import { useState } from "react";
import axios from "axios";
import { API_KEY } from "../constants/environment";

const useDeleteDataAxios = <T>() => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const deleteData = async (url: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.delete<T>(url, {
        headers: { "api-key": API_KEY },
      });
      setData(response.data);
    } catch (err) {
      setError(err as Error);
      console.error("Error deleting data with Axios:", err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, deleteData };
};

export default useDeleteDataAxios;
