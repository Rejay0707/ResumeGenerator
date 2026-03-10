import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getInternships, applyInternship } from "../services/internshipService";
import InternshipListPage from "../pages/InternshipListPage";

export default function InternshipListContainer() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Move useSelector to top level of component
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      const res = await getInternships();
      setInternships(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleApply = async (id) => {
    try {
      setLoading(true);

      const studentId = user?.id;

      const res = await applyInternship(id, studentId);

      console.log("FULL RESPONSE:", res);

      // 🔥 Detect structure automatically
      const data = res.data ? res.data : res;

      console.log("ACTUAL DATA:", data);

      const applicationId = data.application_id;

      console.log("Application ID:", applicationId);

      if (applicationId) {
        localStorage.setItem("application_id", applicationId);
        alert(data.message);
      } else {
        alert("Application submitted but ID missing");
      }
    } catch (err) {
      console.error("ERROR:", err);
      alert(err.response?.data?.message || "Failed to apply");
    } finally {
      setLoading(false);
    }
  };

  return (
    <InternshipListPage
      internships={internships}
      onApply={handleApply}
      loading={loading}
    />
  );
}
