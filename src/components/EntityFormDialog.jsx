// import React, { useState, useEffect, useMemo } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Alert, // Added for error display
//   Autocomplete, // Added for multi-select admission_no
//   Box,
//   Typography,
// } from "@mui/material";

// export default function EntityFormDialog({
//   open,
//   onClose,
//   onSubmit,
//   initialData,
//   entityType = "default",
//   error, // Added: For displaying API/server errors (e.g., from 422 response)
//   defaultValues = {},
// }) {
//   const [form, setForm] = useState({});
//   const [errors, setErrors] = useState({});
//   // Added: New states for student fetching and auto-population
//   const [studentOptions, setStudentOptions] = useState([]); // Always initialize as array
//   const [linkedStudents, setLinkedStudents] = useState([]); // To hold fetched student details
//   const [loadingStudents, setLoadingStudents] = useState(false);

//   // Updated fields with new entity types and fields
//   const fields = useMemo(() => {
//     if (entityType === "students") {
//       return [
//         {
//           key: "admission_no",
//           label: "Admission No",
//           type: "text",
//           required: true,
//         },
//         { key: "name", label: "Name", type: "text", required: true },
//         {
//           key: "father_name",
//           label: "Father Name",
//           type: "text",
//           required: true,
//         },
//         {
//           key: "dob",
//           label: "Date of Birth (YYYY-MM-DD)",
//           type: "text",
//           required: true,
//         },
//         { key: "college", label: "College", type: "text", required: true },
//         { key: "year", label: "Year", type: "text", required: true },
//         {
//           key: "department",
//           label: "Department",
//           type: "select",
//           required: true,
//           options: ["Mechanical", "Electrical", " Civil", "Computer Science"],
//         },
//         {
//           key: "gender",
//           label: "Gender",
//           type: "select",
//           required: true,
//           options: ["Male", "Female", "Other"],
//         },
//         { key: "phone", label: "Phone", type: "tel", required: false },
//         { key: "email", label: "Email", type: "email", required: true },
//       ];
//     } else if (entityType === "parents") {
//       return [
//         { key: "name", label: "Name", type: "text", required: true },
//         { key: "email", label: "Email", type: "email", required: true },
//         { key: "phone", label: "Phone Number", type: "tel", required: false },
//         {
//           key: "admission_no",
//           label: "Admission Number(s)", // Updated label for multiple
//           type: "multi-select", // Changed to multi-select for multiple admission numbers
//           required: true,
//           options: studentOptions, // Pass options for Autocomplete
//         },
//         {
//           key: "year",
//           label: "Year",
//           type: "text",
//           required: true,
//           disabled: true,
//         }, // Auto-populated
//         {
//           key: "department",
//           label: "Department",
//           type: "text",
//           required: true,
//           disabled: true, // Auto-populated
//         },
//         { key: "college", label: "College", type: "text", required: true },
//         {
//           key: "studentLinked",
//           label: "Student Linked",
//           type: "text",
//           required: false,
//           disabled: true, // Auto-populated
//         },
//         { key: "address", label: "Address", type: "text", required: false },
//       ];
//     } else if (entityType === "teachers") {
//       return [
//         { key: "name", label: "Name" },
//         { key: "email", label: "Email" },
//         { key: "college", label: "College", type: "text", required: true },
//         { key: "department", label: "Department" },
//         { key: "subjects", label: "Subject(s) Taught" },
//         { key: "designation", label: "Designation" },
//         { key: "phone", label: "Phone Number" },
//         { key: "joining_date", label: " Joining Date(YYYY-MM-DD)" },
//       ];
//     } else if (entityType === "departments") {
//       return [
//         { key: "department_code", label: "Department Code" },
//         { key: "department_name", label: "Department Name" },
//         { key: "college", label: "College Name" },
//       ];
//     } else if (entityType === "subjects") {
//       return [
//         { key: "subject_code", label: "Subject Code" },
//         { key: "subject_name", label: "Subject Name" },
//         { key: "department", label: "Department" },
//         { key: "college", label: "College Name" },
//         { key: "year", label: "Year" },
//       ];
//     } else if (entityType === "timetables") {
//       return [
//         { key: "teacher_name", label: "Teacher Name" },
//         { key: "subject_name", label: "Subject" },
//         { key: "department", label: "Department" },
//         { key: "college", label: "College Name" },
//         { key: "year", label: "Year" },
//         { key: "day", label: "Day" },
//         { key: "time", label: "Time" },
//       ];
//     }
//     // Fallback for other entities
//     return [
//       { key: "name", label: "Name", type: "text", required: true },
//       { key: "email", label: "Email", type: "email", required: true },
//     ];
//   }, [entityType, studentOptions]); // Added studentOptions as dependency

