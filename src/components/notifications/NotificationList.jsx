import { Typography } from "@mui/material";
import NotificationItem from "./NotificationItem";


export default function NotificationList({ notifications, onRead }) {
  if (!notifications.length) {
    return <Typography style={{color:"black"}}>No notifications found</Typography>;
  }

  return notifications.map((item) => (
    <NotificationItem
      key={item.id}
      notification={item}
      onRead={onRead}
    />
  ));
}
