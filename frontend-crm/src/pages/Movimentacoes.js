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
import { useState, useEffect } from "react";
import { useMovimentacoes } from "../hooks/useMovimentacoes";
import api from "../services/api";
import EditIcon from "@mui/icons-material/Edit";

function Movimentacoes() {
  const { data: movimentacoes = [], isLoading, refetch } = useMovimentacoes();
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [funcionario, setFuncionario] = useState("");
  const [itemId, setItemId] = useState("");
  const [quantidade, setQuantidade] = useState(1);

  const [estoque, setEstoque] = useState([]);

  useEffect(() => {
    const fetchEstoque = async () => {
      try {
        const { data } = await api.get("/estoque");
        const disponiveis = data.filter((item) => item.quantidade >= 1);
        setEstoque(disponiveis);
      } catch (error) {
        console.error(error);
        alert("Erro ao carregar estoque");
      }
    };
    fetchEstoque();
  }, []);

  const handleSave = async () => {
    try {
      if (editingId) {
        await api.put(`/movimentacao/${editingId}`, {
          funcionario,
          quantidade,
        });
      } else {
        await api.post("/movimentacao", {
          item: { id: itemId },
          funcionario,
          quantidadeRetirada: quantidade,
        });
      }
      handleClose();
      await refetch();
    } catch (error) {
      console.error(error);
      alert(error.response?.data || "Erro inesperado ao salvar movimentação");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setFuncionario("");
    setItemId("");
    setQuantidade(1);
  };

  const handleEdit = (row) => {
    setEditingId(row.id);
    setFuncionario(row.funcionario);
    setQuantidade(row.quantidade);
    setOpen(true);
  };

  const rows = movimentacoes.map((m) => ({
    id: m.id,
    funcionario: m.funcionario,
    quantidade: m.quantidade,
    produto: m.produto,
    dataFormatada: m.data ?? "—",
  }));

  const columns = [
    { field: "produto", headerName: "Item", width: 250 },
    { field: "quantidade", headerName: "Quantidade", width: 150 },
    { field: "funcionario", headerName: "Funcionário", width: 200 },
    { field: "dataFormatada", headerName: "Data", width: 150 },
    {
      field: "actions",
      headerName: "Ações",
      width: 100,
      renderCell: (params) => (
        <IconButton
          color="primary"
          size="small"
          onClick={() => handleEdit(params.row)}
        >
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Movimentações de Estoque
      </Typography>
      <Button variant="contained" sx={{ mb: 2 }} onClick={() => setOpen(true)}>
        Nova Retirada
      </Button>
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          autoHeight
          rows={rows || []}
          columns={columns}
          loading={isLoading}
          pageSize={10}
          pagination
          rowsPerPageOptions={[10, 25, 50, 100]}
        />
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editingId ? "Editar Movimentação" : "Registrar Retirada"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Funcionário"
            fullWidth
            margin="normal"
            value={funcionario}
            onChange={(e) => setFuncionario(e.target.value)}
          />

          {!editingId && (
            <TextField
              select
              label="Item"
              fullWidth
              margin="normal"
              value={itemId}
              onChange={(e) => setItemId(e.target.value)}
            >
              {estoque.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.nome} (Qtd: {item.quantidade})
                </MenuItem>
              ))}
            </TextField>
          )}

          <TextField
            label="Quantidade"
            type="number"
            fullWidth
            margin="normal"
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">
            {editingId ? "Atualizar" : "Salvar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Movimentacoes;
