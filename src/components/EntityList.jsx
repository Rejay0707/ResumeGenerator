import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function EntityList({
  items,
  loading,
  error,
  onAdd,
  onEdit,
  onDelete,
  entityType, // "students" | "teachers" | "parents" | "recruiters"
}) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(deleteId);
    setDeleteDialogOpen(false);
    setDeleteId(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setDeleteId(null);
  };

  if (loading)
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" mt={2}>
        {error}
      </Typography>
    );

  // Dynamic columns based on entityType
  const columns =
    entityType === "students"
      ? [
          { key: "admissionNo", label: "Admission No" },
          { key: "name", label: "Name" },
          { key: "fatherName", label: "Father Name" },
          { key: "dob", label: "DOB" },
          { key: "classSec", label: "Class/Sec" },
          { key: "gender", label: "Gender" },
          { key: "phone", label: "Phone" },
          { key: "email", label: "Email" },
        ]
      : [
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
        ];

  // Header text for Add button
  const addButtonText =
    entityType === "students"
      ? "Add Student"
      : entityType === "teachers"
      ? "Add Teacher"
      : entityType === "parents"
      ? "Add Parent"
      : entityType === "recruiters"
      ? "Add Recruiter"
      : "Add";

  return (
    <Box>
      {/* Header with Add button */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        sx={{ flexWrap: "wrap", gap: 1 }}
      >
        {/* Optional page title */}
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {/* {entityType.charAt(0).toUpperCase() + entityType.slice(1)} */}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={onAdd}
          endIcon={<AddIcon />}
          sx={{
            whiteSpace: "nowrap",
            textTransform: "none",
            fontWeight: 500,
            px: 2,
            py: 0.8,
          }}
        >
          {addButtonText}
        </Button>
      </Box>

      {/* Table */}
      {items.length === 0 ? (
        <Typography>No records found.</Typography>
      ) : (
        <Box sx={{ width: "100%", overflowX: "auto" }}>
          <Table size="small" aria-label="entity table">
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    sx={{ fontWeight: 700, backgroundColor: "grey.50" }}
                  >
                    {col.label}
                  </TableCell>
                ))}
                <TableCell
                  align="right"
                  sx={{ fontWeight: 700, backgroundColor: "grey.50" }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row, index) => (
                <TableRow
                  key={row.id}
                  hover
                  sx={{
                    backgroundColor: index % 2 !== 0 ? "grey.50" : "inherit",
                    "&:hover": { backgroundColor: "grey.100" },
                  }}
                >
                  {columns.map((col) => (
                    <TableCell
                      key={col.key}
                      sx={{
                        wordBreak: "break-word",
                        hyphens: "auto",
                        minWidth:
                          col.key === "email" || col.key === "phone"
                            ? "120px"
                            : "auto",
                        p: { xs: 0.5, sm: 1 },
                      }}
                    >
                      {row[col.key] || "-"}
                    </TableCell>
                  ))}
                  <TableCell
                    align="right"
                    sx={{
                      whiteSpace: "nowrap",
                      p: { xs: 0.5, sm: 1 },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: 0.5,
                        flexWrap: { xs: "wrap", sm: "nowrap" },
                      }}
                    >
                      <IconButton
                        aria-label="edit"
                        size="small"
                        onClick={() => onEdit(row.id)}
                        sx={{ p: { xs: 0.5, sm: 1 } }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={() => handleDeleteClick(row.id)}
                        color="error"
                        sx={{ p: { xs: 0.5, sm: 1 } }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this item?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

