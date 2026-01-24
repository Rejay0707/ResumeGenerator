import { Box, Typography, Paper } from "@mui/material";
import PersonalDetailsContainer from "../containers/PersonalDetailsContainer";

export default function PersonalDetailsPage() {
  return (
    <Box p={3}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Personal Details
        </Typography>
        <PersonalDetailsContainer />
      </Paper>
    </Box>
  );
}
