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
      return "warning.main"; // amarelo
    case "Aprovado":
    case "Em Produção":
    case "Instalação":
      return "primary.main"; // azul
    case "Finalizado":
      return "success.main"; // verde
    case "Reprovado":
    case "Cancelado":
      return "error.main"; // vermelho
    default:
      return "text.primary"; // cor padrão
  }
};

function Pedidos() {
  const { data: pedidos, isLoading, refetch } = usePedidos();
  const { data: clientes } = useClientes();
  const [open, setOpen] = useState(false);

  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [status, setStatus] = useState("");
  const [clienteId, setClienteId] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleSave = async () => {
    try {
      if (editingId) {
        const payload = {
          descricao,
          valor: Number(valor),
          status,
          cliente: { id: clienteId },
        };
        await api.put(`/pedidos/${editingId}`, payload);
      } else {
        const payload = {
          descricao,
          valor: Number(valor),
          status,
        };
        await api.post(`/pedidos/${clienteId}`, payload);
      }
      handleClose();
      refetch();
    } catch (error) {
      console.error(
        "Erro ao salvar pedido:",
        error.response?.data || error.message,
      );
      alert("Não foi possível salvar o pedido. Verifique os dados.");
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
      await api.delete(`/pedidos/${pedido.id}`);
      refetch();
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

  const pedidosComCliente = pedidos?.map((pedido) => ({
    ...pedido,
    clienteNome: pedido.cliente?.nome || "Cliente não encontrado",
    valorFormatado: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(pedido.valor || 0),
  }));

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
              alert("Erro ao atualizar status. Verifique o backend.");
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
          rows={pedidosComCliente || []}
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
            {clientes?.map((cliente) => (
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
    </Container>
  );
}

export default Pedidos;
