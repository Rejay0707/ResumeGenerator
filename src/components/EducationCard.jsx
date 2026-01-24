import { Card, CardContent, Typography, Button, Box } from "@mui/material";

export default function EducationCard({ item, onEdit, onDelete }) {
  return (
    <Card elevation={2}>
      <CardContent>
        <Typography fontWeight="bold">{item.institution}</Typography>

        <Typography variant="body2">
          {item.level === "college" ? (
            <>
              {item.degree} {item.field_of_study && `- ${item.field_of_study}`}
            </>
          ) : (
            <>School Education {item.board && `(${item.board})`}</>
          )}
        </Typography>

        {item.grade && (
          <Typography variant="caption">Grade: {item.grade}</Typography>
        )}

        <Typography variant="caption">
          {item.start_year} – {item.end_year}
        </Typography>

        <Box mt={1} display="flex" gap={1}>
          <Button size="small" onClick={() => onEdit(item)}>
            Edit
          </Button>
          <Button size="small" color="error" onClick={() => onDelete(item.id)}>
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
