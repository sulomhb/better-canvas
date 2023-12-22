import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { getCanvasAPIToken } from "../../../../env";

export const useInbox = <T>() => {
  const [inbox, setInboxData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const auth = {
      headers: { Authorization: `Bearer ${getCanvasAPIToken()}` },
    };
    const url =
      "https://uia.instructure.com/api/v1/conversations#filter=type=inbox";
    const fetchData = async () => {
      try {
        const response: AxiosResponse<T> = await axios.get(url, auth);
        setInboxData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return { inbox, loading, error };
};
