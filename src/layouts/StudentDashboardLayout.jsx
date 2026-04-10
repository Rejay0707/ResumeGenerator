// import React from "react";
// import { Box } from "@mui/material";
// import { Outlet } from "react-router-dom";
// import StudentSidebar from "../components/student/StudentSidebar";

// export default function StudentDashboardLayout() {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         height: "100vh",
//         overflow: "hidden",
//         backgroundColor: "#f7f7f7",
//       }}
//     >
//       {/* Sidebar */}
//       <StudentSidebar />

//       {/* Main Content */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           minWidth: 0,        // ⭐ CRITICAL FIX
//           height: "100vh",
//           overflowY: "auto",
//           overflowX: "hidden",
//           p: 3,
//         }}
//       >
//         <Outlet />
//       </Box>
//     </Box>
//   );
// }

import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import StudentSidebar from "../components/student/StudentSidebar";
import StudentTopbar from "../components/student/StudentTopbar";

export default function StudentDashboardLayout() {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#f7f7f7",
      }}
    >
      {/* Sidebar */}
      <StudentSidebar />

      {/* Right Section */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        {/* Topbar */}
        <StudentTopbar />

        {/* Page Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            overflowX: "hidden",
            p: 3,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}