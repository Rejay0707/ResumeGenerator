// import React from "react";
// import { Box, Paper, Typography } from "@mui/material";
// import ResumeFormContainer from "../containers/ResumeFormContainer";

// function ResumeBuilderPage() {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         minHeight: "100vh",
//         px: 2,
//         position: "absolute",
//         left: 0,
//         right: 0,
//         top: 0,
//       }}
//     >
      
//       <Paper
//         elevation={6}
//         sx={{
//           p: { xs: 3, sm: 5 },
//           borderRadius: 3,
//           width: "100%",
//           maxWidth: "700px",
//           margin: "auto",
//           backgroundColor: "#ffffff", // white card
//           position: "absolute",
//           left: 0,
//           right: 0,
//           top: 20,
//           // bottom: 0,
//         }}
//       >
//         <Box textAlign="left" mb={3}>
//           <Typography
//             variant="h4"
//             fontWeight="bold"
//             gutterBottom
//             sx={{ color: "#4A148C" }}
//           >
//             AI Resume Builder
//           </Typography>
//           <Typography variant="body1" color="text.secondary">
//             Enter your details and generate a smart resume with AI
//           </Typography>
//         </Box>

//         <ResumeFormContainer />
//       </Paper>
//     </Box>
//   );
// }

// export default ResumeBuilderPage;


import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import ResumeFormContainer from "../containers/ResumeFormContainer";

function ResumeBuilderPage() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // minHeight: "100%",
        px: 2,
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,

        // Responsive adjustments for all breakpoints
        "@media (max-width:600px)": {
          position: "relative",
          minHeight: "auto",
          py: 4,
        },
        "@media (min-width:601px) and (max-width:900px)": {
          position: "absolute",
          top: 10,
          px: 3,
        },
        "@media (min-width:901px) and (max-width:1200px)": {
          position: "absolute",
          top: 15,
          px: 4,
        },
        "@media (min-width:1201px) and (max-width:1536px)": {
          position: "absolute",
          top: 20,
          px: 5,
        },
        "@media (min-width:1537px)": {
          position: "absolute",
          top: 20,
          px: 6,
        },
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: 3,
          width: "100%",
          maxWidth: "700px",
          margin: "auto",
          backgroundColor: "#ffffff",
          position: "absolute",
          left: 0,
          right: 0,
          top: 20,
          // bottom:0,

          // Responsive Paper styles
          "@media (max-width:600px)": {
            position: "relative",
            top: 0,
            maxWidth: "100%",
            boxShadow: 3,
          },
          "@media (min-width:601px) and (max-width:900px)": {
            maxWidth: 600,
            top: 15,
          },
          "@media (min-width:901px) and (max-width:1200px)": {
            maxWidth: 650,
            top: 18,
          },
          "@media (min-width:1201px) and (max-width:1536px)": {
            maxWidth: 700,
            top: 20,
          },
          "@media (min-width:1537px)": {
            maxWidth: 700,
            top: 20,
          },
        }}
      >
        <Box textAlign="left" mb={3}>
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#4A148C" }}
          >
            AI Resume Builder
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Enter your details and generate a smart resume with AI
          </Typography>
        </Box>

        <ResumeFormContainer />
      </Paper>
    </Box>
  );
}

export default ResumeBuilderPage;