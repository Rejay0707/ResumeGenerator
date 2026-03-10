import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  CircularProgress,
} from "@mui/material";

export default function InternshipListPage({
  internships = [],
  onApply,
  loading,
}) {
  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Available Internships
      </Typography>

      <Grid container spacing={3}>
        {internships.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card elevation={3} sx={{ height: "100%", borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {item.title}
                </Typography>

                <Typography color="text.secondary">
                  {item.company}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  📍 {item.location}
                </Typography>

                <Chip
                  label={`₹${item.stipend}`}
                  color="success"
                  size="small"
                  sx={{ mt: 1 }}
                />
              </CardContent>

              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => onApply(item.id)}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    "Apply"
                  )}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {internships.length === 0 && (
        <Typography mt={4} align="center" color="text.secondary">
          No internships available
        </Typography>
      )}
    </Box>
  );
}