import { Card, CardContent, Typography, LinearProgress, Box, Paper } from "@mui/material";

// export default function ProgressCard({ title, value }) {
//   return (
//     <Card
//       elevation={2}
//       sx={{
//         width: "150px",
//         height: "100%",
//       }}
//     >
//       <CardContent>
//         <Typography fontWeight="bold" mb={1}>
//           {title}
//         </Typography>

//         <Box display="flex" alignItems="center" gap={2}>
//           <Box flex={1}>
//             <LinearProgress
//               variant="determinate"
//               value={value}
//               sx={{ height: 8, borderRadius: 5 }}
//             />
//           </Box>
//           <Typography fontWeight="bold">{value}%</Typography>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// }

export default function ProgressCard({ title, value, color }) {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        width:220
      }}
    >
      <Typography fontWeight={600} mb={2}>
        {title}
      </Typography>

      <Box display="flex" alignItems="center" gap={2}>
        <Box flex={1}>
          <LinearProgress
            variant="determinate"
            value={value}
            sx={{
              height: 10,
              borderRadius: 5,
              background: "#E5E7EB",
              "& .MuiLinearProgress-bar": {
                background: color,
              },
            }}
          />
        </Box>

        <Typography fontWeight={700}>{value}%</Typography>
      </Box>
    </Paper>
  );
}


