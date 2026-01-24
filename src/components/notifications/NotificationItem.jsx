import { Box, Typography, Chip } from "@mui/material";

export default function NotificationItem({ notification, onRead }) {
  return (
    <Box
      p={2}
      mb={1}
      borderRadius={2}
      border="1px solid #ddd"
      bgcolor={notification.is_read ? "#fafafa" : "#e3f2fd"}
      onClick={() =>
        !notification.is_read && onRead(notification.id)
      }
      sx={{ cursor: "pointer" }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography fontWeight={600}>
          {notification.title}
        </Typography>

        {!notification.is_read && (
          <Chip label="NEW" size="small" color="primary" />
        )}
      </Box>

      <Typography variant="body2" mt={0.5}>
        {notification.message}
      </Typography>

      <Typography variant="caption" color="text.secondary">
        {notification.created_at}
      </Typography>
    </Box>
  );
}
