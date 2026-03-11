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
import { useMovimentacoes } from "../hooks/useMovimentacoes";
import api from "../services/api";

function Movimentacoes() {
  const { data: movimentacoes, isLoading, refetch } = useMovimentacoes();
  const [open, setOpen] = useState(false);
  const [tipo, setTipo] = useState("");
  const [produtoId, setProdutoId] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const handleAdd = async () => {
    await api.post("/movimentacoes", { tipo, produtoId, quantidade });
    setOpen(false);
    setTipo("");
    setProdutoId("");
    setQuantidade("");
    refetch();
  };

  const columns = [
    { field: "tipo", headerName: "Tipo", width: 150 },
    { field: "produtoId", headerName: "Produto", width: 200 },
    { field: "quantidade", headerName: "Quantidade", width: 150 },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Movimentações
      </Typography>
      <Button variant="contained" sx={{ mb: 2 }} onClick={() => setOpen(true)}>
        Nova Movimentação
      </Button>
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={movimentacoes || []}
          columns={columns}
          loading={isLoading}
          pageSize={5}
        />
      </Paper>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Nova Movimentação</DialogTitle>
        <DialogContent>
          <TextField
            label="Tipo (Entrada/Saída)"
            fullWidth
            margin="normal"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          />
          <TextField
            label="Produto ID"
            fullWidth
            margin="normal"
            value={produtoId}
            onChange={(e) => setProdutoId(e.target.value)}
          />
          <TextField
            label="Quantidade"
            fullWidth
            margin="normal"
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleAdd} variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Movimentacoes;
