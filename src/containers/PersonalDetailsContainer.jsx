import { useEffect, useState } from "react";
import {
  getPersonalDetails,
  savePersonalDetails,
  updatePersonalDetails,
} from "../services/personalDetailsApi";
import PersonalDetailsForm from "../components/PersonalDetailsForm";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  Tooltip,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function PersonalDetailsContainer() {
  const isMobile = useMediaQuery("(max-width:900px)");

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  const userEmail = user?.email || "";

  const [form, setForm] = useState({
    full_name: "",
    email: userEmail,
    phone: "",
    github_url: "",
    linkedin_url: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [dataId, setDataId] = useState(null); // Store the ID from GET for updates

  useEffect(() => {
    if (!userId) return;
    getPersonalDetails(userId)
      .then((res) => {
        if (res.data && Object.keys(res.data).length > 0) {
          setForm({
            full_name: res.data.full_name || "",
            email: userEmail,
            phone: res.data.phone || "",
            github_url: res.data.github_url || "",
            linkedin_url: res.data.linkedin_url || "",
          });
          setDataId(res.data.id); // Store ID for updates
          setHasData(true);
          setIsEditing(false);
        } else {
          setHasData(false);
          setDataId(null);
          setIsEditing(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching personal details:", error);
        setHasData(false);
        setDataId(null);
        setIsEditing(true);
      });
  }, [userId]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      if (hasData && dataId) {
        // Update: PUT with ID in path, exclude user_id from data
        const updateData = {
          full_name: form.full_name,
          email: form.email,
          phone: form.phone,
          github_url: form.github_url,
          linkedin_url: form.linkedin_url,
        };
        await updatePersonalDetails(dataId, updateData);
      } else {
        // Create: POST with user_id in data
        const createData = {
          user_id: userId,
          full_name: form.full_name,
          email: form.email,
          phone: form.phone,
          github_url: form.github_url,
          linkedin_url: form.linkedin_url,
        };
        const res = await savePersonalDetails(createData);
        setDataId(res.data.id); // Assume response includes ID after create
        setHasData(true);
      }
      alert("Personal details saved");
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving personal details:", error);
      alert("Failed to save personal details. Check console for details.");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleAdd = () => {
    setForm({
      full_name: "",
      email: userEmail,
      phone: "",
      github_url: "",
      linkedin_url: "",
    });
    setIsEditing(true);
  };

  if (isEditing) {
    return (
      <Box p={3}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h5" fontWeight="bold" color="black">
            Personal Details
          </Typography>

          {isMobile ? (
            <Tooltip title="Add Personal Details" arrow placement="left">
              <IconButton
                onClick={handleAdd}
                sx={{
                  backgroundColor: "primary.main",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                  width: 40,
                  height: 40,
                }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Button variant="contained" onClick={handleAdd}>
              Add Personal Details
            </Button>
          )}
        </Box>

        <PersonalDetailsForm
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        <Box display="flex" gap={2} mt={2}>
          <Button variant="outlined" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5" fontWeight="bold" color="black">
          Personal Details
        </Typography>

        {isMobile ? (
          <Tooltip title="Add Personal Details" arrow placement="left">
            <IconButton
              onClick={handleAdd}
              sx={{
                backgroundColor: "primary.main",
                color: "white",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
                width: 40,
                height: 40,
              }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Button variant="contained" onClick={handleAdd}>
            Add Personal Details
          </Button>
        )}
      </Box>
      <Box
        sx={{
          p: 2,
          mb: 2,
          border: "1px solid #ddd",
          borderRadius: 1,
          wordWrap: "break-word",
          overflowWrap: "break-word",
        }}
      >
        <Typography variant="h6" gutterBottom color="black">
          Saved Details
        </Typography>
        <Typography color="black">
          <strong>Full Name:</strong> {form.full_name || "Not provided"}
        </Typography>
        <Typography color="black">
          <strong>Email:</strong> {form.email || "Not provided"}
        </Typography>
        <Typography color="black">
          <strong>Phone:</strong> {form.phone || "Not provided"}
        </Typography>
        <Typography color="black">
          <strong>GitHub URL:</strong> {form.github_url || "Not provided"}
        </Typography>
        <Typography color="black">
          <strong>LinkedIn URL:</strong> {form.linkedin_url || "Not provided"}
        </Typography>
      </Box>
      
      <Box display="flex" gap={2}>
        <Button variant="contained" onClick={handleEdit}>
          Edit
        </Button>
      </Box>
    </Box>
  );
}
