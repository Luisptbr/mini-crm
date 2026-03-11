import { Paper, Typography } from "@mui/material";

function DashboardCard({ title, value }) {
  return (
    <Paper sx={{ p: 3, textAlign: "center" }}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h4">{value}</Typography>
    </Paper>
  );
}

export default DashboardCard;
