// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { loginAsync, clearError } from "../features/authSlice";
// import useAuth from "../containers/AuthContainer";
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Alert,
//   Checkbox,
//   FormControlLabel,
//   Link,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import logo1 from "../assets/logo1.png";

// export default function LoginPage() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const reduxAuth = useSelector((state) => state.auth);
//   const {
//     user: adminUser,
//     login: adminLogin,
//     loading: adminLoading,
//     error: adminError,
//   } = useAuth();

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//     remember: false,
//   });

//   const loading = adminLoading || reduxAuth.loading;
//   const error = adminError || reduxAuth.error;

//   const SUPERADMIN_DASHBOARD_URL = "http://192.168.1.38:8000";

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//     if (error) dispatch(clearError());
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       form.email === "admin@example.com" ||
//       form.email === "admin@gmail.com"
//     ) {
//       // Admin login
//       await adminLogin(form.email, form.password);
//       navigate("/admin/dashboard");
//     } else if (form.email === "student@example.com") {
//       // Student login (mock)
//       await adminLogin(form.email, form.password);
//       navigate("/"); // redirect to homepage
//     } else {
//       // SuperAdmin login (via API)
//       const resultAction = await dispatch(
//         loginAsync({ email: form.email, password: form.password })
//       );
//       if (loginAsync.fulfilled.match(resultAction)) {
//         const user = resultAction.payload;
//         const role = user.role?.toLowerCase();
//         if (role === "superadmin") {
//           window.location.href = SUPERADMIN_DASHBOARD_URL;
//         } else if (role === "admin") {
//           navigate("/admin/dashboard");
//         } else if (role === "student") {
//           navigate("/"); // fallback if backend returns student
//         }
//       }
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         width: "100vw",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         px: 2,
//         backgroundColor: "#eaf7ff",
//         boxSizing: "border-box",
//         overflow: "hidden", // prevent scroll
//       }}
//     >
//       <Paper
//         elevation={6}
//         sx={{
//           width: { xs: "90%", sm: "450px", md: "500px" },
//           p: { xs: 3, sm: 5 },
//           borderRadius: 2,
//           textAlign: "center",
//           backgroundColor: "white",
//         }}
//       >
//         <Box sx={{ mb: 2 }}>
//           <img
//             src={logo1}
//             alt="logo"
//             style={{ width: "150px", height: "auto" }}
//           />
//         </Box>

//         <Typography
//           variant={isMobile ? "h5" : "h4"}
//           sx={{ fontWeight: "bold", mb: 3, color: "#0d47a1" }}
//         >
//           Login Details
//         </Typography>

//         <Box component="form" onSubmit={handleSubmit} noValidate>
//           <TextField
//             label="Enter Email Address"
//             name="email"
//             type="email"
//             value={form.email}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             required
//             variant="standard"
//             autoComplete="email"
//           />
//           <TextField
//             label="Enter Password"
//             name="password"
//             type="password"
//             value={form.password}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             required
//             variant="standard"
//             autoComplete="current-password"
//           />

//           <Box
//             sx={{
//               mt: 1,
//               mb: 2,
//               display: "flex",
//               justifyContent: "space-between",
//             }}
//           >
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   name="remember"
//                   checked={form.remember}
//                   onChange={handleChange}
//                   color="primary"
//                 />
//               }
//               label="Remember Me"
//             />
//             <Link href="#" underline="hover" sx={{ fontSize: 14 }}>
//               Forgot Password?
//             </Link>
//           </Box>

//           {error && (
//             <Alert severity="error" sx={{ mb: 2 }}>
//               {error}
//             </Alert>
//           )}

//           <Button
//             type="submit"
//             variant="contained"
//             fullWidth
//             disabled={loading}
//             sx={{
//               py: 1.2,
//               fontWeight: "bold",
//               backgroundColor: "#0d47a1",
//               "&:hover": { backgroundColor: "#08306b" },
//             }}
//           >
//             {loading ? "Logging in..." : "SIGN IN"}
//           </Button>
//         </Box>

