import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

export default function CertificateCards({ data, onAction }) {
  return (
    <Grid container spacing={2}>
      {data.map((item) => (
        <Grid item xs={12} key={item.id}>
          <Card>
            <CardContent>
              <Typography fontWeight="bold">{item.name}</Typography>
              <Typography variant="body2">{item.issuer}</Typography>
              <Typography variant="caption">{item.issueDate}</Typography>

              <Button
                fullWidth
                size="small"
                sx={{ mt: 1 }}
                variant="outlined"
                onClick={() => onAction(item)}
              >
                View
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
