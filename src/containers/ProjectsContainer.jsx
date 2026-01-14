import { useEffect, useState } from "react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../services/projectApi";
import { useSelector } from "react-redux";

export default function ProjectsContainer() {
  const user = useSelector((state) => state.auth.user);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchProjects = async () => {
    if (!user) return;
    setLoading(true);
    const res = await getProjects(user.id);
    setProjects(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (data) => {
  try {
    await createProject(user.id, data); // ✅ PASS user.id
    fetchProjects();
    setOpenDialog(false);
  } catch (err) {
    console.error("Create project failed:", err.response?.data || err.message);
  }
};


  const handleUpdate = async (id, data) => {
  try {
    await updateProject(id, { ...data, user_id: user.id });
    fetchProjects();
    setEditData(null);
  } catch (err) {
    console.error("Update project failed:", err.response?.data || err.message);
  }
};


  const handleDelete = async (id) => {
    await deleteProject(id);
    fetchProjects();
  };

  return {
    projects,
    loading,
    openDialog,
    setOpenDialog,
    editData,
    setEditData,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
}
