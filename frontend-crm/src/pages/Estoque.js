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
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useEstoque } from "../hooks/useEstoque";
import api from "../services/api";

function Estoque() {
  const { data: estoque, isLoading, refetch } = useEstoque();
  const [open, setOpen] = useState(false);

  // Estados do formulário (sempre inicializados)
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [valorUnitario, setValorUnitario] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Criar ou editar item
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

      setOpen(false);
      setNome("");
      setQuantidade("");
      setValorUnitario("");
      setEditingId(null);
      refetch();
    } catch (error) {
      console.error(
        "Erro ao salvar item:",
        error.response?.data || error.message,
      );
      alert("Não foi possível salvar o item. Verifique os dados.");
    }
  };

  // Abrir modal para editar
  const handleEdit = (item) => {
    setNome(item.nome || "");
    setQuantidade(item.quantidade?.toString() || "");
    setValorUnitario(item.valorUnitario?.toString() || "");
    setEditingId(item.id);
    setOpen(true);
  };

  // Excluir item com confirmação
  const handleDelete = async (item) => {
    if (
      window.confirm(`Tem certeza que deseja excluir o item "${item.nome}"?`)
    ) {
      await api.delete(`/estoque/${item.id}`);
      refetch();
    }
  };

  const columns = [
    { field: "nome", headerName: "Nome", width: 250 },
    { field: "quantidade", headerName: "Quantidade", width: 150 },
    { field: "valorUnitario", headerName: "Valor Unitário", width: 150 },
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

      {/* Tabela */}
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={estoque || []}
          columns={columns}
          loading={isLoading}
          pageSize={5}
        />
      </Paper>

      {/* Modal */}
      <Dialog open={open} onClose={() => setOpen(false)}>
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
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Estoque;
