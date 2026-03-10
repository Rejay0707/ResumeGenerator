import { useEffect, useState } from "react";
import api from "../services/api";
import AdminInternshipsPage from "../pages/admin/AdminInternshipsPage";
import useAuth from "./AuthContainer";

export default function AdminInternshipsContainer() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [notes, setNotes] = useState("");
  const { user } = useAuth();


  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/admin/internships", {
        params: { status: "pending" },
      });
      setInternships(res.data);
    } catch (err) {
      console.error("Failed to fetch internships", err);
    } finally {
      setLoading(false);
    }
  };

  const openDialog = (item, type) => {
    setSelected(item);
    setActionType(type);
    setNotes("");
  };

  const closeDialog = () => {
    setSelected(null);
    setActionType(null);
    setNotes("");
  };

  const handleConfirm = async () => {
  if (!selected || !actionType) return;

  try {

    await api.patch(
      `/api/admin/internships/${selected.id}/${actionType}`,
      {
        reviewed_by: user.id,
        admin_notes: notes,
      }
    );

    // ✅ UPDATE LOCAL STATE INSTANTLY
    setInternships((prev) =>
      prev.map((item) =>
        item.id === selected.id
          ? { ...item, approval_status: actionType === "approve" ? "approved" : "rejected" }
          : item
      )
    );

    closeDialog();
  } catch (err) {
    console.error("Approval failed:", err.response?.data || err.message);
  }
};

  // console.log(handleConfirm)

  return (
    <AdminInternshipsPage
      internships={internships}
      loading={loading}
      selected={selected}
      actionType={actionType}
      notes={notes}
      setNotes={setNotes}
      onApprove={(item) => openDialog(item, "approve")}
      onReject={(item) => openDialog(item, "reject")}
      onCloseDialog={closeDialog}
      onConfirm={handleConfirm}
    />
  );
}
