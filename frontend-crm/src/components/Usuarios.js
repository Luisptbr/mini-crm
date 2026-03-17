import { useEffect, useState } from "react";
import {
  List,
  ListItem,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/usuarios", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar usuários");
        return res.json();
      })
      .then((json) => setUsuarios(json))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (usuarios.length === 0)
    return <Typography>Nenhum usuário encontrado.</Typography>;

  return (
    <List>
      {usuarios.map((u) => (
        <ListItem key={u.id}>
          <Typography>
            {u.nome} - {u.email} ({u.role})
          </Typography>
        </ListItem>
      ))}
    </List>
  );
}

export default Usuarios;
