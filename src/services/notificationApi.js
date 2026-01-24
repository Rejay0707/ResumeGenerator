import api from "./api";

/**
 * GET all notifications for a user
 */
export const getNotifications = (userId) => {
  return api.get(`/api/notifications`, {
    params: { user_id: userId },
  });
};

/**
 * MARK single notification as read
 */
export const markNotificationRead = (notificationId) => {
  return api.put(`/api/notifications/${notificationId}/read`);
};

/**
 * MARK all notifications as read
 */
export const markAllNotificationsRead = (userId) => {
  return api.put(`/api/notifications/read-all`, {
    user_id: userId,
  });
};
