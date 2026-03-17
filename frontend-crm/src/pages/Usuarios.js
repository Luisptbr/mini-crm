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
  Snackbar,
  Alert,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useUsuarios } from "../hooks/useUsuarios";
import api from "../services/api";

function Usuarios() {
  const { data: usuarios, isLoading, error, refetch } = useUsuarios();

  // Estados para modal
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Campos do formulário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER");
  const [senha, setSenha] = useState("");

  // Feedback visual
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleOpenNew = () => {
    setEditMode(false);
    setSelectedUser(null);
    setNome("");
    setEmail("");
    setRole("USER");
    setSenha("");
    setOpen(true);
  };

  const handleOpenEdit = (user) => {
    setEditMode(true);
    setSelectedUser(user);
    setNome(user.nome);
    setEmail(user.email);
    setRole(user.role);
    setSenha(""); // senha só redefine se preenchida
    setOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editMode && selectedUser) {
        await api.put(`/usuarios/${selectedUser.id}`, {
          nome,
          email,
          role,
          senha,
        });
        setSnackbar({
          open: true,
          message: "Usuário atualizado com sucesso!",
          severity: "success",
        });
      } else {
        await api.post("/usuarios", { nome, email, role, senha });
        setSnackbar({
          open: true,
          message: "Usuário criado com sucesso!",
          severity: "success",
        });
      }
      setOpen(false);
      refetch();
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Erro ao salvar usuário!",
        severity: "error",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/usuarios/${id}`);
      setSnackbar({
        open: true,
        message: "Usuário excluído com sucesso!",
        severity: "success",
      });
      refetch();
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Erro ao excluir usuário!",
        severity: "error",
      });
    }
  };

  // Apenas Nome, Email, Role e Ações
  const columns = [
    { field: "nome", headerName: "Nome", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "role", headerName: "Role", width: 150 },
    {
      field: "actions",
      headerName: "Ações",
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            size="small"
            variant="outlined"
            sx={{ mr: 1 }}
            onClick={() => handleOpenEdit(params.row)}
          >
            Editar
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => handleDelete(params.row.id)}
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
        Usuários
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={handleOpenNew}
      >
        Novo Usuário
      </Button>

      <Paper sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={usuarios || []}
          columns={columns}
          loading={isLoading}
          pageSize={10}
          disableSelectionOnClick
          getRowId={(row) => row.id} // garante que o DataGrid use o id internamente
        />
      </Paper>

      {/* Modal de cadastro/edição */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {editMode ? "Editar Usuário" : "Novo Usuário"}
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
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Role (USER/ADMIN)"
            fullWidth
            margin="normal"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <TextField
            label="Senha"
            type="password"
            fullWidth
            margin="normal"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
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
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>

      {/* Tratamento de erro global */}
      {error && <Alert severity="error">{error.message}</Alert>}
    </Container>
  );
}

export default Usuarios;
