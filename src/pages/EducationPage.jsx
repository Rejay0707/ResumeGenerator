import { Box, Typography, Paper } from "@mui/material";
import EducationContainer from "../containers/EducationContainer";

export default function EducationPage() {
  return (
    <Box p={3}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Education
        </Typography>
        <EducationContainer />
      </Paper>
    </Box>
  );
}
