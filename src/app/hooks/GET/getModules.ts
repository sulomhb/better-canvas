import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { getCanvasAPIToken } from "../../../../env";

export const useModules = <T>() => {
  const [modules, setModulesData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const auth = {
    headers: { Authorization: `Bearer ${getCanvasAPIToken()}` },
  };

  const fetchModules = async (courseID: string) => {
    const url = `https://uia.instructure.com/api/v1/courses/${courseID}/modules`;
    try {
      const response: AxiosResponse<T> = await axios.get(url, auth);
      setModulesData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return { fetchModules, modules, loading, error };
};