//         {/* Role Buttons below the form */}
//         <Box
//           sx={{
//             mt: 3,
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
//             gap: 1.5,
//           }}
//         >
//           {[
//             "SUPER ADMIN",
//             "ADMIN",
//             "STUDENT",
//             "PARENT",
//             "TEACHER",
//             "RECRUITER",
//           ].map((role) => (
//             <Button key={role} variant="outlined" size="small">
//               {role}
//             </Button>
//           ))}
//         </Box>
//         {/* 👇 Add this register link below login */}
//         <Typography sx={{ mt: 3, fontSize: 14 }}>
//           Don’t have an account?{" "}
//           <Link
//             href="/register"
//             underline="hover"
//             sx={{ fontWeight: "bold", color: "#0d47a1" }}
//           >
//             Register
//           </Link>
//         </Typography>
//       </Paper>
//     </Box>
//   );
// }


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync, adminLoginAsync, clearError, setUser  } from "../features/authSlice";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Checkbox,
  FormControlLabel,
  Link,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import logo1 from "../assets/logo1.png";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const reduxAuth = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [selectedRole, setSelectedRole] = useState("");  // Track selected role from buttons

  const loading = reduxAuth.loading;
  const error = reduxAuth.error;

  const SUPERADMIN_DASHBOARD_URL = "http://192.168.1.38:8000";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) dispatch(clearError());
  };

  // Handle role button clicks with logging
  const handleRoleClick = (roleLabel, roleValue) => {
    console.log(`🔹 Role clicked: ${roleLabel} (value: ${roleValue})`);  // Debug: Confirm click
    setSelectedRole(roleValue);
    // Optional: Pre-fill email for testing (replace with real emails from your backend)
    let prefillEmail = "";
    if (roleValue === "superadmin") {
      prefillEmail = "superadmin@company.com";  // Customize
    } else if (roleValue === "admin") {
      prefillEmail = "admin@company.com";  // Customize
    } else if (roleValue === "student") {
      prefillEmail = "student@example.com";
    } else if (roleValue === "parent") {
      prefillEmail = "parent@example.com";
    } else if (roleValue === "teacher") {
      prefillEmail = "teacher@example.com";
    } else if (roleValue === "recruiter") {
      prefillEmail = "recruiter@example.com";
    }
    setForm((prev) => ({ ...prev, email: prefillEmail }));
    // Clear error and password for security
    setForm((prev) => ({ ...prev, password: "" }));
    if (error) dispatch(clearError());
    console.log(`🔹 Role set: ${roleValue}, Email pre-filled: ${prefillEmail}`);  // Debug
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🚀 Form submitted! Email:", form.email, "Password:", form.password ? "[hidden]" : "", "Selected Role:", selectedRole);  // Debug: Confirm submit

    // Check if fields are filled (browser validation might block otherwise)
    if (!form.email || !form.password) {
      console.error("❌ Submit blocked: Email or password empty");
      return;  // Exit - show error in UI if needed
    }

    // Primary: Use selectedRole to decide endpoint/thunk
    if (selectedRole) {
      console.log("🔹 Step 1: Role selected, handling based on role");  // Debug
      if (selectedRole === "superadmin") {
        console.log("🔹 Step 2: Superadmin - Calling /api/login");
        const resultAction = await dispatch(
          loginAsync({ email: form.email, password: form.password })
        );
        if (loginAsync.fulfilled.match(resultAction)) {
          console.log("✅ Superadmin success, checking role...");
          const user = resultAction.payload;
          const role = user.role?.toLowerCase();
          if (role === "superadmin") {
            window.location.href = SUPERADMIN_DASHBOARD_URL;
          } else if (role === "admin") {
            navigate("/admin/dashboard");
          } else if (role === "student") {
            navigate("/");
          } else {
            navigate("/"); 
          }
        } else {
          console.log("❌ Superadmin failed");
        }
      } else if (selectedRole === "admin") {
        console.log("🔹 Step 2: Admin - Calling /api/superadmin/login");
        const resultAction = await dispatch(
          adminLoginAsync({ email: form.email, password: form.password })
        );
        if (adminLoginAsync.fulfilled.match(resultAction)) {
          console.log("✅ Admin success, navigating to dashboard");
          navigate("/admin/dashboard");
        } else {
          console.log("❌ Admin failed");
        }
      } else if (selectedRole === "student") {
        // Student: Mock - Store fake user, no API
        console.log("🔹 Step 2: Student - Mock login with state storage (NO API CALL)");
        const mockUser  = {
          id: Date.now(),  // Fake ID
          email: form.email,
          role: "student",
          name: "Student User",  // Customize as needed
          // Add more fields if your app expects them (e.g., avatar, permissions)
        };
        setForm({ email: "", password: "", remember: false });  // Clear form
        dispatch(setUser (mockUser ));  // Store mock user in Redux/localStorage
        console.log("🔹 Mock user stored:", mockUser );
        console.log("🔹 Attempting redirect to /");
        navigate("/");  // Now it should stay on home (user exists)
        console.log("✅ Student redirect completed with auth state");
        return;
      } else {
        // Other roles (PARENT, TEACHER, RECRUITER): Fallback to superadmin endpoint
        // TODO: Add specific thunks/endpoints, e.g., parentLoginAsync for /api/parent/login
        console.log(`🔹 Step 2: Other role (${selectedRole}) - Fallback to superadmin /api/login`);
        const resultAction = await dispatch(
          loginAsync({ email: form.email, password: form.password })
        );
        if (loginAsync.fulfilled.match(resultAction)) {
          console.log("✅ Fallback success, checking role...");
          const user = resultAction.payload;
          const role = user.role?.toLowerCase();
          // Handle based on backend role (extend as needed)
          if (role === "superadmin") {
            window.location.href = SUPERADMIN_DASHBOARD_URL;
          } else {
            navigate("/");  // Fallback
          }
        } else {
          console.log("❌ Fallback failed");
        }
      }
    } else {
      // Fallback: Email-based logic (if no role selected)
      console.log("🔹 Step 1: No role selected, using email fallback");  // Debug
      if (
        form.email.includes("admin@") ||  // e.g., admin@company.com or admin@gmail.com
        form.email === "admin@gmail.com"
      ) {
        console.log("🔹 Step 2: Admin email detected - Calling /api/superadmin/login");
        const resultAction = await dispatch(
          adminLoginAsync({ email: form.email, password: form.password })
        );
        if (adminLoginAsync.fulfilled.match(resultAction)) {
          console.log("✅ Admin fallback success");
          navigate("/admin/dashboard");
        } else {
          console.log("❌ Admin fallback failed");
        }
      } else if (form.email.includes("student")) {  // Flexible match
        // Student fallback: Mock - Store fake user
        console.log("🔹 Step 2: Student email detected - Mock login with state storage (NO API CALL)");
        const mockUser  = {
          id: Date.now(),
          email: form.email,
          role: "student",
          name: "Student User",
        };
        setForm({ email: "", password: "", remember: false });
        dispatch(setUser (mockUser ));  // Store mock user
        console.log("🔹 Mock user stored (fallback):", mockUser );
        console.log("🔹 Attempting fallback redirect to /");
        navigate("/");  // Should stay now
        console.log("✅ Student fallback redirect completed with auth state");
        return;
      } else {
        console.log("🔹 Step 2: No match - Default to superadmin /api/login");
        const resultAction = await dispatch(
          loginAsync({ email: form.email, password: form.password })
        );
        if (loginAsync.fulfilled.match(resultAction)) {
          console.log("✅ Default success, checking role...");
          const user = resultAction.payload;
          const role = user.role?.toLowerCase();
          if (role === "superadmin") {
            window.location.href = SUPERADMIN_DASHBOARD_URL;
          } else if (role === "admin") {
            navigate("/admin/dashboard");
          } else if (role === "student") {
            navigate("/");
          } else {
            navigate("/");  // Fallback
          }
        } else {
          console.log("❌ Default failed");
        }
      }
    }
    console.log("🏁 handleSubmit ended");  // Debug: Always log end
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        backgroundColor: "#eaf7ff",
        boxSizing: "border-box",
        overflow: "hidden", // prevent scroll
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: { xs: "90%", sm: "450px", md: "500px" },
          p: { xs: 3, sm: 5 },
          borderRadius: 2,
          textAlign: "center",
          backgroundColor: "white",
        }}
      >
        <Box sx={{ mb: 2 }}>
          <img
            src={logo1}
            alt="logo"
            style={{ width: "150px", height: "auto" }}
          />
        </Box>

        <Typography
          variant={isMobile ? "h5" : "h4"}
          sx={{ fontWeight: "bold", mb: 3, color: "#0d47a1" }}
        >
          Login Details
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Enter Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            // required  // Temporarily removed for testing
            variant="standard"
            autoComplete="email"
          />
                    <TextField
            label="Enter Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            // required  // Temporarily removed for testing
            variant="standard"
            autoComplete="current-password"
          />

          <Box
            sx={{
              mt: 1,
              mb: 2,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label="Remember Me"
            />
            <Link href="#" underline="hover" sx={{ fontSize: 14 }}>
              Forgot Password?
            </Link>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {(!form.email || !form.password) && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              Please enter email and password.
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              py: 1.2,
              fontWeight: "bold",
              backgroundColor: "#0d47a1",
              "&:hover": { backgroundColor: "#08306b" },
            }}
          >
            {loading ? "Logging in..." : "SIGN IN"}
          </Button>
        </Box>

        {/* Role Buttons with Click Handlers and Highlighting */}
        <Box
          sx={{
            mt: 3,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: 1.5,
          }}
        >
          {[
            { label: "SUPER ADMIN", value: "superadmin" },
            { label: "ADMIN", value: "admin" },
            { label: "STUDENT", value: "student" },
            { label: "PARENT", value: "parent" },
            { label: "TEACHER", value: "teacher" },
            { label: "RECRUITER", value: "recruiter" },
          ].map(({ label, value }) => (
            <Button
              key={label}
              variant={selectedRole === value ? "contained" : "outlined"}
              size="small"
              onClick={() => handleRoleClick(label, value)}  // Click to select role
              sx={{
                ...(selectedRole === value && { 
                  backgroundColor: "#0d47a1",
                  color: "white",
                }),
              }}
            >
              {label}
            </Button>
          ))}
        </Box>

        {/* Register link below login */}
        <Typography sx={{ mt: 3, fontSize: 14 }}>
          Don’t have an account?{" "}
          <Link
            href="/register"
            underline="hover"
            sx={{ fontWeight: "bold", color: "#0d47a1" }}
          >
            Register
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}




