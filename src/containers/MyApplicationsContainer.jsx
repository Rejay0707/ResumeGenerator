import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getMyApplications } from "../services/internshipService";
import MyApplicationsPage from "../pages/MyApplicationsPage"

export default function MyApplicationsContainer() {
  const [applications, setApplications] = useState([]);

  const reduxUser = useSelector((state) => state.auth.user);
  const localUser = JSON.parse(localStorage.getItem("user"));

  const user = reduxUser || localUser; // fallback safety
  console.log(user)

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
    const studentId = user.id;
    const applicationId = localStorage.getItem("application_id");

    console.log("studentId:", studentId);
    console.log("applicationId:", applicationId);

    if (!applicationId) {
      console.warn("No application_id stored");
      return;
    }

    const res = await getMyApplications(applicationId, studentId);
    console.log("API response:", res.data);

    setApplications(res.data);
  } catch (err) {
    console.error("Error fetching applications", err);
  }
};

  return <MyApplicationsPage applications={applications} />;
}