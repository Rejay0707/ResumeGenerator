// import React from "react";
// import { useSelector } from "react-redux";
// import { Box, Typography, Paper } from "@mui/material";

// const TeacherProfile = () => {
//   const user = useSelector((state) => state.auth.user);

//   if (!user) {
//     return <Typography>No teacher logged in.</Typography>;
//   }

//   return (
//     <Box p={3}>
//       <Paper elevation={3} sx={{ p: 3, maxWidth: 400 }}>
//         <Typography variant="h6" gutterBottom>
//           👩‍🏫 Teacher Profile
//         </Typography>

//         <Typography><strong>Name:</strong> {user.name}</Typography>
//         <Typography><strong>Email:</strong> {user.email}</Typography>
//         <Typography><strong>ID:</strong> {user.id}</Typography>
//         {user.class_sec && (
//           <Typography><strong>Class:</strong> {user.class_sec}</Typography>
//         )}
//         {user.subject && (
//           <Typography><strong>Subject:</strong> {user.subject}</Typography>
//         )}
//       </Paper>
//     </Box>
//   );
// };

// export default TeacherProfile;

import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Paper, List, ListItem, ListItemText, Divider, ListItemIcon } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";

const TeacherProfile = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return (
      <Box p={3} sx={{ backgroundColor: "#f5f5f5",  display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography variant="h6" color="textSecondary">No teacher logged in.</Typography>
      </Box>
    );
  }

  return (
    <Box p={3} sx={{ backgroundColor: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 400, width: "100%", borderRadius: 2, backgroundColor: "#f9f9f9" }}>
        <Typography variant="h5" gutterBottom sx={{ color: "#1976d2", fontWeight: "bold", textAlign: "center" }}>
          👩‍🏫 Teacher Profile
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List>
          <ListItem>
            <ListItemIcon>
              <PersonIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Name" secondary={user.name} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EmailIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Email" secondary={user.email} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <BadgeIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="ID" secondary={user.id} />
          </ListItem>
          {user.class_sec && (
            <ListItem>
              <ListItemText primary="Class" secondary={user.class_sec} />
            </ListItem>
          )}
          {user.subject && (
            <ListItem>
              <ListItemText primary="Subject" secondary={user.subject} />
            </ListItem>
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default TeacherProfile;

