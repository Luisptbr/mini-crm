import { Paper, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function DashboardCard({ title, value, icon, color, sx }) {
  const theme = useTheme();

  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        textAlign: "center",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
        },
        backgroundColor: theme.palette.background.paper,
        width: "100%", // ocupa toda a largura disponível
        maxWidth: "100%", // não limita horizontalmente
        ...sx, // permite sobrescrever estilos externamente
      }}
    >
      <Box
        sx={{
          mb: 2,
          color: color || theme.palette.primary.main,
          display: "flex",
          justifyContent: "center",
          fontSize: "2rem", // ícone maior
        }}
      >
        {icon}
      </Box>
      <Typography
        variant="subtitle1"
        sx={{ color: theme.palette.text.secondary }}
      >
        {title}
      </Typography>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          color: theme.palette.text.primary,
          wordBreak: "break-word", // evita quebra feia em títulos grandes
        }}
      >
        {value}
      </Typography>
    </Paper>
  );
}

export default DashboardCard;
