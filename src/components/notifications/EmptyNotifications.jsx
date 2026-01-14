import { Box, Typography } from "@mui/material";

export default function EmptyNotifications() {
  return (
    <Box p={4} textAlign="center">
      <Typography variant="h6">
        No notifications
      </Typography>
      <Typography variant="body2" color="text.secondary">
        You're all caught up 🎉
      </Typography>
    </Box>
  );
}
