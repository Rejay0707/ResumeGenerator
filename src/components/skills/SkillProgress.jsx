import { Box, LinearProgress, Typography } from "@mui/material";

export default function SkillProgress({ value }) {
  return (
    <Box width="100%">
      <Typography variant="caption">{value}%</Typography>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{ height: 8, borderRadius: 5 }}
      />
    </Box>
  );
}
