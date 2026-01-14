import { Chip } from "@mui/material";

export default function StatusChip({ status }) {
  return (
    <Chip
      size="small"
      // label={status.toUpperCase()}
      color={status === "completed" ? "success" : "warning"}
    />
  );
}
