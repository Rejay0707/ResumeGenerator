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
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
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

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        mb={2}
        sx={{
          flexWrap: "wrap",
          gap: 1,
          // Responsive adjustments
          "@media (max-width:600px)": {
            justifyContent: "left",
            textAlign: "left",
          },
          "@media(max-width:375px)":{
            justifyContent:'left',
            textAlign:'left',
            gap: 0.25,
          }
        }}
      >
        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            textAlign: "left",
            fontSize: {
              xs: "1.25rem",
              sm: "1.5rem",
              md: "1.75rem",
            },
          }}
        >
          List
        </Typography>
        <IconButton
          color="primary"
          onClick={onAdd}
          aria-label="add new"
          sx={{
            flexShrink: 0,
            "@media (max-width:600px)": {
              width: 40,
              height: 40,
            },
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      {items.length === 0 ? (
        <Typography>No records found.</Typography>
      ) : (
        <Box
          sx={{
            width: "100%",
            overflowX: "auto",
            // Add some bottom margin on small screens
            mb: { xs: 2, sm: 0 },
            px:{xs:1,sm:0},
          }}
        >
          <Table
            size="small"
            aria-label="entity table"
            sx={{
              minWidth: 300,
              width: "100%",
              // Responsive font sizes for table cells
              "& td, & th": {
                fontSize: {
                  xs: "0.75rem",
                  sm: "0.875rem",
                  md: "1rem",
                },
                padding: {
                  xs: "6px 8px",
                  sm: "8px 12px",
                },
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map(({ id, name, email }) => (
                <TableRow key={id} hover>
                  <TableCell>{name}</TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="edit"
                      size="small"
                      onClick={() => onEdit(id)}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={() => handleDeleteClick(id)}
                      color="error"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}

      {/* Delete Confirmation Dialog */}
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



