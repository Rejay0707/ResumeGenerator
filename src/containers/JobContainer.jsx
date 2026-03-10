import { useEffect, useState } from "react";
import { getJobs, applyJob } from "../services/jobApi";

export default function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [applyingJobId, setApplyingJobId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const studentId = user?.id;

  // Fetch jobs
  const fetchJobs = async () => {
    setLoading(true);

    try {
      const response = await getJobs();
      setJobs(response.jobs || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }

    setLoading(false);
  };

  // Apply to job
  const handleApply = async (jobId) => {
    if (!studentId) return;

    try {
      setApplyingJobId(jobId);

      await applyJob(jobId, studentId);

      alert("Applied successfully");
    } catch (error) {
      if (error.response?.status === 409) {
        alert("You already applied");
      } else {
        console.error("Apply failed:", error);
        alert("Failed to apply");
      }
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return {
    jobs,
    loading,
    applyingJobId,
    handleApply,
  };
}
