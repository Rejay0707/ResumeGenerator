import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Stack,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { formatDuration } from "../../utils/dateUtils";

export default function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <Card>
      <CardContent>
        <Typography fontWeight="bold" variant="h6">
          {project.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={0.5}>
          {project.role}
        </Typography>

        <Typography variant="caption" color="text.secondary" display="block" mb={1}>
          {formatDuration(project.start_date, project.end_date)}
        </Typography>

        <Typography variant="body2" mb={1}>
          {project.description}
        </Typography>

        {/* Outcomes */}
        {project.outcomes && (
          <Typography variant="body2" color="success.main" mb={1}>
            Outcome: {project.outcomes}
          </Typography>
        )}

        {/* Technologies */}
        {project.technologies?.length > 0 && (
          <Stack direction="row" spacing={1} flexWrap="wrap" mb={1}>
            {project.technologies.map((tech, index) => (
              <Chip key={index} label={tech} size="small" />
            ))}
          </Stack>
        )}

        {/* GitHub */}
        {project.github_url && (
          <Box mb={1}>
            <Button
              size="small"
              startIcon={<GitHubIcon />}
              href={project.github_url}
              target="_blank"
            >
              View Code
            </Button>
          </Box>
        )}

        {/* Actions */}
        <Box display="flex" gap={1}>
          <Button size="small" variant="outlined" onClick={() => onEdit(project)}>
            Edit
          </Button>
          <Button
            size="small"
            color="error"
            variant="outlined"
            onClick={() => onDelete(project.id)}
          >
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
