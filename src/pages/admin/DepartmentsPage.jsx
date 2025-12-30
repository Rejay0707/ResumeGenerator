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

export default function Departments() {
  const { items, loading, error, addItem, updateItem, deleteItem } =
    useAdminManagement("departments"); // Use "departments" as entityType
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Added: State for search term

  const handleAdd = () => {
    setEditingItem(null);
    setDialogOpen(true);
  };

  const handleEdit = (id) => {
    const item = items.find((i) => i.id === id);
    setEditingItem(item);
    setDialogOpen(true);
  };

  const handleDelete = (id) => {
    deleteItem(id);
  };

  const handleSubmit = (formData) => {
    if (editingItem) {
      updateItem(editingItem.id, formData);
    } else {
      addItem(formData);
    }
    setDialogOpen(false);
  };

  const admin = JSON.parse(localStorage.getItem("user"));
  const adminCollege = admin?.college;

  // First, filter by college
  const filteredDepartments = items.filter(
    (dep) => dep.college === adminCollege
  );

  // Further filter by search term (on department_name, case-insensitive)
  // You can expand this to include other fields like department_code if needed.
  const searchedDepartments = filteredDepartments.filter((item) =>
    item.department_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Added: Handlers for search
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <Box
      sx={{
        backgroundColor: "blue.100", // Added: Match Students.jsx background
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
        Manage Departments
      </Typography>

      {/* Added: Search UI */}
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
              placeholder="Search departments by name..."
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

          {/* Added: Count display */}
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
            {searchedDepartments.length} of {filteredDepartments.length} departments
          </Typography>
        </Box>
      </Paper>

      {/* Added: Alert for no search results */}
      {searchTerm && searchedDepartments.length === 0 && !loading && (
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
          No departments found matching "{searchTerm}".
        </Alert>
      )}

      {/* Updated: Pass searchedDepartments to EntityList */}
      <EntityList
        items={searchedDepartments}
        loading={loading}
        error={error}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        entityType="departments" // Pass entityType for custom configurations
      />

      <EntityFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingItem}
        entityType="departments" // Use for form fields
        defaultValues={{
          college: adminCollege,
        }}
      />
    </Box>
  );
}