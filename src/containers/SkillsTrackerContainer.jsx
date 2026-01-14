import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import { useState } from "react";
import SkillsTable from "../components/skills/SkillsTable";
import SkillsCards from "../components/skills/SkillsCards";
import SkillDialog from "../components/skills/SkillDialog";

const skillsMock = [
  { id: 1, name: "React", level: 85 },
  { id: 2, name: "JavaScript", level: 90 },
  { id: 3, name: "Node.js", level: 70 },
];

export default function SkillsTrackerContainer() {
  const isMobile = useMediaQuery("(max-width:900px)");
  const [skills, setSkills] = useState(skillsMock);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleAdd = () => {
    setSelected(null);
    setOpen(true);
  };

  const handleEdit = (skill) => {
    setSelected(skill);
    setOpen(true);
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={2} color="black">
        <Typography variant="h5" fontWeight="bold">
          Skills Tracker
        </Typography>
        <Button variant="contained" onClick={handleAdd}>
          Add Skill
        </Button>
      </Box>

      {isMobile ? (
        <SkillsCards data={skills} onEdit={handleEdit} />
      ) : (
        <SkillsTable data={skills} onEdit={handleEdit} />
      )}

      <SkillDialog
        open={open}
        onClose={() => setOpen(false)}
        data={selected}
      />
    </Box>
  );
}
