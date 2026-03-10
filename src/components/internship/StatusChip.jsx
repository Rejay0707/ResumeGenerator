import { Chip } from "@mui/material";

export default function StatusChip({ status }) {
  const normalized = status?.toLowerCase();

  let color = "default";

  switch (normalized) {
    case "approved":
      color = "success";
      break;

    case "rejected":
      color = "error";
      break;

    case "pending":
      color = "warning";
      break;

    case "completed":
      color = "success";
      break;

    case "in progress":
      color = "info";
      break;

    default:
      color = "default";
  }

  return <Chip label={status || "N/A"} color={color} size="small" />;
}