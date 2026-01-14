import { List } from "@mui/material";
import NotificationItem from "./NotificationItem";

export default function NotificationsList({ data, onRead }) {
  return (
    <List>
      {data.map((item) => (
        <NotificationItem
          key={item.id}
          notification={item}
          onRead={onRead}
        />
      ))}
    </List>
  );
}
