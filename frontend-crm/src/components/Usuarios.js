import { useEffect, useState } from "react";
import { List, ListItem, Typography } from "@mui/material";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/usuarios", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => setUsuarios(json))
      .catch((err) => console.error("Erro ao carregar usuários:", err));
  }, []);

  if (usuarios.length === 0)
    return <Typography>Nenhum usuário encontrado.</Typography>;

  return (
    <List>
      {usuarios.map((u) => (
        <ListItem key={u.id}>
          <Typography>
            {u.nome} - {u.email}
          </Typography>
        </ListItem>
      ))}
    </List>
  );
}

export default Usuarios;
