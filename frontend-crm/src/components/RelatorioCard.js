import { Paper, Typography, Box } from "@mui/material";

function RelatorioCard({ title, value, icon }) {
  return (
    <Paper
      sx={{
        p: 2,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ fontSize: 40, mb: 1 }}>{icon}</Box>
      <Typography variant="subtitle1" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h6">{value}</Typography>
    </Paper>
  );
}

export default RelatorioCard;
