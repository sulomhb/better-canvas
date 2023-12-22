import { useState } from "react";
import axios from "axios";
import { getCanvasAPIToken } from "../../../../env";

export const useLeaveGroup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const leaveGroup = async (groupID) => {
    setLoading(true);
    try {
      const auth = {
        headers: { Authorization: `Bearer ${getCanvasAPIToken()}` },
      };

      const url = `https://uia.instructure.com/api/v1/groups/${groupID}/memberships/self`;

      await axios.delete(url, auth);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return { leaveGroup, loading, error };
};
