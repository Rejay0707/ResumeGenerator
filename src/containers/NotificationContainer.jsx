import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../services/notificationApi";
import NotificationList from "../components/notifications/NotificationList";
// import { color } from "html2canvas/dist/types/css/types/color";

export default function NotificationContainer() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0); // Added state for unread count
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const res = await getNotifications(userId);

      setNotifications(res.data.notifications || []);
      setUnreadCount(res.data.unread_count || 0);

      localStorage.setItem(
        "unread_notification_count",
        res.data.unread_count || 0,
      );

      window.dispatchEvent(new Event("notificationCountUpdated"));
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRead = async (id) => {
    await markNotificationRead(id);
    fetchNotifications(); // Refetch to update counts and list
  };

  const handleReadAll = async () => {
    await markAllNotificationsRead(userId);
    fetchNotifications(); // Refetch to update counts and list
  };

  return (
    <Box p={3} style={{ color: "black" }}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5" fontWeight="bold" color="black">
          Notifications
        </Typography>

        {unreadCount > 0 && (
          <Button size="small" onClick={handleReadAll}>
            Mark all as read
          </Button>
        )}
      </Box>

      <NotificationList notifications={notifications} onRead={handleRead} loading={loading} />
    </Box>
  );
}