//   // Updated: Fetch all students on component mount for parents entity
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         // Added: Get admin college from localStorage (matching Parents.jsx)
//         const admin = JSON.parse(localStorage.getItem("user"));
//         const adminCollege = admin?.college;

//         // Added: Logging for adminCollege
//         console.log("Admin college from localStorage:", adminCollege);

//         // Added: Include auth token if required (adjust if your API needs it)
//         const token = localStorage.getItem("token"); // Assuming token is stored here; adjust as needed
//         const headers = token ? { Authorization: `Bearer ${token}` } : {};

//         const response = await fetch(
//           "https://www.scratchprod.in/resume-generator-backend/api/students",
//           {
//             headers,
//           }
//         );
//         const data = await response.json();

//         // Added: Logging for debugging
//         console.log("Fetched students data:", data);

//         // Fix: Handle different response formats (e.g., { data: [...] } or direct array)
//         let students = [];
//         if (Array.isArray(data)) {
//           students = data;
//         } else if (data && Array.isArray(data.data)) {
//           students = data.data;
//         } else {
//           console.error("Unexpected API response format:", data);
//           students = [];
//         }

//         // Updated: Filter by admin's college (case-insensitive), with fallback
//         let filteredStudents = students;
//         if (adminCollege) {
//           filteredStudents = students.filter(
//             (student) =>
//               student.college?.toLowerCase() === adminCollege.toLowerCase()
//           );
//         } else {
//           console.warn(
//             "No admin college found; showing all students as fallback."
//           );
//           // Optional: Alert user or show all (remove if you want to restrict)
//           // alert("Warning: No college filter applied. Showing all students.");
//         }

//         console.log("Filtered student options:", filteredStudents); // Added: More logging
//         setStudentOptions(filteredStudents);
//       } catch (error) {
//         console.error("Error fetching students:", error);
//         setStudentOptions([]); // Fallback to empty array
//         // Optional: Show user-friendly error (e.g., via Alert)
//         alert("Failed to load student options. Check console for details.");
//       }
//     };
//     if (entityType === "parents") {
//       fetchStudents();
//     }
//   }, [entityType]);

//   // Added: Function to fetch and populate student data based on selected admission_no(s)
//   const fetchStudentDetails = async (selectedAdmissionNos) => {
//     if (!selectedAdmissionNos || selectedAdmissionNos.length === 0) {
//       setLinkedStudents([]);
//       return;
//     }

//     setLoadingStudents(true);
//     try {
//       const response = await fetch(
//         "https://www.scratchprod.in/resume-generator-backend/api/students"
//       );
//       const data = await response.json();
//       const students = Array.isArray(data) ? data : data?.data || []; // Ensure it's an array

//       // Filter students by selected admission_no(s)
//       const matchedStudents = students.filter((student) =>
//         selectedAdmissionNos.includes(student.admission_no)
//       );

//       setLinkedStudents(matchedStudents); // Store full student objects

//       // Auto-populate form fields (concatenate if multiple)
//       const years = [...new Set(matchedStudents.map((s) => s.year))].join(", ");
//       const departments = [
//         ...new Set(matchedStudents.map((s) => s.department)),
//       ].join(", ");
//       const studentNames = matchedStudents.map((s) => s.name).join(", ");

