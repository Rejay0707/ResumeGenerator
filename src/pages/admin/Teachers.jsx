import React, { useState } from "react";
import {
  Typography,
  Box,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import useAdminManagement from "../../containers/AdminManagement";
import EntityList from "../../components/EntityList";
import EntityFormDialog from "../../components/EntityFormDialog";

export default function Teachers() {
  const { items, loading, error, addItem, updateItem, deleteItem } =
    useAdminManagement("teachers");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formError, setFormError] = useState("");  // For form-specific errors
  const [searchTerm, setSearchTerm] = useState("");

  const handleAdd = () => {
    setEditingItem(null);
    setFormError("");  // Clear any previous errors
    setDialogOpen(true);
  };

  const handleEdit = (id) => {
    const item = items.find((i) => i.id === id);
    setEditingItem(item);
    setFormError("");  // Clear errors on edit
    setDialogOpen(true);
  };

  const handleDelete = (id) => {
    deleteItem(id);
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingItem) {
        await updateItem(editingItem.id, formData);  // Assuming updateItem is async
      } else {
        await addItem(formData);  // Assuming addItem is async and throws on error
      }
      setDialogOpen(false);
      setFormError("");  // Clear on success
    } catch (err) {
      // Extract and format the error from the response
      const errorMessage = err?.response?.data?.errors
        ? Object.values(err.response.data.errors).join(", ")  // e.g., "Email already exists"
        : err?.message || "An error occurred while saving.";  // Fallback
      setFormError(errorMessage);
      // Don't close the dialog so user can fix and retry
    }
  };

  const admin = JSON.parse(localStorage.getItem("user"));
  const adminCollege = admin?.college;

  // First, filter by college
  const filteredTeachers = items.filter(
    (t) => t.college === adminCollege
  );

  // Further filter by search term (on name, case-insensitive)
  // You can expand this to include other fields like email or department if needed.
  const searchedTeachers = filteredTeachers.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handlers for search
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <Box
      sx={{
        backgroundColor: "blue.100", // Match Students.jsx background
        px: { xs: 1, sm: 2, md: 3, lg: 4 },
        py: { xs: 1, sm: 2, md: 3 },
        textAlign: "left",
        boxSizing: "border-box",
        overflowX: "hidden",
        "@media (min-width:600px)": {
          px: 4,
        },
        "@media (max-width:600px)": {
          px: 1,
        },
        "@media(max-width:360px)": {
          px: 0.2,
        },
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontSize: {
            xs: "20px",
            sm: "20px",
            md: "22px",
            lg: "24",
            xl: "24px",
          },
          fontWeight: "bold",
          mb: { xs: 1, sm: 2 },
          lineHeight: 1.2,
        }}
      >
        Manage Teachers
      </Typography>

      {/* Search UI */}
      <Paper
        elevation={1}
        sx={{
          width: "100%",
          p: { xs: 1, sm: 1.5, md: 2, lg: 2.5 },
          mb: { xs: 1.5, sm: 2, md: 3 },
          borderRadius: { xs: 1, sm: 2 },
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "stretch", sm: "center" },
            justifyContent: "space-between",
            gap: { xs: 1, sm: 1.5, md: 2 },
            boxSizing: "border-box",
          }}
        >
          <Box sx={{ flexGrow: 1, width: "100%", mb: { xs: 1, sm: 0 } }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search teachers by name..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="clear search"
                      onClick={handleClearSearch}
                      edge="end"
                      size="small"
                      sx={{ p: { xs: 0.5, sm: 0.75 } }}
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: { xs: 1, sm: 2 },
                  fontSize: {
                    xs: "0.75rem",
                    sm: "0.875rem",
                    md: "1rem",
                  },
                  minHeight: { xs: 40, sm: 44 },
                },
                wordBreak: "break-word",
              }}
            />
          </Box>

          {/* Count display */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              textAlign: { xs: "center", sm: "right" },
              fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
              minWidth: { sm: "100px", md: "120px" },
              maxWidth: { xs: "100%" },
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {searchedTeachers.length} of {filteredTeachers.length} teachers
          </Typography>
        </Box>
      </Paper>

      {/* Alert for no search results */}
      {searchTerm && searchedTeachers.length === 0 && !loading && (
        <Alert
          severity="info"
          sx={{
            mb: { xs: 1.5, sm: 2, md: 3 },
            borderRadius: { xs: 1, sm: 2 },
            fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          No teachers found matching "{searchTerm}".
        </Alert>
      )}

      {/* Pass searchedTeachers to EntityList */}
      <EntityList
        items={searchedTeachers}
        loading={loading}
        error={error}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        entityType="teachers"
      />

      <EntityFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingItem}
        entityType="teachers"
        error={formError}  // Pass the form error here
        defaultValues={{
          college: adminCollege,
        }}
      />
    </Box>
  );
}