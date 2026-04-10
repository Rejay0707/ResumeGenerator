import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getMyApplications } from "../services/internshipService";
import MyApplicationsPage from "../pages/MyApplicationsPage";

export default function MyApplicationsContainer() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const reduxUser = useSelector((state) => state.auth.user);
  const localUser = JSON.parse(localStorage.getItem("user"));

  const user = reduxUser || localUser; // fallback safety
  console.log(user);

  useEffect(() => {
    console.log("Container mounted");

    console.log("Redux user:", reduxUser);
    console.log("Local user:", localUser);

    if (user?.id) {
      console.log("User found, fetching apps...");
      fetchApps();
    } else {
      console.log("No user found");
    }
  }, [user]);

  const fetchApps = async () => {
    try {
      setLoading(true);

      const studentId = user.id;
      const applicationId = localStorage.getItem("application_id");

      if (!applicationId) {
        setApplications([]);
        return;
      }

      const res = await getMyApplications(applicationId, studentId);
      setApplications(res.data || []);
    } catch (err) {
      console.error("Error fetching applications", err);
    } finally {
      setLoading(false);
    }
  };

  return <MyApplicationsPage applications={applications} loading={loading} />;
}
