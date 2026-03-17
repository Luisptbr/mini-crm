import { useEffect, useState } from "react";
import { Grid, Typography, Paper, Box } from "@mui/material";
import DashboardCard from "../components/DashboardCard";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Token não encontrado. Faça login novamente.");
      return;
    }

    fetch("http://localhost:8080/dashboard", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Erro ${response.status}: não foi possível carregar o dashboard`,
          );
        }
        return response.json();
      })
      .then((json) => setData(json))
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!data) {
    return <Typography>Carregando...</Typography>;
  }

  // Dados para o gráfico de pizza
  const chartData = [
    { name: "Clientes", value: data.totalClientes },
    { name: "Pedidos", value: data.totalPedidos },
    { name: "Estoque", value: data.totalEstoque },
  ];

  const COLORS = ["#1976d2", "#d81b60", "#2e7d32"]; // azul, rosa, verde

  return (
    <>
      {/* Container 1 - Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <DashboardCard
            title="Clientes"
            value={data.totalClientes}
            icon={<PeopleIcon fontSize="large" />}
            color="primary.main"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <DashboardCard
            title="Pedidos"
            value={data.totalPedidos}
            icon={<ShoppingCartIcon fontSize="large" />}
            color="secondary.main"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <DashboardCard
            title="Estoque"
            value={data.totalEstoque}
            icon={<InventoryIcon fontSize="large" />}
            color="success.main"
          />
        </Grid>
      </Grid>

      {/* Container 2 - Gráfico de Pizza */}
      <Box sx={{ width: "100%", maxWidth: "100vw", p: 3 }}>
        <Paper sx={{ p: 3, width: "100%" }}>
          <Typography variant="h6" gutterBottom>
            Distribuição Geral
          </Typography>
          <ResponsiveContainer width="100%" height={500}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%" // centraliza horizontalmente
                cy="50%" // centraliza verticalmente
                outerRadius={200} // aumenta para ocupar mais espaço lateral
                dataKey="value"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Box>
    </>
  );
}

export default Dashboard;
