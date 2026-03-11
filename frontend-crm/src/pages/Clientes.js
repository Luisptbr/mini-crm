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
import { useClientes } from "../hooks/useClientes";
import api from "../services/api";

function Clientes() {
  const { data: clientes, isLoading, refetch } = useClientes();
  const [open, setOpen] = useState(false);

  // Estados do formulário
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState(null); // ✅ controla edição

  // Criar ou editar cliente
  const handleSave = async () => {
    if (editingId) {
      await api.put(`/clientes/${editingId}`, { nome, telefone, email });
    } else {
      await api.post("/clientes", { nome, telefone, email });
    }
    setOpen(false);
    setNome("");
    setTelefone("");
    setEmail("");
    setEditingId(null);
    refetch();
  };

  // Abrir modal para editar
  const handleEdit = (cliente) => {
    setNome(cliente.nome);
    setTelefone(cliente.telefone);
    setEmail(cliente.email);
    setEditingId(cliente.id);
    setOpen(true);
  };

  // Excluir cliente
  const handleDelete = async (cliente) => {
    if (
      window.confirm(
        `Tem certeza que deseja excluir o cliente "${cliente.nome}"?`,
      )
    ) {
      await api.delete(`/clientes/${cliente.id}`);
      refetch();
    }
  };

  const columns = [
    { field: "nome", headerName: "Nome", width: 200 },
    { field: "telefone", headerName: "Telefone", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
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
        Clientes
      </Typography>
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => {
          setEditingId(null);
          setNome("");
          setTelefone("");
          setEmail("");
          setOpen(true);
        }}
      >
        Novo Cliente
      </Button>
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={clientes || []}
          columns={columns}
          loading={isLoading}
          pageSize={5}
        />
      </Paper>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {editingId ? "Editar Cliente" : "Novo Cliente"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            fullWidth
            margin="normal"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <TextField
            label="Telefone"
            fullWidth
            margin="normal"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

export default Clientes;
