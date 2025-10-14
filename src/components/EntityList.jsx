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
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import TableChartIcon from "@mui/icons-material/TableChart";

// PDF imports
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Excel import
import * as XLSX from "xlsx";

// Word imports
import {
  Document,
  Packer,
  Paragraph,
  Table as DocxTable,
  TableRow as DocxTableRow,
  TableCell as DocxTableCell,
} from "docx";
import { saveAs } from "file-saver";

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

  const below1600 = useMediaQuery("(max-width:1600px)");
  const shouldScroll = entityType === "students" && below1600;

  // Pagination state (only for students)
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

  // Dynamic columns
// Inside EntityList component, replace the columns definition with this:

const columns =
  entityType === "students"
    ? [
        { key: "admission_no", label: "Admission No" },
        { key: "name", label: "Name" },
        { key: "father_name", label: "Father Name" },
        { key: "dob", label: "DOB" },
        { key: "class_sec", label: "Class/Sec" },
        { key: "gender", label: "Gender" },
        { key: "phone", label: "Phone" },
        { key: "email", label: "Email" },
      ]
    : entityType === "parents"
    ? [
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone Number" },
        { key: "studentLinked", label: "Student Linked" },
        { key: "address", label: "Address" },
      ]
    : entityType === "teachers"
    ? [
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "subjects", label: "Subject(s) Taught" },
        { key: "class_assigned", label: "Class Assigned" },
        { key: "phone", label: "Phone Number" },
        { key: "joining_date", label: "Joining Date" },
      ]
    : entityType === "recruiters"
    ? [
        { key: "company_name", label: "Company Name" },
        { key: "email", label: "Email" },
        { key: "contact_person", label: "Contact Person" },
        { key: "phone", label: "Phone Number" },
        { key: "industry_type", label: "Industry Type" },
        { key: "job_roles", label: "Job Roles Offered" },
      ]
    : [
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
      ];


  // Add button text
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

  // Apply pagination only for students
  const paginatedItems =
    entityType === "students"
      ? items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : items;

  // PDF Download Handler
  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF();
      const fileName = `${entityType}-list.pdf`;

      // Add title
      doc.text(
        `${entityType.charAt(0).toUpperCase() + entityType.slice(1)} List`,
        14,
        20
      );

      // Add table
      autoTable(doc, {
        head: [columns.map((col) => col.label)],
        body: items.map((item) => columns.map((col) => item[col.key] || "-")),
        startY: 30,
        theme: "grid",
        styles: { fontSize: 8, cellPadding: 3 },
        headStyles: { fillColor: [137, 108, 108] },
        margin: { top: 30 },
      });

      doc.save(fileName);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  // Excel Download Handler
  const handleDownloadExcel = () => {
    try {
      const fileName = `${entityType}-list.xlsx`;
      const wsData = [
        columns.map((col) => col.label), // Headers
        ...items.map((item) => columns.map((col) => item[col.key] || "-")),
      ];

      const ws = XLSX.utils.aoa_to_sheet(wsData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Data");
      XLSX.writeFile(wb, fileName);
    } catch (err) {
      console.error("Excel generation failed:", err);
      alert("Failed to generate Excel. Please try again.");
    }
  };

  // Word Download Handler
  const handleDownloadWord = async () => {
    try {
      const fileName = `${entityType}-list.docx`;

      // Table Header
      const headerRow = new DocxTableRow({
        children: columns.map(
          (col) =>
            new DocxTableCell({
              children: [new Paragraph({ text: col.label })],
            })
        ),
      });

      // Table Body
      const bodyRows = items.map(
        (item) =>
          new DocxTableRow({
            children: columns.map(
              (col) =>
                new DocxTableCell({
                  children: [new Paragraph({ text: item[col.key] || "-" })],
                })
            ),
          })
      );

      const doc = new Document({
        sections: [
          {
            children: [
              new Paragraph({
                text: `${
                  entityType.charAt(0).toUpperCase() + entityType.slice(1)
                } List`,
                heading: "Heading1",
              }),
              new DocxTable({
                rows: [headerRow, ...bodyRows],
              }),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, fileName);
    } catch (err) {
      console.error("Word generation failed:", err);
      alert("Failed to generate Word document. Please try again.");
    }
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
      {/* Header with Add button */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        sx={{ flexWrap: "wrap", gap: 1 }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600 }}></Typography>

        {/* Icons and Add button group */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          <Tooltip title="Download as PDF">
            <IconButton
              onClick={handleDownloadPDF}
              sx={{
                color: "primary.main",
              }}
            >
              <PictureAsPdfIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download as Word">
            <IconButton
              onClick={handleDownloadWord}
              sx={{
                color: "primary.main",
              }}
            >
              <DescriptionIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download as Excel">
            <IconButton
              onClick={handleDownloadExcel}
              sx={{
                color: "primary.main",
              }}
            >
              <TableChartIcon />
            </IconButton>
          </Tooltip>
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
      </Box>

      {/* Table */}
      {items.length === 0 ? (
        <Typography>No records found.</Typography>
      ) : (
        <>
          <TableContainer
            component="div"
            style={{
              width: "100%",
              maxWidth: "100%",
              overflowX: shouldScroll ? "auto" : "visible",
              WebkitOverflowScrolling: shouldScroll ? "touch" : "auto",
              border: shouldScroll ? "1px solid #e0e0e0" : "none",
              borderRadius: 1,
              boxShadow: shouldScroll ? "0 2px 4px rgba(0,0,0,0.1)" : "none",
            }}
          >
            <div style={{ width: "100%", overflowX: "auto" }}>
              <Table
                size="small"
                aria-label="entity table"
                sx={{
                  minWidth: shouldScroll ? "1200px" : "1200px",
                  tableLayout: "fixed",
                }}
              >
                <TableHead
                  sx={{
                    padding: "8px 12px",
                    height: "50px",
                  }}
                >
                  <TableRow>
                    {columns.map((col) => (
                      <TableCell
                        key={col.key}
                        sx={{
                          fontWeight: 700,
                          backgroundColor: "#896C6C",
                          width: shouldScroll ? "150px" : "auto",
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
                        backgroundColor:
                          index % 2 !== 0 ? "grey.50" : "inherit",
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
                            width: shouldScroll ? "150px" : "auto",
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
            </div>
          </TableContainer>

          {  (
            <TablePagination
              component="div"
              count={items.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[]}
              sx={{ mt: 2, px: 1 }}
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
