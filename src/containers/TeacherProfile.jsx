import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  CircularProgress,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import axios from "axios";

const TeacherProfile = () => {
  const loggedInUser = useSelector((state) => state.auth.user);
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const response = await axios.get(
          "https://www.scratchprod.in/resume-generator-backend/api/teachers"
        );

        const allTeachers = response.data.data || [];

        // match by email first, fallback to id if needed
        const foundTeacher = allTeachers.find(
          (t) =>
            t.email?.toLowerCase() === loggedInUser?.email?.toLowerCase()
            
        );

        if (foundTeacher) {
          setTeacher(foundTeacher);
        }
      } catch (error) {
        console.error("Error fetching teacher profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (loggedInUser) fetchTeacherData();
  }, [loggedInUser]);

  if (!loggedInUser) {
    return (
      <Box
        p={3}
        sx={{
          backgroundColor: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" color="textSecondary">
          No teacher logged in.
        </Typography>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box
        p={3}
        sx={{
          backgroundColor: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!teacher) {
    return (
      <Box
        p={3}
        sx={{
          backgroundColor: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" color="textSecondary">
          Teacher details not found.
        </Typography>
      </Box>
    );
  }

  console.log(teacher.subject)

  return (
    <Box
      p={3}
      sx={{
        backgroundColor: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 3,
          maxWidth: 400,
          width: "100%",
          borderRadius: 2,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            color: "#1976d2",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          👩‍🏫 Teacher Profile
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List>
          <ListItem>
            <ListItemIcon>
              <PersonIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Name" secondary={teacher.name} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EmailIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Email" secondary={teacher.email} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <BadgeIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="ID" secondary={teacher.id} />
          </ListItem>

          {teacher.class_sec && (
            <ListItem>
              <ListItemText primary="Class" secondary={teacher.class_sec} />
            </ListItem>
          )}
          {teacher.subject && (
            <ListItem>
              <ListItemText primary="Subject" secondary={teacher.subject} />
            </ListItem>
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default TeacherProfile;
