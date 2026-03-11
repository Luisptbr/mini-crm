import { Grid } from "@mui/material";
import DashboardCard from "./DashboardCard";
import { useClientes } from "../hooks/useClientes";
import { usePedidos } from "../hooks/usePedidos";
import { useEstoque } from "../hooks/useEstoque";

function Dashboard() {
  const { data: clientes } = useClientes();
  const { data: pedidos } = usePedidos();
  const { data: estoque } = useEstoque();

  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      <Grid item xs={12} md={4}>
        <DashboardCard title="Clientes" value={clientes?.length || 0} />
      </Grid>
      <Grid item xs={12} md={4}>
        <DashboardCard title="Pedidos" value={pedidos?.length || 0} />
      </Grid>
      <Grid item xs={12} md={4}>
        <DashboardCard title="Itens em Estoque" value={estoque?.length || 0} />
      </Grid>
    </Grid>
  );
}

export default Dashboard;
