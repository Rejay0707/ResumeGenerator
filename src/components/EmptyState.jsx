import { Box, Typography } from "@mui/material";

export default function EmptyState({ title, description }) {
  return (
    <Box
      sx={{
        mt: 4,
        p: 4,
        textAlign: "center",
        border: "1px dashed #ccc",
        borderRadius: 2,
        color: "text.secondary",
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2">
        {description}
      </Typography>
    </Box>
  );
}
