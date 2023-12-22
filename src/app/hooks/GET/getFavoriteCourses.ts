import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { getCanvasAPIToken } from "../../../../env";

export const useFavoriteCourses = <T>() => {
  const [favoriteCourses, setfavoriteCoursesData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const auth = {
      headers: { Authorization: `Bearer ${getCanvasAPIToken()}` },
    };
    const url =
      "https://uia.instructure.com/api/v1/users/self/favorites/courses";

    const fetchData = async () => {
      try {
        const response: AxiosResponse<T> = await axios.get(url, auth);
        setfavoriteCoursesData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return { favoriteCourses, loading, error };
};
