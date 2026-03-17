import { Container, Typography, Grid, Paper } from "@mui/material";
import RelatorioCard from "../components/RelatorioCard";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { useRelatorios } from "../hooks/useRelatorios";

function Relatorios() {
  const { data: relatorio, isLoading, isError } = useRelatorios();
  const cores = ["#4caf50", "#2196f3", "#ff9800", "#9c27b0", "#f44336"];

  if (isLoading) return <Typography>Carregando relatório...</Typography>;
  if (isError)
    return <Typography color="error">Erro ao carregar relatório</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Relatórios
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <RelatorioCard title="Clientes" value={relatorio.clientes} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <RelatorioCard title="Pedidos" value={relatorio.pedidos} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <RelatorioCard title="Estoque" value={relatorio.estoque} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <RelatorioCard
            title="Faturamento Realizado"
            value={`R$ ${relatorio.faturamentoRealizado.toFixed(2)}`}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <RelatorioCard
            title="A Receber"
            value={`R$ ${relatorio.faturamentoPrevisto.toFixed(2)}`}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <RelatorioCard
            title="Custo Estoque"
            value={`R$ ${relatorio.custoEstoque.toFixed(2)}`}
          />
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Pedidos por Status
        </Typography>
        <PieChart width={400} height={300}>
          <Pie
            data={relatorio.pedidosPorStatus}
            dataKey="total"
            nameKey="status"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {relatorio.pedidosPorStatus.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </Paper>

      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Faturamento
        </Typography>
        <BarChart
          width={500}
          height={300}
          data={[
            { name: "Realizado", valor: relatorio.faturamentoRealizado },
            { name: "A Receber", valor: relatorio.faturamentoPrevisto },
          ]}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="valor" fill="#2196f3" />
        </BarChart>
      </Paper>
    </Container>
  );
}

export default Relatorios;
