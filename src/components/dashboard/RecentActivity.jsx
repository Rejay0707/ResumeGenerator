// import {
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   Avatar,
//   Stack,
// } from "@mui/material";

// import FolderIcon from "@mui/icons-material/Folder";
// import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
// import WorkIcon from "@mui/icons-material/Work";

// const getIcon = (type) => {
//   switch (type) {
//     case "project":
//       return <FolderIcon />;
//     case "certificate":
//       return <EmojiEventsIcon />;
//     case "internship":
//       return <WorkIcon />;
//     default:
//       return <FolderIcon />;
//   }
// };

// const timeAgo = (date) => {
//   const diff = Math.floor((Date.now() - new Date(date)) / 1000);
//   if (diff < 60) return "Just now";
//   if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
//   if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
//   return `${Math.floor(diff / 86400)} days ago`;
// };

// export default function RecentActivity({ activities = [] }) {
//   return (
//     <Card elevation={2}>
//       <CardContent>
//         <Typography fontWeight="bold" mb={2}>
//           Recent Activity
//         </Typography>

//         {activities.length === 0 ? (
//           <Typography color="text.secondary">
//             No recent activity yet
//           </Typography>
//         ) : (
//           <Stack spacing={2} sx={{ maxHeight: 300, overflowY: "auto" }}>
//             {activities.map((item) => (
//               <Box key={`${item.type}-${item.id}`} display="flex" gap={2}>
//                 <Avatar sx={{ bgcolor: "#e3f2fd", color: "#0d47a1" }}>
//                   {getIcon(item.type)}
//                 </Avatar>

//                 <Box flex={1}>
//                   <Typography fontWeight={500}>
//                     {item.action} {item.type}
//                   </Typography>

//                   <Typography variant="body2" color="text.secondary">
//                     {item.title}
//                   </Typography>

//                   {item.description && (
//                     <Typography variant="caption" color="text.secondary">
//                       {item.description}
//                     </Typography>
//                   )}
//                 </Box>

//                 <Typography variant="caption" color="text.secondary">
//                   {timeAgo(item.date)}
//                 </Typography>
//               </Box>
//             ))}
//           </Stack>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
} from "@mui/material";

import FolderIcon from "@mui/icons-material/Folder";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import WorkIcon from "@mui/icons-material/Work";

const getConfig = (type) => {
  switch (type) {
    case "project":
      return {
        icon: <FolderIcon />,
        bg: "#E0E7FF",
        color: "#4F46E5",
      };
    case "certificate":
      return {
        icon: <EmojiEventsIcon />,
        bg: "#DCFCE7",
        color: "#16A34A",
      };
    case "internship":
      return {
        icon: <WorkIcon />,
        bg: "#FCE7F3",
        color: "#DB2777",
      };
    default:
      return {
        icon: <FolderIcon />,
        bg: "#E5E7EB",
        color: "#374151",
      };
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
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Recent Activity
        </Typography>

        {activities.length === 0 ? (
          <Typography color="text.secondary">
            No recent activity yet
          </Typography>
        ) : (
          <Box sx={{ maxHeight: 300, overflowY: "auto" }}>
            {activities.map((item, index) => {
              const config = getConfig(item.type);

              return (
                <Box key={`${item.type}-${item.id}`}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    py={1.5}
                  >
                    {/* LEFT */}
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar
                        sx={{
                          bgcolor: config.bg,
                          color: config.color,
                          width: 40,
                          height: 40,
                        }}
                      >
                        {config.icon}
                      </Avatar>

                      <Box>
                        <Typography fontWeight={600} fontSize={14}>
                          {item.action} {item.type}
                        </Typography>

                        <Typography
                          fontSize={13}
                          color="text.secondary"
                        >
                          {item.title}
                        </Typography>
                      </Box>
                    </Box>

                    {/* RIGHT TIME */}
                    <Typography
                      fontSize={12}
                      color="text.secondary"
                    >
                      {timeAgo(item.date)}
                    </Typography>
                  </Box>

                  {/* Divider line (like image) */}
                  {index !== activities.length - 1 && (
                    <Box
                      sx={{
                        height: 1,
                        background: "#E5E7EB",
                      }}
                    />
                  )}
                </Box>
              );
            })}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}