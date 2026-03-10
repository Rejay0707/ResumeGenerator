// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchSubmissions, reviewSubmission } from "../features/adminSlice";
// import ModerationTable from "../components/ModerationTable";
// import ModerationFilters from "../components/ModerationFilters";

// export default function AdminModerationContainer() {
//   const dispatch = useDispatch();

//   const submissions = useSelector((state) => state.admin.data.submissions);

//   const handleApprove = (item) => {
//     dispatch(
//       reviewSubmission({
//         id: item.id,
//         type: item.type, // IMPORTANT
//         status: "approved",
//         feedback: "Valid submission",
//       }),
//     );
//   };

//   const handleReject = (item) => {
//     dispatch(
//       reviewSubmission({
//         id: item.id,
//         type: item.type, // IMPORTANT
//         status: "rejected",
//         feedback: "Invalid submission",
//       }),
//     );
//   };
//   const loading = useSelector((state) => state.admin.loading);

//   const [type, setType] = useState("certificates");
//   const [status, setStatus] = useState("pending");

//   useEffect(() => {
//     dispatch(fetchSubmissions({ type, status }));
//   }, [dispatch, type, status]);

//   return (
//     <>
//       <ModerationFilters
//         type={type}
//         status={status}
//         onTypeChange={setType}
//         onStatusChange={setStatus}
//       />

//       <ModerationTable
//         data={submissions}
//         loading={loading}
//         onApprove={handleApprove}
//         onReject={handleReject}
//         onReviewClick={(item) => console.log(item)}
//       />
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubmissions, reviewSubmission } from "../features/adminSlice";
import ModerationTable from "../components/ModerationTable";
import ModerationFilters from "../components/ModerationFilters";
import { Snackbar, Alert } from "@mui/material";

export default function AdminModerationContainer() {
  const dispatch = useDispatch();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const submissions = useSelector((state) => state.admin.data.submissions);
  const loading = useSelector((state) => state.admin.loading);

  // ✅ get collegeId from auth
  const collegeId = useSelector((state) => state.auth.collegeId);

  const [type, setType] = useState("certificates");
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    dispatch(fetchSubmissions({ type, status }));
  }, [dispatch, type, status]);

  const handleReview = async (item, status) => {
    const result = await dispatch(
      reviewSubmission({
        id: item.id,
        type,
        status,
        feedback: "Reviewed by admin",
        college_id: collegeId,
      }),
    );

    if (reviewSubmission.fulfilled.match(result)) {
      setSnackbar({
        open: true,
        message: `Submission ${status} successfully`,
        severity: "success",
      });

      dispatch(fetchSubmissions({ type, status: "pending" }));
    } else {
      setSnackbar({
        open: true,
        message: result.payload?.message || "Something went wrong",
        severity: "error",
      });
    }
  };

  return (
    <>
      <ModerationFilters
        type={type}
        status={status}
        onTypeChange={setType}
        onStatusChange={setStatus}
      />

      <ModerationTable
        data={submissions}
        loading={loading}
        onApprove={(item) => handleReview(item, "approved")}
        onReject={(item) => handleReview(item, "rejected")}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
