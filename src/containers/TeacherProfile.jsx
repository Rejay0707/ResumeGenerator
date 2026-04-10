import React from "react";
import { useSelector } from "react-redux";
import TeacherProfileCard from "../components/TeacherProfileCard";
import { Box, Container } from "@mui/material";

export default function TeacherProfilePage() {
  const user = useSelector((state) => state.auth.user);

  if (!user) return null;

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <TeacherProfileCard user={user} />
      </Box>
    </Container>
  );
}