// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   MenuItem,
//   Button,
//   Grid,
// } from "@mui/material";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { useState, useEffect } from "react";
// import { format } from "date-fns"; // Assuming date-fns is installed for formatting

// export default function InternshipDialog({
//   open,
//   onClose,
//   data,
//   readOnly,
//   onSave,
// }) {
//   const [form, setForm] = useState({
//     company: "",
//     role: "",
//     internship_type: "",
//     start_date: null, // Changed to Date object
//     end_date: null, // Changed to Date object
//     applied_date: null, // Changed to Date object
//     status: "applied",
//     description: "",
//     mentor_feedback: "",
//     student_learnings: "",
//   });

//   useEffect(() => {
//     if (data) {
//       setForm({
//         company: data.company || "",
//         role: data.role || "",
//         internship_type: data.internship_type || "",
//         start_date: data.start_date ? new Date(data.start_date + "-01") : null, // Parse YYYY-MM to Date (add -01 for day)
//         end_date: data.end_date ? new Date(data.end_date + "-01") : null,
//         applied_date: data.applied_date ? new Date(data.applied_date) : null,
//         status: data.status || "applied",
//         description: data.description || "",
//         mentor_feedback: data.mentor_feedback || "",
//         student_learnings: data.student_learnings || "",
//       });
//     }
//   }, [data]);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleDateChange = (name, value) => setForm({ ...form, [name]: value });

//   const handleSave = () => {
//     const payload = {
//       ...form,
//       start_date: form.start_date ? format(form.start_date, "yyyy-MM") : "",
//       end_date: form.end_date ? format(form.end_date, "yyyy-MM") : "",
//       applied_date: form.applied_date
//         ? format(form.applied_date, "yyyy-MM-dd")
//         : "",
//     };
//     console.log("SAVE CLICKED, PAYLOAD:", payload);
//     onSave(payload);
//   };

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
//       <DialogTitle>
//         {readOnly ? "View Internship" : "Add / Edit Internship"}
//       </DialogTitle>

//       <LocalizationProvider dateAdapter={AdapterDateFns}>
//         <DialogContent>
//           <TextField
//             label="Company"
//             name="company"
//             value={form.company}
//             onChange={handleChange}
//             fullWidth
//             margin="dense"
//             disabled={readOnly}
//           />

//           <TextField
//             label="Role"
//             name="role"
//             value={form.role}
//             onChange={handleChange}
//             fullWidth
//             margin="dense"
//             disabled={readOnly}
//           />

//           <TextField
//             label="Internship Type"
//             name="internship_type"
//             value={form.internship_type}
//             onChange={handleChange}
//             fullWidth
//             margin="dense"
//             disabled={readOnly}
//           />

//           <Grid container spacing={2} sx={{ mt: 1 }}>
//             <Grid item xs={6}>
//               <DatePicker
//                 label="Start Date"
//                 value={form.start_date}
//                 onChange={(value) => handleDateChange("start_date", value)}
//                 views={["year", "month"]}
//                 inputFormat="yyyy-MM"
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     fullWidth
//                     disabled={readOnly}
//                     sx={{
//                       "& .MuiInputBase-root": {
//                         height: 56,
//                       },
//                     }}
//                   />
//                 )}
//                 disabled={readOnly}
//               />
//             </Grid>

//             <Grid item xs={6}>
//               <DatePicker
//                 label="End Date"
//                 value={form.end_date}
//                 onChange={(value) => handleDateChange("end_date", value)}
//                 views={["year", "month"]}
//                 inputFormat="yyyy-MM"
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     fullWidth
//                     disabled={readOnly}
//                     sx={{
//                       "& .MuiInputBase-root": {
//                         height: 56,
//                       },
//                     }}
//                   />
//                 )}
//                 disabled={readOnly}
//               />
//             </Grid>
//           </Grid>

//           <TextField
//             label="Applied Date"
//             name="applied_date"
//             type="date"
//             value={form.applied_date}
//             onChange={handleChange}
//             fullWidth
//             margin="dense"
//             disabled={readOnly}
//             InputLabelProps={{ shrink: true }}
//           />

//           <TextField
//             label="Mentor Feedback"
//             name="mentor_feedback"
//             value={form.mentor_feedback}
//             onChange={handleChange}
//             fullWidth
//             margin="dense"
//             multiline
//             rows={2}
//             disabled={readOnly}
//           />

//           <TextField
//             label="Student Learnings"
//             name="student_learnings"
//             value={form.student_learnings}
//             onChange={handleChange}
//             fullWidth
//             margin="dense"
//             multiline
//             rows={2}
//             disabled={readOnly}
//           />

//           <TextField
//             label="Description"
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             fullWidth
//             margin="dense"
//             disabled={readOnly}
//           />

//           <TextField
//             select
//             name="status"
//             label="Status"
//             value={form.status}
//             onChange={handleChange}
//             fullWidth
//             margin="dense"
//             disabled={readOnly}
//           >
//             <MenuItem value="applied">Applied</MenuItem>
//             <MenuItem value="ongoing">Ongoing</MenuItem>
//             <MenuItem value="completed">Completed</MenuItem>
//           </TextField>
//         </DialogContent>
//       </LocalizationProvider>

