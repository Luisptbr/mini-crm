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
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useEstoque } from "../hooks/useEstoque";
import api from "../services/api";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Estoque() {
  const { data: estoque, isLoading, refetch } = useEstoque();
  const [open, setOpen] = useState(false);

  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [valorUnitario, setValorUnitario] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleSave = async () => {
    try {
      const payload = {
        nome,
        quantidade: Number(quantidade) || 0,
        valorUnitario: Number(valorUnitario) || 0,
      };

      if (editingId) {
        await api.put(`/estoque/${editingId}`, payload);
      } else {
        await api.post("/estoque", payload);
      }

      handleClose();
      refetch();
    } catch (error) {
      console.error(
        "Erro ao salvar item:",
        error.response?.data || error.message,
      );
      alert("Não foi possível salvar o item. Verifique os dados.");
    }
  };

  const handleEdit = (item) => {
    setNome(item.nome || "");
    setQuantidade(item.quantidade?.toString() || "");
    setValorUnitario(item.valorUnitario?.toString() || "");
    setEditingId(item.id);
    setOpen(true);
  };

  const handleDelete = async (item) => {
    if (
      window.confirm(`Tem certeza que deseja excluir o item "${item.nome}"?`)
    ) {
      await api.delete(`/estoque/${item.id}`);
      refetch();
    }
  };

  const handleClose = () => {
    setOpen(false);
    setNome("");
    setQuantidade("");
    setValorUnitario("");
    setEditingId(null);
  };

  // Mapeia estoque para incluir valor formatado
  const estoqueComFormatado = estoque?.map((item) => ({
    ...item,
    valorFormatado: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(item.valorUnitario || 0),
  }));

  const columns = [
    { field: "nome", headerName: "Nome", width: 250 },
    { field: "quantidade", headerName: "Quantidade", width: 150 },
    { field: "valorFormatado", headerName: "Valor Unitário", width: 150 },
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
        Estoque
      </Typography>
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => {
          setEditingId(null);
          setNome("");
          setQuantidade("");
          setValorUnitario("");
          setOpen(true);
        }}
      >
        Novo Item
      </Button>

      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          autoHeight
          rows={estoqueComFormatado || []}
          columns={columns}
          loading={isLoading}
          pageSize={10}
          pagination
          rowsPerPageOptions={[10, 25, 50, 100]}
        />
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingId ? "Editar Item" : "Novo Item"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            fullWidth
            margin="normal"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <TextField
            label="Quantidade"
            fullWidth
            margin="normal"
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />
          <TextField
            label="Valor Unitário"
            fullWidth
            margin="normal"
            type="number"
            value={valorUnitario}
            onChange={(e) => setValorUnitario(e.target.value)}
          />
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

export default Estoque;
