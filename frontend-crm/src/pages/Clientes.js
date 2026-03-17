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
import { useClientes } from "../hooks/useClientes";
import api from "../services/api";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Função utilitária para formatar telefone
const formatarTelefone = (valor) => {
  if (!valor) return "";
  const apenasNumeros = valor.replace(/\D/g, "").slice(0, 11);

  if (apenasNumeros.length <= 2) return apenasNumeros;
  if (apenasNumeros.length <= 7) {
    return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2)}`;
  }
  return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2, 7)}-${apenasNumeros.slice(7)}`;
};

function Clientes() {
  const { data: clientes, isLoading, refetch } = useClientes();
  const [open, setOpen] = useState(false);

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleSave = async () => {
    if (editingId) {
      await api.put(`/clientes/${editingId}`, { nome, telefone, email });
    } else {
      await api.post("/clientes", { nome, telefone, email });
    }
    handleClose();
    refetch();
  };

  const handleEdit = (cliente) => {
    setNome(cliente.nome);
    setTelefone(formatarTelefone(cliente.telefone));
    setEmail(cliente.email);
    setEditingId(cliente.id);
    setOpen(true);
  };

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

  const handleClose = () => {
    setOpen(false);
    setNome("");
    setTelefone("");
    setEmail("");
    setEditingId(null);
  };

  const columns = [
    { field: "nome", headerName: "Nome", width: 200 },
    { field: "telefone", headerName: "Telefone", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
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
          autoHeight
          rows={clientes || []}
          columns={columns}
          loading={isLoading}
          pageSize={10}
          pagination
          rowsPerPageOptions={[10, 25, 50, 100]}
        />
      </Paper>
      <Dialog open={open} onClose={handleClose}>
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
            onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
            inputProps={{ inputMode: "numeric" }}
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
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Clientes;
