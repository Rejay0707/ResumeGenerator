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
    if (user?.id) {
      fetchProjects();
    }
  }, [user]);

  const handleCreate = async (data) => {
    try {
      await createProject(user.id, data);
      fetchProjects();
      setOpenDialog(false);

      // 🔔 Dispatch event after a short delay
      setTimeout(() => {
        window.dispatchEvent(new Event("notificationCountUpdated"));
      }, 1500);
    } catch (err) {
      console.error(
        "Create project failed:",
        err.response?.data || err.message,
      );
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await updateProject(id, { ...data, user_id: user.id });
      fetchProjects();
      setEditData(null);
    } catch (err) {
      console.error(
        "Update project failed:",
        err.response?.data || err.message,
      );
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
    fetchProjects
  };
}
