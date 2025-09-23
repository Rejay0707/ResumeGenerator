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

export default function Students() {
  const { items, loading, error, addItem, updateItem, deleteItem } =
    useAdminManagement("students");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = items.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <Box
      sx={{
        backgroundColor: 'blue.100',
        // Responsive padding: Minimal on mobile, scales up
        px: { xs: 1, sm: 2, md: 3, lg: 4 },
        py: { xs: 1, sm: 2, md: 3 },
        textAlign: "left",
        boxSizing: "border-box",
        overflowX: "hidden", // Prevent page-level horizontal scroll
        // Custom media for very small screens (<360px, e.g., small phones)
        // MUI breakpoints
        "@media (min-width:600px)": {
          px: 4, // sm and up
        },
        "@media (max-width:600px)": {
          px: 1,
        },
        "@media(max-width:360px)":{
          px:0.2
        },
        // Ensure full height utilization
      }}
    >
      {/* Title: Responsive font scaling, left-aligned */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontSize: {
            xs: "1.25rem", // Smaller on mobile
            sm: "1.75rem",
            md: "2.25rem",
            lg: "2.75rem",
            xl: "24px",
          },
          fontWeight: "bold",
          mb: { xs: 1, sm: 2 }, // Reduced margin on mobile
          lineHeight: 1.2, // Better stacking on small screens
        }}
      >
        Manage Students
      </Typography>

      {/* Search Section: Stacks on mobile, row on tablet+ */}
      <Paper
        elevation={1}
        sx={{
          width: "100%",
          p: { xs: 1, sm: 1.5, md: 2, lg: 2.5 }, // Scale padding
          mb: { xs: 1.5, sm: 2, md: 3 },
          borderRadius: { xs: 1, sm: 2 },
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" }, // Stack on mobile
            alignItems: { xs: "stretch", sm: "center" },
            justifyContent: "space-between",
            gap: { xs: 1, sm: 1.5, md: 2 },
            boxSizing: "border-box",
          }}
        >
          {/* Search Input: Full-width always, responsive font */}
          <Box sx={{ flexGrow: 1, width: "100%", mb: { xs: 1, sm: 0 } }}> {/* Margin bottom only on mobile stack */}
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search students by name..."
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
                      sx={{ p: { xs: 0.5, sm: 0.75 } }} // Touch-friendly on mobile
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
                    xs: "0.75rem", // Smaller on mobile
                    sm: "0.875rem",
                    md: "1rem",
                  },
                  minHeight: { xs: 40, sm: 44 }, // Touch target height
                },
                wordBreak: "break-word", // Wrap long placeholders
              }}
            />
          </Box>

          {/* Results Counter: Centers on mobile, right on tablet+ */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              textAlign: { xs: "center", sm: "right" },
              fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
              minWidth: { sm: "100px", md: "120px" }, // Prevent squish on tablet
              maxWidth: { xs: "100%" }, // Full on mobile
              whiteSpace: "nowrap", // Prevent wrap on small text
              flexShrink: 0, // Don't shrink
            }}
          >
            {filteredItems.length} of {items.length} students
          </Typography>
        </Box>
      </Paper>

      {/* No Results Alert: Responsive margins/font */}
      {searchTerm && filteredItems.length === 0 && !loading && (
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
          No students found matching "{searchTerm}".
        </Alert>
      )}

      {/* Entity List: Full-width, scrolls if needed on mobile/tablet */}
      <EntityList
        items={filteredItems}
        loading={loading}
        error={error}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        entityType="students"
      />

      {/* Dialog: Already responsive via EntityFormDialog */}
      <EntityFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingItem}
        entityType="students"
      />
    </Box>
  );
}
