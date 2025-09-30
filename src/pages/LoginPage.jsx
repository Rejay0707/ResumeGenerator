// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
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
// import logo1 from "../assets/logo1.png"

// export default function LoginPage() {
//   const { user, loading, error, login } = useAuth();
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const [form, setForm] = useState({ email: "", password: "", remember: false });

//   useEffect(() => {
//     if (user) {
//       if (user.role === "superadmin") {
//         navigate("/superadmin/dashboard");
//       } else if (user.role === "admin") {
//         navigate("/admin/dashboard");
//       }
//     }
//   }, [user, navigate]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm({
//       ...form,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await login(form.email, form.password);
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         width:"100vw",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         px: 2,
//         backgroundColor: "#eaf7ff",
//         backgroundImage:
//           "url('https://infixedu.spondan.com/public/backEnd/img/edulia-login-bg.jpg')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         boxSizing: "border-box",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", md: "row" }, // children image on side
//           alignItems: "center",
//           justifyContent: "center",
//           gap: 4,
//           width: "100%",
          
//         }}
//       >
//         {/* Login Card */}
//         <Paper
//           elevation={6}
//           sx={{
//             width: { xs: "90%", sm: "450px", md: "500px" },
//             p: { xs: 3, sm: 5 },
//             borderRadius: 2,
//             textAlign: "center",
//             backgroundColor: "white",
//           }}
//         >
//           {/* Logo */}
//           <Box sx={{ mb: 2 }}>
//             <img
//               src={logo1}
//               alt="logo"
//               style={{ width: "150px", height: "auto" }}
//             />
//           </Box>

//           {/* Heading */}
//           <Typography
//             variant={isMobile ? "h5" : "h4"}
//             sx={{ fontWeight: "bold", mb: 3, color: "#0d47a1" }}
//           >
//             Login Details
//           </Typography>

//           {/* Form */}
//           <Box component="form" onSubmit={handleSubmit} noValidate>
//             <TextField
//               label="Enter Email Address"
//               name="email"
//               type="email"
//               value={form.email}
//               onChange={handleChange}
//               fullWidth
//               margin="normal"
//               required
//               variant="standard"
//             />
//             <TextField
//               label="Enter Password"
//               name="password"
//               type="password"
//               value={form.password}
//               onChange={handleChange}
//               fullWidth
//               margin="normal"
//               required
//               variant="standard"
//             />

//             <Box
//               sx={{
//                 mt: 1,
//                 mb: 2,
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     name="remember"
//                     checked={form.remember}
//                     onChange={handleChange}
//                     color="primary"
//                   />
//                 }
//                 label="Remember Me"
//               />
//               <Link href="#" underline="hover" sx={{ fontSize: 14 }}>
//                 Forgot Password?
//               </Link>
//             </Box>

//             {error && (
//               <Alert severity="error" sx={{ mb: 2 }}>
//                 {error}
//               </Alert>
//             )}

//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
//               disabled={loading}
//               sx={{
//                 py: 1.2,
//                 fontWeight: "bold",
//                 backgroundColor: "#0d47a1",
//                 "&:hover": { backgroundColor: "#08306b" },
//               }}
//             >
//               {loading ? "Logging in..." : "SIGN IN"}
//             </Button>
//           </Box>

//           {/* Role Buttons */}
//           <Box
//             sx={{
//               mt: 3,
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
//               gap: 1.5,
//             }}
//           >
//             {[
//               "SUPER ADMIN",
//               "ADMIN",
//               "STUDENT",
//               "PARENT",
//               "TEACHER",
//               "RECRUITER",
//             ].map((role) => (
//               <Button key={role} variant="outlined" size="small">
//                 {role}
//               </Button>
//             ))}
//           </Box>
//         </Paper>

//         {/* Side Image (only on desktop/tablet) */}
//       </Box>
//     </Box>
//   );
// }


//////////////////////////////////////////////////////////////////



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { loginAsync,clearError } from "../features/authSlice";
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

//   const { user, loading, error } = useSelector((state) => state.auth);

//   const [form, setForm] = useState({ email: "", password: "", remember: false });

//   useEffect(() => {
//     if (user) {
//       console.log("User logged in:", user);
//       if (user.role === "SuperAdmin") {
//         window.location.href = "http://192.168.1.38:8000/superadmin/dashboard";
//       } else if (user.role === "admin") {
//         navigate("/admin/dashboard");
//       }
//     }
//   }, [user, navigate]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm({
//       ...form,
//       [name]: type === "checkbox" ? checked : value,
//     });
//     if (error) dispatch(clearError());
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("handleSubmit called"); // 🔹 Test if submit works
//     dispatch(loginAsync({ email: form.email, password: form.password }));
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
//           <img src={logo1} alt="logo" style={{ width: "150px", height: "auto" }} />
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
//           />

//           <Box sx={{ mt: 1, mb: 2, display: "flex", justifyContent: "space-between" }}>
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

//           {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

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
//       </Paper>
//     </Box>
//   );
// }



/////////////////////////////////////////////////////////////////

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync, clearError } from "../features/authSlice";
import useAuth from "../containers/AuthContainer";
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
  const { user: adminUser , login: adminLogin, loading: adminLoading, error: adminError } = useAuth();

  const [form, setForm] = useState({ email: "", password: "", remember: false });

  const loading = adminLoading || reduxAuth.loading;
  const error = adminError || reduxAuth.error;

  const SUPERADMIN_DASHBOARD_URL = 'http://192.168.1.38:8000/superadmin/dashboard';

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) dispatch(clearError());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.email === "admin@example.com" || form.email === "admin@gmail.com") {
      // Admin login (local React)
      await adminLogin(form.email, form.password);
      navigate("/admin/dashboard");
    } else {
      // SuperAdmin login (backend API)
      const resultAction = await dispatch(loginAsync({ email: form.email, password: form.password }));
      if (loginAsync.fulfilled.match(resultAction)) {
        const user = resultAction.payload;
        const role = user.role?.toLowerCase();
        if (role === "superadmin") {
          window.location.href = SUPERADMIN_DASHBOARD_URL;
        } else if (role === "admin") {
          navigate("/admin/dashboard");
        }
      }
    }
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
          <img src={logo1} alt="logo" style={{ width: "150px", height: "auto" }} />
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
            required
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
            required
            variant="standard"
            autoComplete="current-password"
          />

          <Box sx={{ mt: 1, mb: 2, display: "flex", justifyContent: "space-between" }}>
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

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

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
      </Paper>
    </Box>
  );
}





