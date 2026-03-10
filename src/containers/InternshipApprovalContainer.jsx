import { useEffect, useState } from "react";
import { getPendingApplications,updateApplicationStatus,uploadLetter } from "../services/internshipService";
import InternshipApprovalPage from "../pages/admin/InternshipApprovalPage";

export default function InternshipApprovalContainer() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    const res = await getPendingApplications();
    setApplications(res.data);
  };

  const handleApprove = async (id) => {
    await updateApplicationStatus(id, "approved");
    fetchPending();
  };

  const handleReject = async (id) => {
    await updateApplicationStatus(id, "rejected");
    fetchPending();
  };

  const handleUploadLetter = async (id, file) => {
    await uploadLetter(id, file);
    alert("Letter uploaded");
  };

  return (
    <InternshipApprovalPage
      applications={applications}
      onApprove={handleApprove}
      onReject={handleReject}
      onUploadLetter={handleUploadLetter}
    />
  );
}