//       setForm((prev) => ({
//         ...prev,
//         year: years,
//         department: departments,
//         studentLinked: studentNames, // Concatenated names
//       }));
//     } catch (error) {
//       console.error("Error fetching student details:", error);
//       setLinkedStudents([]);
//     } finally {
//       setLoadingStudents(false);
//     }
//   };

//   useEffect(() => {
//     if (!open) return;

//     const admin = JSON.parse(localStorage.getItem("user"));
//     const adminCollege = admin?.college || "";

//     if (initialData) {
//       // EDIT MODE
//       const prefilledForm = {};
//       fields.forEach((field) => {
//         prefilledForm[field.key] = String(initialData[field.key] ?? "");
//       });

//       setForm(prefilledForm);

//       // Parents: normalize admission_no + fetch linked data
//       if (entityType === "parents") {
//         const admissionNos = Array.isArray(initialData.admission_no)
//           ? initialData.admission_no
//           : initialData.admission_no
//           ? [String(initialData.admission_no)]
//           : [];

//         setForm((prev) => ({
//           ...prev,
//           admission_no: admissionNos,
//         }));

//         fetchStudentDetails(admissionNos);
//       }
//     } else {
//       // ADD MODE
//       const emptyForm = {};
//       fields.forEach((field) => {
//         if (field.key === "college") {
//           // ✅ Default college from admin
//           emptyForm[field.key] = adminCollege;
//         } else {
//           emptyForm[field.key] = "";
//         }
//       });

//       setForm(emptyForm);
//       setLinkedStudents([]);
//     }

//     setErrors({});
//   }, [open, initialData, fields, entityType]);

//   const handleChange = (key, value) => {
//     setForm((prev) => ({ ...prev, [key]: String(value) }));
//     if (errors[key]) {
//       setErrors((prev) => ({ ...prev, [key]: "" }));
//     }
//   };

//   // Added: Handle changes to admission_no (multi-select)
//   const handleAdmissionNoChange = (event, value) => {
//     const selectedNos = value.map((option) => option.admission_no); // Extract admission_no from selected options
//     setForm((prev) => ({ ...prev, admission_no: selectedNos })); // Store as array
//     fetchStudentDetails(selectedNos); // Trigger fetch and populate
//   };

