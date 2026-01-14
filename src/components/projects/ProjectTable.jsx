import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { formatDuration } from "../../utils/dateUtils";

export default function ProjectTable({ data, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Title</b></TableCell>
            <TableCell><b>Role</b></TableCell>
            <TableCell><b>Duration</b></TableCell>
            <TableCell><b>Technologies</b></TableCell>
            <TableCell><b>GitHub</b></TableCell>
            <TableCell><b>Actions</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.title}</TableCell>
              <TableCell>{project.role}</TableCell>

              <TableCell>
                {formatDuration(project.start_date, project.end_date)}
              </TableCell>

              <TableCell>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {project.technologies?.map((tech, idx) => (
                    <Chip key={idx} label={tech} size="small" />
                  ))}
                </Stack>
              </TableCell>

              <TableCell>
                {project.github_url && (
                  <Button
                    size="small"
                    startIcon={<GitHubIcon />}
                    href={project.github_url}
                    target="_blank"
                  >
                    View
                  </Button>
                )}
              </TableCell>

              <TableCell>
                <Button size="small" variant="outlined"
                  onClick={() => onEdit(project)}>
                  Edit
                </Button>

                <Button
                  size="small"
                  color="error"
                  sx={{ ml: 1 }}
                  variant="outlined"
                  onClick={() => onDelete(project.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
