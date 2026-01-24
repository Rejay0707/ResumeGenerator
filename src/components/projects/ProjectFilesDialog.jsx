import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Stack,
  Typography,
  CircularProgress,
  Link,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  uploadProjectFile,
  getProjectFiles,
} from "../../services/projectApi";

export default function ProjectFilesDialog({
  open,
  onClose,
  projectId,
}) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Fetch files when dialog opens
  useEffect(() => {
    if (open && projectId) {
      fetchFiles();
    }
  }, [open, projectId]);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const res = await getProjectFiles(projectId);
      setFiles(res.data);
    } catch (err) {
      console.error("Failed to load files", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      await uploadProjectFile(projectId, file);
      fetchFiles(); // refresh list
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
      e.target.value = ""; // reset input
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Project Files</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          {/* Upload */}
          <Button variant="outlined" component="label">
            Upload File
            <input
              hidden
              type="file"
              onChange={handleFileUpload}
            />
          </Button>

          {uploading && <CircularProgress size={24} />}

          {/* File List */}
          {loading ? (
            <CircularProgress />
          ) : files.length === 0 ? (
            <Typography color="text.secondary">
              No files uploaded yet.
            </Typography>
          ) : (
            files.map((file) => (
              <Link
                key={file.id}
                href={file.file_url}
                target="_blank"
                rel="noopener"
              >
                {file.file_name}
              </Link>
            ))
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
