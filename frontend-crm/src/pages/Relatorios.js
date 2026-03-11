import { Container, Typography, Paper } from "@mui/material";

function Relatorios() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>Relatórios</Typography>
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography>
          Aqui você poderá visualizar relatórios de clientes, pedidos e estoque.
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Em breve: gráficos e estatísticas detalhadas.
        </Typography>
      </Paper>
    </Container>
  );
}

export default Relatorios;
