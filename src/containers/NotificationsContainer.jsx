import { Box, Typography, Paper } from "@mui/material";
import { useState } from "react";
import NotificationsList from "../components/notifications/NotificationsList";
import EmptyNotifications from "../components/notifications/EmptyNotifications";

const notificationsMock = [
  {
    id: 1,
    title: "Resume Generated",
    message: "Your resume PDF has been generated successfully.",
    type: "success",
    date: "Today",
    read: false,
  },
  {
    id: 2,
    title: "Internship Updated",
    message: "Your Amazon internship was marked as completed.",
    type: "info",
    date: "Yesterday",
    read: true,
  },
  {
    id: 3,
    title: "New Roadmap Available",
    message: "A new skill roadmap has been generated for you.",
    type: "warning",
    date: "2 days ago",
    read: false,
  },
];

export default function NotificationsContainer() {
  const [notifications, setNotifications] = useState(notificationsMock);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Notifications
      </Typography>

      <Paper elevation={2}>
        {notifications.length === 0 ? (
          <EmptyNotifications />
        ) : (
          <NotificationsList
            data={notifications}
            onRead={markAsRead}
          />
        )}
      </Paper>
    </Box>
  );
}
