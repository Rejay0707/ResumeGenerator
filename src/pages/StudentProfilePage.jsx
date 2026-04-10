import React from "react";
import { useSelector } from "react-redux";
import StudentProfileCard from "../components/student/StudentProfileCard";
import { Box, Container } from "@mui/material";

export default function StudentProfilePage() {
  const user = useSelector((state) => state.auth.user);

  if (!user) return null;

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <StudentProfileCard user={user} />
      </Box>
    </Container>
  );
}