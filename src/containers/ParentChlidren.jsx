import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Typography, Box, CircularProgress } from "@mui/material";
import axios from "axios";
import { fetchParentChildrenAsync } from "../features/parentChildrenSlice";

export default function ParentChildren() {
  const dispatch = useDispatch();
  const { loading, error, children } = useSelector(
    (state) => state.parentChildren
  );

useEffect(() => {
  let hasFetched = false;

  const fetchGuardianIdAndChildren = async () => {
    if (hasFetched) return; // prevent duplicate fetch
    hasFetched = true;

    try {
      const loggedInUser = JSON.parse(localStorage.getItem("user"));

      const guardiansRes = await axios.get(
        "https://www.scratchprod.in/resume-generator-backend/api/guardians"
      );
      const guardians = guardiansRes.data.data;

      const guardian = guardians.find(
        (g) => g.email.toLowerCase() === loggedInUser.email.toLowerCase()
      );

      if (guardian) {
        dispatch(fetchParentChildrenAsync(guardian.id));
      } else {
        console.error("Guardian not found for logged-in user");
      }
    } catch (err) {
      console.error("Error fetching guardian:", err);
    }
  };

  fetchGuardianIdAndChildren();
}, [dispatch]);


  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        My Children
      </Typography>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && !error && children.length === 0 && (
        <Typography>No children found.</Typography>
      )}

      {!loading && !error && children.length > 0 && (
        <Box>
          {children.map((child) => (
            <Paper
              key={child.id}
              sx={{ p: 2, mb: 2, borderRadius: 2, backgroundColor: "#f0f0f0" }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {child.name} ({child.year} - {child.department})
              </Typography>
              <Typography>Admission No: {child.admission_no}</Typography>
              <Typography>Father Name: {child.father_name}</Typography>
              <Typography>DOB: {child.dob}</Typography>
              <Typography>Gender: {child.gender}</Typography>
              <Typography>Phone: {child.phone}</Typography>
              <Typography>Email: {child.email}</Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Paper>
  );
}
