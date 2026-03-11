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
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { usePedidos } from "../hooks/usePedidos";
import { useClientes } from "../hooks/useClientes";
import api from "../services/api";

function Pedidos() {
  const { data: pedidos, isLoading, refetch } = usePedidos();
  const { data: clientes } = useClientes();
  const [open, setOpen] = useState(false);

  // Estados do formulário
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [status, setStatus] = useState("");
  const [clienteId, setClienteId] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Criar ou editar pedido
  const handleSave = async () => {
    try {
      if (editingId) {
        // Atualiza todos os campos com os valores atuais
        const payload = {
          descricao,
          valor: Number(valor),
          status,
          clienteId,
        };
        await api.put(`/pedidos/${editingId}`, payload);
      } else {
        // Criação de novo pedido
        await api.post(`/pedidos/${clienteId}`, {
          descricao,
          valor: Number(valor),
          status,
        });
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

  // Abrir modal para editar
  const handleEdit = (pedido) => {
    setDescricao(pedido.descricao || "");
    setValor(pedido.valor?.toString() || "");
    setStatus(pedido.status || "");
    setClienteId(pedido.cliente?.id || "");
    setEditingId(pedido.id);
    setOpen(true);
  };

  // Excluir pedido com confirmação
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

  // Resetar estados e devolver foco ao botão principal
  const handleClose = () => {
    setOpen(false);
    setDescricao("");
    setValor("");
    setStatus("");
    setClienteId("");
    setEditingId(null);
    document.getElementById("novo-pedido-btn")?.focus();
  };

  // Mapeia pedidos para incluir nome do cliente e valor formatado
  const pedidosComCliente = pedidos?.map((pedido) => ({
    ...pedido,
    clienteNome: pedido.cliente?.nome || "Cliente não encontrado",
    valorFormatado: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(pedido.valor || 0),
  }));

  const columns = [
    { field: "descricao", headerName: "Descrição", width: 250 },
    { field: "valorFormatado", headerName: "Valor", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "clienteNome", headerName: "Cliente", width: 200 },
    {
      field: "actions",
      headerName: "Ações",
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => handleEdit(params.row)}
            sx={{ mr: 1 }}
          >
            Editar
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDelete(params.row)}
          >
            Excluir
          </Button>
        </>
      ),
    },
  ];

  const statusOptions = [
    "Em análise",
    "Aprovado",
    "Em produção",
    "Instalação",
    "Finalizado",
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
          rows={pedidosComCliente || []}
          columns={columns}
          loading={isLoading}
          pageSize={5}
        />
      </Paper>
      <Dialog
        open={open}
        onClose={handleClose}
        disableEnforceFocus
        disableRestoreFocus
      >
        <DialogTitle>{editingId ? "Editar Pedido" : "Novo Pedido"}</DialogTitle>
        <DialogContent>
          <TextField
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
