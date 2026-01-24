import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../services/notificationApi";
import NotificationList from "../components/notifications/NotificationList";

export default function NotificationContainer() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const res = await getNotifications(userId);
    setNotifications(res.data.notifications || res.data);
  };

  const handleRead = async (id) => {
    await markNotificationRead(id);
    fetchNotifications();
  };

  const handleReadAll = async () => {
    await markAllNotificationsRead(userId);
    fetchNotifications();
  };

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5" fontWeight="bold" color="black">
          Notifications ({unreadCount})
        </Typography>

        {unreadCount > 0 && (
          <Button size="small" onClick={handleReadAll}>
            Mark all as read
          </Button>
        )}
      </Box>

      <NotificationList
        notifications={notifications}
        onRead={handleRead}
      />
    </Box>
  );
}