//   const validate = () => {
//     const newErrors = {};
//     fields.forEach((field) => {
//       const fieldValue = form[field.key];
//       if (field.required && !fieldValue?.toString().trim()) {
//         newErrors[field.key] = `${field.label} is required`;
//       } else if (
//         field.type === "email" &&
//         fieldValue &&
//         !/\S+@\S+\.\S+/.test(fieldValue)
//       ) {
//         newErrors[field.key] = "Invalid email";
//       }
//     });

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = () => {
//     if (validate()) {
//       const dataToSubmit = {
//         ...form,
//         admission_no: Array.isArray(form.admission_no)
//           ? form.admission_no.join(", ")
//           : form.admission_no, // Convert array to comma-separated string
//         // Remove linkedStudents if not expected by backend
//       };
//       onSubmit(dataToSubmit); // Pass cleaned data
//       onClose();
//     } else {
//       console.log("Submit blocked by validation");
//     }
//   };

//   const isEditing = !!initialData;
//   const title = isEditing
//     ? `Edit ${entityType.charAt(0).toUpperCase() + entityType.slice(1)}`
//     : `Add ${entityType.charAt(0).toUpperCase() + entityType.slice(1)}`;

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
//       <DialogTitle>{title}</DialogTitle>
//       <DialogContent>
//         {error && ( // Added: Display API/server error (e.g., "Email already exists") as an alert
//           <Alert severity="error" sx={{ mb: 2 }}>
//             {error}
//           </Alert>
//         )}
//         {fields.map((field) => (
//           <div key={field.key} style={{ marginBottom: 16 }}>
//             {field.type === "select" ? (
//               <FormControl
//                 fullWidth
//                 error={!!errors[field.key]}
//                 required={field.required}
//               >
//                 <InputLabel>{field.label}</InputLabel>
//                 <Select
//                   value={form[field.key] || ""}
//                   label={field.label}
//                   onChange={(e) => handleChange(field.key, e.target.value)}
//                 >
//                   {field.options.map((option) => (
//                     <MenuItem key={option} value={option}>
//                       {option}
//                     </MenuItem>
//                   ))}
//                 </Select>
//                 <TextField
//                   variant="standard"
//                   value={errors[field.key] || ""}
//                   error={!!errors[field.key]}
//                   helperText={errors[field.key]}
//                   style={{ minHeight: 20, marginTop: 4 }}
//                   InputProps={{ disableUnderline: true }}
//                 />
//               </FormControl>
//             ) : field.type === "multi-select" ? ( // Added: Render Autocomplete for multi-select
//               <Autocomplete
//                 multiple
//                 options={studentOptions}
//                 getOptionLabel={(option) =>
//                   `${option.admission_no} - ${option.name}`
//                 }
//                 // Fix: Safely handle form.admission_no as array
//                 value={
//                   studentOptions.filter((option) =>
//                     (Array.isArray(form.admission_no)
//                       ? form.admission_no
//                       : []
//                     ).includes(option.admission_no)
//                   ) || []
//                 }
//                 onChange={handleAdmissionNoChange}
//                 renderInput={(params) => (
//                   <TextField
//                     {...params} // Fix: Spread params safely (MUI handles boolean attrs internally)
//                     label={field.label}
//                     required={field.required}
//                     error={!!errors[field.key]}
//                     helperText={errors[field.key]}
//                   />
//                 )}
//                 loading={loadingStudents}
//               />
//             ) : (
//               <TextField
//                 fullWidth
//                 label={field.label}
//                 type={field.type}
//                 value={form[field.key] || ""}
//                 onChange={(e) => handleChange(field.key, e.target.value)}
//                 required={field.required}
//                 error={!!errors[field.key]}
//                 helperText={
//                   errors[field.key] || (field.key === "dob" ? "YYYY-MM-DD" : "")
//                 }
//                 margin="normal"
//                 disabled={field.disabled} // Added: Disable auto-populated fields
//                 inputProps={
//                   field.key === "phone"
//                     ? { maxLength: 15 }
//                     : field.key === "dob"
//                     ? { placeholder: "YYYY-MM-DD" }
//                     : {}
//                 }
//               />
//             )}
//           </div>
//         ))}
//         {/* Added: Display linked students details */}
//         {linkedStudents.length > 0 && (
//           <Box mt={2}>
//             <Typography variant="h6">Linked Students:</Typography>
//             {linkedStudents.map((student) => (
//               <Typography key={student.admission_no}>
//                 {student.name} (Admission: {student.admission_no}, Year:{" "}
//                 {student.year}, Dept: {student.department})
//               </Typography>
//             ))}
//           </Box>
//         )}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Cancel</Button>
//         <Button variant="contained" onClick={handleSubmit}>
//           {isEditing ? "Update" : "Add"}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

import React, { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert, // Added for error display
  Autocomplete, // Added for multi-select admission_no and subjects
  Box,
  Typography,
  FormHelperText,
} from "@mui/material";

export default function EntityFormDialog({
  open,
  onClose,
  onSubmit,
  initialData,
  entityType = "default",
  error, // Added: For displaying API/server errors (e.g., from 422 response)
  // defaultValues = {},
}) {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  // Added: New states for student fetching and auto-population
  const [studentOptions, setStudentOptions] = useState([]); // Always initialize as array
  const [linkedStudents, setLinkedStudents] = useState([]); // To hold fetched student details
  const [loadingStudents, setLoadingStudents] = useState(false);
  // Added: New states for department and subject fetching for teachers
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [loadingSubjects, setLoadingSubjects] = useState(false);

  // Updated fields with new entity types and fields
  const fields = useMemo(() => {
    if (entityType === "students") {
      return [
        {
          key: "admission_no",
          label: "Admission No",
          type: "text",
          required: true,
        },
        { key: "name", label: "Name", type: "text", required: true },
        {
          key: "father_name",
          label: "Father Name",
          type: "text",
          required: true,
        },
        {
          key: "dob",
          label: "Date of Birth (YYYY-MM-DD)",
          type: "text",
          required: true,
        },
        { key: "college", label: "College", type: "text", required: true },
        {
          key: "year",
          label: "Year",
          type: "select", // Changed from "text" to "select"
          required: true,
          options: ["1st Year", "2nd Year", "3rd Year", "4th Year"], // Added options
        },

        {
          key: "gender",
          label: "Gender",
          type: "select",
          required: true,
          options: ["Male", "Female", "Other"],
        },
        { key: "phone", label: "Phone", type: "tel", required: false },
        { key: "email", label: "Email", type: "email", required: true },
      ];
    } else if (entityType === "parents") {
      return [
        { key: "name", label: "Name", type: "text", required: true },
        { key: "email", label: "Email", type: "email", required: true },
        { key: "phone", label: "Phone Number", type: "tel", required: false },
        {
          key: "admission_no",
          label: "Admission Number(s)", // Updated label for multiple
          type: "multi-select", // Changed to multi-select for multiple admission numbers
          required: true,
          options: studentOptions, // Pass options for Autocomplete
        },
        {
          key: "year",
          label: "Year",
          type: "text",
          required: true,
          disabled: true,
        }, // Auto-populated
        {
          key: "department",
          label: "Department",
          type: "text",
          required: true,
          disabled: true, // Auto-populated
        },
        { key: "college", label: "College", type: "text", required: true },
        {
          key: "studentLinked",
          label: "Student Linked",
          type: "text",
          required: false,
          disabled: true, // Auto-populated
        },
        { key: "address", label: "Address", type: "text", required: false },
      ];
    } else if (entityType === "teachers") {
      return [
        { key: "name", label: "Name", type: "text", required: true },
        { key: "email", label: "Email", type: "email", required: true },
        { key: "college", label: "College", type: "text", required: true },
        {
          key: "department",
          label: "Department",
          type: "select",
          required: true,
          options: departmentOptions.map((dept) => dept.department_name),
        },
        {
          key: "subjects",
          label: "Subject(s) Taught",
          type: "multi-select",
          required: true,
          options: subjectOptions,
        },
        {
          key: "designation",
          label: "Designation",
          type: "text",
          required: true,
        },
        { key: "phone", label: "Phone Number", type: "tel", required: false },
        {
          key: "joining_date",
          label: "Joining Date(YYYY-MM-DD)",
          type: "text",
          required: true,
        },
      ];
    } else if (entityType === "departments") {
      return [
        {
          key: "department_code",
          label: "Department Code",
          type: "text",
          required: true,
        },
        {
          key: "department_name",
          label: "Department Name",
          type: "text",
          required: true,
        },
        { key: "college", label: "College Name", type: "text", required: true },
      ];
    } else if (entityType === "subjects") {
      return [
        {
          key: "subject_code",
          label: "Subject Code",
          type: "text",
          required: true,
        },
        {
          key: "subject_name",
          label: "Subject Name",
          type: "text",
          required: true,
        },
        {
          key: "department",
          label: "Department",
          type: "select",
          required: true,
          options: departmentOptions.map((dept) => dept.department_name),
        },
        { key: "college", label: "College Name", type: "text", required: true },
        {
          key: "year",
          label: "Year",
          type: "select", // Changed from "text" to "select"
          required: true,
          options: ["1st Year", "2nd Year", "3rd Year", "4th Year"], // Added options
        },
      ];
    } else if (entityType === "timetables") {
      return [
        {
          key: "teacher_name",
          label: "Teacher Name",
          type: "text",
          required: true,
        },
        {
          key: "subjects",
          label: "Subject(s) Taught",
          type: "multi-select",
          required: true,
          options: subjectOptions,
        },
        {
          key: "department",
          label: "Department",
          type: "select",
          required: true,
          options: departmentOptions.map((dept) => dept.department_name),
        },
        { key: "college", label: "College Name", type: "text", required: true },
        {
          key: "year",
          label: "Year",
          type: "select", // Changed from "text" to "select"
          required: true,
          options: ["1st Year", "2nd Year", "3rd Year", "4th Year"], // Added options
        },
        {
          key: "day",
          label: "Day",
          type: "select",
          options: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        },
        { key: "time", label: "Time", type: "text", required: true },
      ];
    }
    // Fallback for other entities
    return [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "email", label: "Email", type: "email", required: true },
    ];
  }, [entityType, studentOptions, departmentOptions, subjectOptions]); // Added departmentOptions and subjectOptions as dependencies

  // Updated: Fetch all students on component mount for parents entity
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // Added: Get admin college from localStorage (matching Parents.jsx)
        const admin = JSON.parse(localStorage.getItem("user"));
        const adminCollege = admin?.college;

        // Added: Logging for adminCollege
        console.log("Admin college from localStorage:", adminCollege);

        // Added: Include auth token if required (adjust if your API needs it)
        const token = localStorage.getItem("token"); // Assuming token is stored here; adjust as needed
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await fetch(
          "https://www.scratchprod.in/resume-generator-backend/api/students",
          {
            headers,
          }
        );
        const data = await response.json();

        // Added: Logging for debugging
        console.log("Fetched students data:", data);

        // Fix: Handle different response formats (e.g., { data: [...] } or direct array)
        let students = [];
        if (Array.isArray(data)) {
          students = data;
        } else if (data && Array.isArray(data.data)) {
          students = data.data;
        } else {
          console.error("Unexpected API response format:", data);
          students = [];
        }

        // Updated: Filter by admin's college (case-insensitive), with fallback
        let filteredStudents = students;
        if (adminCollege) {
          filteredStudents = students.filter(
            (student) =>
              student.college?.toLowerCase() === adminCollege.toLowerCase()
          );
        } else {
          console.warn(
            "No admin college found; showing all students as fallback."
          );
          // Optional: Alert user or show all (remove if you want to restrict)
          // alert("Warning: No college filter applied. Showing all students.");
        }

        console.log("Filtered student options:", filteredStudents); // Added: More logging
        setStudentOptions(filteredStudents);
      } catch (error) {
        console.error("Error fetching students:", error);
        setStudentOptions([]); // Fallback to empty array
        // Optional: Show user-friendly error (e.g., via Alert)
        alert("Failed to load student options. Check console for details.");
      }
    };
    if (entityType === "parents") {
      fetchStudents();
    }
  }, [entityType]);

  // Added: Fetch departments and subjects for teachers entity
  useEffect(() => {
    const fetchDepartments = async () => {
      setLoadingDepartments(true);
      try {
        const admin = JSON.parse(localStorage.getItem("user"));
        const adminCollege = admin?.college;

        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await fetch(
          "https://www.scratchprod.in/resume-generator-backend/api/departments",
          {
            headers,
          }
        );
        const data = await response.json();

        let departments = [];
        if (Array.isArray(data)) {
          departments = data;
        } else if (data && Array.isArray(data.data)) {
          departments = data.data;
        } else {
          console.error(
            "Unexpected API response format for departments:",
            data
          );
          departments = [];
        }

        let filteredDepartments = departments;
        if (adminCollege) {
          filteredDepartments = departments.filter(
            (dept) => dept.college?.toLowerCase() === adminCollege.toLowerCase()
          );
        }

        setDepartmentOptions(filteredDepartments);
      } catch (error) {
        console.error("Error fetching departments:", error);
        setDepartmentOptions([]);
        alert("Failed to load department options. Check console for details.");
      } finally {
        setLoadingDepartments(false);
      }
    };

    const fetchSubjects = async () => {
      setLoadingSubjects(true);
      try {
        const admin = JSON.parse(localStorage.getItem("user"));
        const adminCollege = admin?.college;

        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await fetch(
          "https://www.scratchprod.in/resume-generator-backend/api/subjects",
          {
            headers,
          }
        );
        const data = await response.json();

        let subjects = [];
        if (Array.isArray(data)) {
          subjects = data;
        } else if (data && Array.isArray(data.data)) {
          subjects = data.data;
        } else {
          console.error("Unexpected API response format for subjects:", data);
          subjects = [];
        }

        let filteredSubjects = subjects;
        if (adminCollege) {
          filteredSubjects = subjects.filter(
            (sub) => sub.college?.toLowerCase() === adminCollege.toLowerCase()
          );
        }

        setSubjectOptions(filteredSubjects);
      } catch (error) {
        console.error("Error fetching subjects:", error);
        setSubjectOptions([]);
        alert("Failed to load subject options. Check console for details.");
      } finally {
        setLoadingSubjects(false);
      }
    };

    if (
      entityType === "teachers" ||
      entityType === "subjects" ||
      entityType === "timetables"
    ) {
      fetchDepartments();
      fetchSubjects();
    }
  }, [entityType]);

  // Added: Function to fetch and populate student data based on selected admission_no(s)
  const fetchStudentDetails = async (selectedAdmissionNos) => {
    if (!selectedAdmissionNos || selectedAdmissionNos.length === 0) {
      setLinkedStudents([]);
      return;
    }

    setLoadingStudents(true);
    try {
      const response = await fetch(
        "https://www.scratchprod.in/resume-generator-backend/api/students"
      );
      const data = await response.json();
      const students = Array.isArray(data) ? data : data?.data || []; // Ensure it's an array

      // Filter students by selected admission_no(s)
      const matchedStudents = students.filter((student) =>
        selectedAdmissionNos.includes(student.admission_no)
      );

      setLinkedStudents(matchedStudents); // Store full student objects

      // Auto-populate form fields (concatenate if multiple)
      const years = [...new Set(matchedStudents.map((s) => s.year))].join(", ");
      const departments = [
        ...new Set(matchedStudents.map((s) => s.department)),
      ].join(", ");
      const studentNames = matchedStudents.map((s) => s.name).join(", ");

      setForm((prev) => ({
        ...prev,
        year: years,
        department: departments,
        studentLinked: studentNames, // Concatenated names
      }));
    } catch (error) {
      console.error("Error fetching student details:", error);
      setLinkedStudents([]);
    } finally {
      setLoadingStudents(false);
    }
  };

  useEffect(() => {
    if (!open) return;

    const admin = JSON.parse(localStorage.getItem("user"));
    const adminCollege = admin?.college || "";

    if (initialData) {
      // EDIT MODE
      const prefilledForm = {};
      fields.forEach((field) => {
        prefilledForm[field.key] = String(initialData[field.key] ?? "");
      });

      setForm(prefilledForm);

      // Parents: normalize admission_no + fetch linked data
      if (entityType === "parents") {
        const admissionNos = Array.isArray(initialData.admission_no)
          ? initialData.admission_no
          : initialData.admission_no
          ? [String(initialData.admission_no)]
          : [];

        setForm((prev) => ({
          ...prev,
          admission_no: admissionNos,
        }));

        fetchStudentDetails(admissionNos);
      }

      // Teachers: normalize subjects to array
      if (entityType === "teachers") {
        const subjects = Array.isArray(initialData.subjects)
          ? initialData.subjects
          : initialData.subjects
          ? initialData.subjects.split(", ")
          : [];

        setForm((prev) => ({
          ...prev,
          subjects,
        }));
      }
    } else {
      // ADD MODE
      const emptyForm = {};
      fields.forEach((field) => {
        if (field.key === "college") {
          // ✅ Default college from admin
          emptyForm[field.key] = adminCollege;
        } else {
          emptyForm[field.key] = "";
        }
      });

      setForm(emptyForm);
      setLinkedStudents([]);
    }

    setErrors({});
  }, [open, initialData, fields, entityType]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: String(value) }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  // Added: Handle changes to admission_no (multi-select)
  const handleAdmissionNoChange = (event, value) => {
    const selectedNos = value.map((option) => option.admission_no); // Extract admission_no from selected options
    setForm((prev) => ({ ...prev, admission_no: selectedNos })); // Store as array
    fetchStudentDetails(selectedNos); // Trigger fetch and populate
  };

  // Added: Handle changes to subjects (multi-select)
  const handleSubjectsChange = (event, value) => {
    const selectedSubjects = value.map((option) => option.subject_name); // Extract subject_name from selected options
    setForm((prev) => ({ ...prev, subjects: selectedSubjects })); // Store as array
  };

  const validate = () => {
    const newErrors = {};
    fields.forEach((field) => {
      const fieldValue = form[field.key];
      if (field.required && !fieldValue?.toString().trim()) {
        newErrors[field.key] = `${field.label} is required`;
      } else if (
        field.type === "email" &&
        fieldValue &&
        !/\S+@\S+\.\S+/.test(fieldValue)
      ) {
        newErrors[field.key] = "Invalid email";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      const dataToSubmit = {
        ...form,
        admission_no: Array.isArray(form.admission_no)
          ? form.admission_no.join(", ")
          : form.admission_no, // Convert array to comma-separated string
        subjects: Array.isArray(form.subjects)
          ? form.subjects.join(", ")
          : form.subjects, // Convert array to comma-separated string
        // Remove linkedStudents if not expected by backend
      };
      onSubmit(dataToSubmit); // Pass cleaned data
      onClose();
    } else {
      console.log("Submit blocked by validation");
    }
  };

  const isEditing = !!initialData;
  const title = isEditing
    ? `Edit ${entityType.charAt(0).toUpperCase() + entityType.slice(1)}`
    : `Add ${entityType.charAt(0).toUpperCase() + entityType.slice(1)}`;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {error && ( // Added: Display API/server error (e.g., "Email already exists") as an alert
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {fields.map((field) => (
          <div key={field.key} style={{ marginBottom: 16 }}>
            {field.type === "select" ? (
              <FormControl
                fullWidth
                error={!!errors[field.key]}
                required={field.required}
              >
                <InputLabel>{field.label}</InputLabel>
                <Select
                  value={form[field.key] || ""}
                  label={field.label}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  disabled={loadingDepartments && field.key === "department"}
                >
                  {field.options.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error={!!errors[field.key]}>
                  {errors[field.key]}
                </FormHelperText>
              </FormControl>
            ) : field.type === "multi-select" ? (
              <Autocomplete
                multiple
                options={
                  field.key === "admission_no" ? studentOptions : subjectOptions
                }
                getOptionLabel={(option) =>
                  field.key === "admission_no"
                    ? `${option.admission_no} - ${option.name}`
                    : `${option.subject_name}`
                }
                value={
                  field.key === "admission_no"
                    ? studentOptions.filter((option) =>
                        (Array.isArray(form.admission_no)
                          ? form.admission_no
                          : []
                        ).includes(option.admission_no)
                      ) || []
                    : subjectOptions.filter((option) =>
                        (Array.isArray(form.subjects)
                          ? form.subjects
                          : []
                        ).includes(option.subject_name)
                      ) || []
                }
                onChange={
                  field.key === "admission_no"
                    ? handleAdmissionNoChange
                    : handleSubjectsChange
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={field.label}
                    required={field.required}
                    error={!!errors[field.key]}
                    helperText={errors[field.key]}
                  />
                )}
                loading={
                  field.key === "admission_no"
                    ? loadingStudents
                    : loadingSubjects
                }
              />
            ) : (
              <TextField
                fullWidth
                label={field.label}
                type={field.type}
                value={form[field.key] || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                required={field.required}
                error={!!errors[field.key]}
                helperText={
                  errors[field.key] || (field.key === "dob" ? "YYYY-MM-DD" : "")
                }
                disabled={field.disabled}
                inputProps={
                  field.key === "phone"
                    ? { maxLength: 15 }
                    : field.key === "dob"
                    ? { placeholder: "YYYY-MM-DD" }
                    : {}
                }
              />
            )}
          </div>
        ))}
        {/* Added: Display linked students details */}
        {linkedStudents.length > 0 && (
          <Box mt={2}>
            <Typography variant="h6">Linked Students:</Typography>
            {linkedStudents.map((student) => (
              <Typography key={student.admission_no}>
                {student.name} (Admission: {student.admission_no}, Year:{" "}
                {student.year}, Dept: {student.department})
              </Typography>
            ))}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
