import { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import {
  getEducation,
  addEducation,
  updateEducation,
  deleteEducation,
} from "../services/educationApi";
import EducationCard from "../components/EducationCard";
import EducationForm from "../components/EducationForm";

const emptyForm = {
  id: null,
  level: "college",
  institution: "",
  degree: "",
  field_of_study: "",
  board: "",
  grade: "",
  start_year: "",
  end_year: "",
};


export default function EducationContainer() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const fetchEducation = async () => {
    const res = await getEducation(userId);
    setList(res.data || []);
  };

  useEffect(() => {
    if (userId) fetchEducation();
  }, [userId]);

  const handleOpenAdd = () => {
    setForm(emptyForm);
    setOpen(true);
  };

  const handleOpenEdit = (item) => {
  setForm({
    id: item.id || null,
    level: item.level || "college",
    institution: item.institution || "",
    degree: item.degree || "",
    field_of_study: item.field_of_study || "",
    board: item.board || "",
    grade: item.grade || "",
    start_year: item.start_year || "",
    end_year: item.end_year || "",
  });
  setOpen(true);
};


  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    if (form.id) {
      await updateEducation(form.id, form);
    } else {
      await addEducation({ ...form, user_id: userId });
    }
    setOpen(false);
    fetchEducation();
  };

  const handleDelete = async (id) => {
    await deleteEducation(id);
    fetchEducation();
  };

  return (
    <Box>
      <Button variant="contained" sx={{ mb: 2 }} onClick={handleOpenAdd}>
        Add Education
      </Button>

      <Grid container spacing={2}>
        {list.map((item) => (
          <Grid item xs={12} md={6} key={item.id}>
            <EducationCard
              item={item}
              onEdit={handleOpenEdit}
              onDelete={handleDelete}
            />
          </Grid>
        ))}
      </Grid>

      <EducationForm
        open={open}
        onClose={() => setOpen(false)}
        form={form}
        onChange={handleChange}
        onSave={handleSave}
      />
    </Box>
  );
}