//       <DialogActions>
//         <Button onClick={onClose}>Close</Button>
//         {!readOnly && (
//           <Button variant="contained" onClick={handleSave}>
//             Save
//           </Button>
//         )}
//       </DialogActions>
//     </Dialog>
//   );
// }


import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Grid,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useState, useEffect } from "react";
import { format } from "date-fns";

export default function InternshipDialog({
  open,
  onClose,
  data,
  readOnly,
  onSave,
}) {
  const [form, setForm] = useState({
    company: "",
    role: "",
    internship_type: "",
    start_date: null,
    end_date: null,
    applied_date: "", // FIXED: always string
    status: "applied",
    description: "",
    mentor_feedback: "",
    student_learnings: "",
  });

  // Populate form when editing/viewing
  useEffect(() => {
    if (data) {
      setForm({
        company: data.company || "",
        role: data.role || "",
        internship_type: data.internship_type || "",
        start_date: data.start_date
          ? new Date(data.start_date + "-01")
          : null,
        end_date: data.end_date ? new Date(data.end_date + "-01") : null,
        applied_date: data.applied_date || "", // FIXED
        status: data.status || "applied",
        description: data.description || "",
        mentor_feedback: data.mentor_feedback || "",
        student_learnings: data.student_learnings || "",
      });
    }
  }, [data]);

  // Reset form when opening Add mode
  useEffect(() => {
    if (!data && open) {
      setForm({
        company: "",
        role: "",
        internship_type: "",
        start_date: null,
        end_date: null,
        applied_date: "",
        status: "applied",
        description: "",
        mentor_feedback: "",
        student_learnings: "",
      });
    }
  }, [data, open]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleDateChange = (name, value) =>
    setForm({ ...form, [name]: value });

  const handleSave = () => {
    const payload = {
      ...form,
      start_date: form.start_date ? format(form.start_date, "yyyy-MM") : "",
      end_date: form.end_date ? format(form.end_date, "yyyy-MM") : "",
      applied_date: form.applied_date || "",
    };

    onSave(payload);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {readOnly
          ? "View Internship"
          : data
          ? "Edit Internship"
          : "Add Internship"}
      </DialogTitle>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DialogContent>
          <TextField
            label="Company"
            name="company"
            value={form.company}
            onChange={handleChange}
            fullWidth
            margin="dense"
            disabled={readOnly}
          />

          <TextField
            label="Role"
            name="role"
            value={form.role}
            onChange={handleChange}
            fullWidth
            margin="dense"
            disabled={readOnly}
          />

          <TextField
            label="Internship Type"
            name="internship_type"
            value={form.internship_type}
            onChange={handleChange}
            fullWidth
            margin="dense"
            disabled={readOnly}
          />

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <DatePicker
                label="Start Date"
                value={form.start_date}
                onChange={(value) =>
                  handleDateChange("start_date", value)
                }
                views={["year", "month"]}
                renderInput={(params) => (
                  <TextField {...params} fullWidth disabled={readOnly} />
                )}
                disabled={readOnly}
              />
            </Grid>

            <Grid item xs={6}>
              <DatePicker
                label="End Date"
                value={form.end_date}
                onChange={(value) =>
                  handleDateChange("end_date", value)
                }
                views={["year", "month"]}
                renderInput={(params) => (
                  <TextField {...params} fullWidth disabled={readOnly} />
                )}
                disabled={readOnly}
              />
            </Grid>
          </Grid>

          <TextField
            label="Applied Date"
            name="applied_date"
            type="date"
            value={form.applied_date}
            onChange={handleChange}
            fullWidth
            margin="dense"
            disabled={readOnly}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Mentor Feedback"
            name="mentor_feedback"
            value={form.mentor_feedback}
            onChange={handleChange}
            fullWidth
            margin="dense"
            multiline
            rows={2}
            disabled={readOnly}
          />

          <TextField
            label="Student Learnings"
            name="student_learnings"
            value={form.student_learnings}
            onChange={handleChange}
            fullWidth
            margin="dense"
            multiline
            rows={2}
            disabled={readOnly}
          />

          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            fullWidth
            margin="dense"
            disabled={readOnly}
          />

          <TextField
            select
            name="status"
            label="Internship Status"
            value={form.status}
            onChange={handleChange}
            fullWidth
            margin="dense"
            disabled={readOnly}
          >
            <MenuItem value="applied">Applied</MenuItem>
            <MenuItem value="ongoing">Ongoing</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </TextField>

          {/* ===== ADMIN REVIEW SECTION ===== */}
          {readOnly && data?.approval_status && (
            <>
              <TextField
                label="Approval Status"
                value={data.approval_status}
                fullWidth
                margin="dense"
                disabled
              />

              <TextField
                label="Admin Notes"
                value={data.admin_notes || "-"}
                fullWidth
                margin="dense"
                multiline
                rows={2}
                disabled
              />

              <TextField
                label="Reviewed At"
                value={data.reviewed_at || "-"}
                fullWidth
                margin="dense"
                disabled
              />
            </>
          )}
        </DialogContent>
      </LocalizationProvider>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        {!readOnly && (
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
