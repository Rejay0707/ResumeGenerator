import { useEffect, useState } from "react";
import { getApplications } from "../services/jobApi";

export default function useApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await getApplications(userId);
      setApplications(res.data || []);
    } catch (err) {
      console.error("Failed to fetch applications", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return {
    applications,
    loading,
  };
}