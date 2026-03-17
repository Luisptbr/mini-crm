import { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import DashboardCard from "./DashboardCard";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";

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

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <DashboardCard
          title="Clientes"
          value={data.totalClientes}
          icon={<PeopleIcon fontSize="large" />}
          color="primary.main"
          sx={{ width: "100%" }} // garante largura total
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <DashboardCard
          title="Pedidos"
          value={data.totalPedidos}
          icon={<ShoppingCartIcon fontSize="large" />}
          color="secondary.main"
          sx={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <DashboardCard
          title="Estoque"
          value={data.totalEstoque}
          icon={<InventoryIcon fontSize="large" />}
          color="success.main"
          sx={{ width: "100%" }}
        />
      </Grid>
    </Grid>
  );
}

export default Dashboard;
