import AdminModerationContainer from "../../containers/AdminModerationContainer";
import { Box, Typography, Paper } from "@mui/material";

export default function AdminModerationPage() {
  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 5 } }}>
      
      <Typography
        variant="h4"
        fontWeight="600"
        gutterBottom
      >
        Content Moderation
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 3,
          mt: 2
        }}
      >
        <AdminModerationContainer />
      </Paper>

    </Box>
  );
}