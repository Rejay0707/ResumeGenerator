import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Stack,
} from "@mui/material";

import FolderIcon from "@mui/icons-material/Folder";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import WorkIcon from "@mui/icons-material/Work";

const getIcon = (type) => {
  switch (type) {
    case "project":
      return <FolderIcon />;
    case "certificate":
      return <EmojiEventsIcon />;
    case "internship":
      return <WorkIcon />;
    default:
      return <FolderIcon />;
  }
};

const timeAgo = (date) => {
  const diff = Math.floor((Date.now() - new Date(date)) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  return `${Math.floor(diff / 86400)} days ago`;
};

export default function RecentActivity({ activities = [] }) {
  return (
    <Card elevation={2}>
      <CardContent>
        <Typography fontWeight="bold" mb={2}>
          Recent Activity
        </Typography>

        {activities.length === 0 ? (
          <Typography color="text.secondary">
            No recent activity yet
          </Typography>
        ) : (
          <Stack spacing={2} sx={{ maxHeight: 300, overflowY: "auto" }}>
            {activities.map((item) => (
              <Box key={`${item.type}-${item.id}`} display="flex" gap={2}>
                <Avatar sx={{ bgcolor: "#e3f2fd", color: "#0d47a1" }}>
                  {getIcon(item.type)}
                </Avatar>

                <Box flex={1}>
                  <Typography fontWeight={500}>
                    {item.action} {item.type}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {item.title}
                  </Typography>

                  {item.description && (
                    <Typography variant="caption" color="text.secondary">
                      {item.description}
                    </Typography>
                  )}
                </Box>

                <Typography variant="caption" color="text.secondary">
                  {timeAgo(item.date)}
                </Typography>
              </Box>
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}