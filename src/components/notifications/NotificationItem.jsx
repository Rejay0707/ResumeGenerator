import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Box,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";

const iconMap = {
  success: <CheckCircleIcon color="success" />,
  info: <InfoIcon color="info" />,
  warning: <WarningIcon color="warning" />,
};

export default function NotificationItem({ notification, onRead }) {
  return (
    <ListItem
      divider
      sx={{
        backgroundColor: notification.read
          ? "#fff"
          : "#f5faff",
        cursor: "pointer",
      }}
      onClick={() => onRead(notification.id)}
    >
      <ListItemIcon>
        {iconMap[notification.type]}
      </ListItemIcon>

      <ListItemText
        primary={
          <Box display="flex" alignItems="center" gap={1}>
            {notification.title}
            {!notification.read && (
              <Chip
                label="NEW"
                size="small"
                color="primary"
              />
            )}
          </Box>
        }
        secondary={`${notification.message} • ${notification.date}`}
      />
    </ListItem>
  );
}
