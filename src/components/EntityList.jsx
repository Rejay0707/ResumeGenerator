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
  TablePagination,
  TableContainer,
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
  entityType,
}) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // ✅ Pagination state (only for students)
  const [page, setPage] = useState(0);
  const rowsPerPage = entityType === "students" ? 10 : items.length;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

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

  // ✅ Dynamic columns
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

  // ✅ Add button text
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

  // ✅ Apply pagination only for students
  const paginatedItems =
    entityType === "students"
      ? items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : items;

  // ✅ Helper to determine if scroll should be enabled (for students only, small screens)
  const shouldScroll = entityType === "students" && window.innerWidth < 900; // Fallback check (md breakpoint ~900px)

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
        <Typography variant="h5" sx={{ fontWeight: 600 }}></Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={onAdd}
          startIcon={<AddIcon />}
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
        <>
          {/* ✅ TableContainer with aggressive horizontal scroll (only for students on small screens) */}
          <TableContainer
            component="div"
            style={{
              // Fallback inline styles for critical scroll (overrides any CSS issues)
              width: "100%",
              maxWidth: "100%",
              overflowX: shouldScroll ? "auto" : "visible",
              WebkitOverflowScrolling: shouldScroll ? "touch" : "auto", // Smooth iOS scroll
              border: shouldScroll ? "1px solid #e0e0e0" : "none", // Visual border to see scroll area
              borderRadius: 1,
              boxShadow: shouldScroll ? "0 2px 4px rgba(0,0,0,0.1)" : "none",
            }}
            sx={{
              // MUI sx for responsive fine-tuning
              overflowX:
                entityType === "students"
                  ? {
                      xs: "auto",
                      sm: "auto",
                      md: "visible",
                    }
                  : "visible",
              // Ensure no vertical scroll interference
              overflowY: "visible",
            }}
          >
            <Table
              size="small"
              aria-label="entity table"
              sx={{
                // Force wide table on small screens to trigger scroll
                minWidth:
                  entityType === "students"
                    ? {
                        xs: "1200px", // Aggressive: Forces scroll on mobile (<600px)
                        sm: "1200px", // Aggressive: Forces scroll on tablet (600-900px)
                        md: "auto", // No force on laptop+ (900px+)
                      }
                    : "auto",
                // Table-specific styles
                tableLayout: "fixed", // Helps with column consistency during scroll
              }}
            >
              <TableHead
                sx={{
                  padding: "8px 12px", // custom top/bottom + left/right
                  height: "50px", // custom row height
                }}
              >
                <TableRow>
                  {columns.map((col) => (
                    <TableCell
                      key={col.key}
                      sx={{
                        fontWeight: 700,
                        backgroundColor: "#896C6C",
                        width: shouldScroll ? "150px" : "auto", // Fixed width on scroll to prevent reflow
                      }}
                    >
                      {col.label}
                    </TableCell>
                  ))}
                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 700,
                      backgroundColor: "#896C6C",
                      width: shouldScroll ? "120px" : "auto",
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedItems.map((row, index) => (
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
                          minWidth: shouldScroll
                            ? "150px"
                            : col.key === "email" || col.key === "phone"
                            ? "120px"
                            : "auto",
                          p: { xs: 0.5, sm: 1 },
                          width: shouldScroll ? "150px" : "auto", // Fixed for scroll
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
                        width: shouldScroll ? "120px" : "auto",
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
          </TableContainer>

          {/* ✅ Pagination (outside container, always visible) */}
          {entityType === "students" && (
            <TablePagination
              component="div"
              count={items.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[]}
              sx={{ mt: 2, px: 1 }} // Padding to align with table
            />
          )}
        </>
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


