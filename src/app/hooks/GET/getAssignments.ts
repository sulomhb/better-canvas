import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { getCanvasAPIToken } from "../../../../env";

export const useAssignments = <T>(course: string) => {
  const [assignments, setAssignmentsData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const auth = {
    headers: { Authorization: `Bearer ${getCanvasAPIToken()}` },
  };
  // 13733

  const fetchAssignments = async (courseID) => {
    const url = `https://uia.instructure.com/api/v1/users/self/courses/${courseID}/assignments`;

    try {
      const response: AxiosResponse<T> = await axios.get(url, auth);
      setAssignmentsData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return { fetchAssignments, assignments, loading, error };
};
