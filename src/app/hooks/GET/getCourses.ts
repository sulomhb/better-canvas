import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { getCanvasAPIToken } from "../../../../env";

export const useCourses = <T>() => {
  const [courses, setCoursesData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(getCanvasAPIToken());
    const auth = {
      headers: { Authorization: getCanvasAPIToken() },
    };
    const url = "https://uia.instructure.com/api/v1/users/self/courses";

    const fetchData = async () => {
      try {
        const response: AxiosResponse<T> = await axios.get(url, auth);
        setCoursesData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return { courses, loading, error };
};
