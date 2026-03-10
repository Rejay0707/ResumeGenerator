import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function ModerationFilters({
  type,
  status,
  onTypeChange,
  onStatusChange,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        mb: 3,
        flexWrap: "wrap",
      }}
    >
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Type</InputLabel>
        <Select
          value={type}
          label="Type"
          onChange={(e) => onTypeChange(e.target.value)}
        >
          <MenuItem value="certificates">Certificates</MenuItem>
          <MenuItem value="projects">Projects</MenuItem>
          <MenuItem value="portfolios">Portfolios</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          label="Status"
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="approved">Approved</MenuItem>
          <MenuItem value="rejected">Rejected</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}