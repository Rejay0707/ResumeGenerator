import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function RecentActivity({ activity }) {
  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography fontWeight="bold" mb={1}>
        Recent Activity
      </Typography>

      <List>
        {activity.map((item) => (
          <ListItem key={item.id} divider>
            <ListItemText
              primary={item.text}
              secondary={item.date}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
