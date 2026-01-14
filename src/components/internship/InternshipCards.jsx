import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import StatusChip from "./StatusChip";

export default function InternshipCards({ data, onEdit, onDelete }) {
  return (
    <Grid container spacing={2}>
      {data.map((item) => (
        <Grid item xs={12} key={item.id}>
          <Card>
            <CardContent>
              <Typography fontWeight="bold">{item.company}</Typography>
              <Typography variant="body2">{item.role}</Typography>

              <Box mt={1}>
                <StatusChip status={item.status} />
              </Box>

              <Typography variant="caption" display="block" mt={1}>
                {item.start_date} – {item.end_date || "Present"}
              </Typography>

              <Typography variant="body2" color="text.secondary" mt={1}>
                Applied Date: {item.applied_date || "N/A"}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Internship Type: {item.internship_type || "N/A"}
              </Typography>

              <Box mt={2} display="flex" gap={1}>
                <Button
                  fullWidth
                  size="small"
                  variant="outlined"
                  onClick={() => onEdit(item)}
                >
                  {item.status === "completed" ? "View" : "Edit"}
                </Button>

                <Button
                  fullWidth
                  size="small"
                  color="error"
                  variant="outlined"
                  onClick={() => onDelete(item.id)}
                >
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
