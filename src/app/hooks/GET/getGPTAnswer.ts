import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { getCanvasAPIToken } from "../../../../env";

export const useGPTAnswer = <T>() => {
  const [gptAnswer, setGPTAnswer] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const auth = {
    headers: { Authorization: `Bearer ${getCanvasAPIToken()}` },
  };

  const fetchGPTAnswer = async (gptQuery: string) => {
    const url = `https://bettercanvas-api.onrender.com/askGPT/${gptQuery}`;
    try {
      const response: AxiosResponse<T> = await axios.get(url, auth);
      setGPTAnswer(response.data["data"]["content"]);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return { fetchGPTAnswer, gptAnswer, loading, error };
};
