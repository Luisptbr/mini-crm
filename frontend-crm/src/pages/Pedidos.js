import {
  Container,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  MenuItem,
  IconButton,
  Alert,
  Snackbar,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { usePedidos } from "../hooks/usePedidos";
import { useClientes } from "../hooks/useClientes";
import api from "../services/api";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Função utilitária para definir cores dos status
const getStatusColor = (status) => {
  switch (status) {
    case "Em Análise":
      return "warning.main";
    case "Aprovado":
    case "Em Produção":
    case "Instalação":
      return "primary.main";
    case "Finalizado":
      return "success.main";
    case "Reprovado":
    case "Cancelado":
      return "error.main";
    default:
      return "text.primary";
  }
};

function Pedidos() {
  const { data: pedidos, isLoading, error, refetch } = usePedidos();
  const { data: clientes } = useClientes();

  const [open, setOpen] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [status, setStatus] = useState("");
  const [clienteId, setClienteId] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSave = async () => {
    try {
      const payload = {
        descricao,
        valor: Number(valor),
        status,
        cliente: { id: clienteId },
      };

      if (editingId) {
        await api.put(`/pedidos/${editingId}`, payload);
        setSnackbar({
          open: true,
          message: "Pedido atualizado com sucesso!",
          severity: "success",
        });
      } else {
        await api.post(`/pedidos/${clienteId}`, payload);
        setSnackbar({
          open: true,
          message: "Pedido criado com sucesso!",
          severity: "success",
        });
      }

      handleClose();
      refetch();
    } catch (error) {
      console.error(
        "Erro ao salvar pedido:",
        error.response?.data || error.message,
      );
      setSnackbar({
        open: true,
        message: "Erro ao salvar pedido!",
        severity: "error",
      });
    }
  };

  const handleEdit = (pedido) => {
    setDescricao(pedido.descricao || "");
    setValor(pedido.valor?.toString() || "");
    setStatus(pedido.status || "");
    setClienteId(pedido.cliente?.id || "");
    setEditingId(pedido.id);
    setOpen(true);
  };

  const handleDelete = async (pedido) => {
    if (
      window.confirm(
        `Tem certeza que deseja excluir o pedido "${pedido.descricao}"?`,
      )
    ) {
      try {
        await api.delete(`/pedidos/${pedido.id}`);
        setSnackbar({
          open: true,
          message: "Pedido excluído com sucesso!",
          severity: "success",
        });
        refetch();
      } catch (error) {
        console.error(
          "Erro ao excluir pedido:",
          error.response?.data || error.message,
        );
        setSnackbar({
          open: true,
          message: "Erro ao excluir pedido!",
          severity: "error",
        });
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    setDescricao("");
    setValor("");
    setStatus("");
    setClienteId("");
    setEditingId(null);
    document.getElementById("novo-pedido-btn")?.focus();
  };

  // Garante que pedidos seja sempre array
  const pedidosComCliente = Array.isArray(pedidos)
    ? pedidos.map((pedido) => ({
        ...pedido,
        clienteNome: pedido.cliente?.nome || "Cliente não encontrado",
        valorFormatado: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(pedido.valor || 0),
      }))
    : [];

  const statusOptions = [
    "Em Análise",
    "Aprovado",
    "Reprovado",
    "Cancelado",
    "Em Produção",
    "Instalação",
    "Finalizado",
  ];

  const columns = [
    { field: "descricao", headerName: "Descrição", width: 250 },
    { field: "valorFormatado", headerName: "Valor", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 180,
      renderCell: (params) => (
        <TextField
          select
          size="small"
          value={params.row.status}
          onChange={async (e) => {
            const novoStatus = e.target.value;
            try {
              await api.put(`/pedidos/${params.row.id}`, {
                descricao: params.row.descricao,
                valor: params.row.valor,
                status: novoStatus,
                cliente: { id: params.row.cliente?.id },
              });
              refetch();
            } catch (error) {
              console.error(
                "Erro ao atualizar status:",
                error.response?.data || error.message,
              );
              setSnackbar({
                open: true,
                message: "Erro ao atualizar status!",
                severity: "error",
              });
            }
          }}
          sx={{
            "& .MuiSelect-select": {
              color: getStatusColor(params.row.status),
              fontWeight: "bold",
            },
          }}
        >
          {statusOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      ),
    },
    { field: "clienteNome", headerName: "Cliente", width: 200 },
    {
      field: "actions",
      headerName: "Ações",
      width: 120,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            size="small"
            onClick={() => handleEdit(params.row)}
            sx={{ mr: 1 }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            size="small"
            onClick={() => handleDelete(params.row)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Pedidos
      </Typography>
      <Button
        id="novo-pedido-btn"
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => {
          setEditingId(null);
          setDescricao("");
          setValor("");
          setStatus("");
          setClienteId("");
          setOpen(true);
        }}
      >
        Novo Pedido
      </Button>
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          autoHeight
          rows={pedidosComCliente}
          columns={columns}
          loading={isLoading}
          pageSize={10}
          pagination
          rowsPerPageOptions={[10, 25, 50, 100]}
        />
      </Paper>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingId ? "Editar Pedido" : "Novo Pedido"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Descrição"
            fullWidth
            margin="normal"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          <TextField
            label="Valor"
            fullWidth
            margin="normal"
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />
          <TextField
            select
            label="Status"
            fullWidth
            margin="normal"
            value={status || ""}
            onChange={(e) => setStatus(e.target.value)}
            sx={{
              "& .MuiSelect-select": {
                color: getStatusColor(status),
                fontWeight: "bold",
              },
            }}
          >
            {statusOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Cliente"
            fullWidth
            margin="normal"
            value={clienteId || ""}
            onChange={(e) => setClienteId(e.target.value)}
          >
            {Array.isArray(clientes) &&
              clientes.map((cliente) => (
                <MenuItem key={cliente.id} value={cliente.id}>
                  {cliente.nome}
                </MenuItem>
              ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar de feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Tratamento de erro global do hook usePedidos */}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error.message || "Erro ao carregar pedidos"}
        </Alert>
      )}
    </Container>
  );
}

export default Pedidos;
