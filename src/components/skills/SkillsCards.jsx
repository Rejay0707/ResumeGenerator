import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import SkillProgress from "./SkillProgress";

export default function SkillsCards({ data, onEdit }) {
  return (
    <Grid container spacing={2}>
      {data.map((skill) => (
        <Grid item xs={12} key={skill.id}>
          <Card>
            <CardContent>
              <Typography fontWeight="bold">{skill.name}</Typography>

              <SkillProgress value={skill.level} />

              <Button
                fullWidth
                size="small"
                sx={{ mt: 1 }}
                variant="outlined"
                onClick={() => onEdit(skill)}
              >
                Edit
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
