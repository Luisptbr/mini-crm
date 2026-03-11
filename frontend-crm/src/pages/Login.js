import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Container, Typography } from "@mui/material";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await api.post("/auth/login", { email, senha });

      // salva token e role
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role); // <-- ESSENCIAL

      navigate("/dashboard");
    } catch (error) {
      alert("Login inválido");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Senha"
        type="password"
        fullWidth
        margin="normal"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <Button variant="contained" onClick={handleLogin}>Entrar</Button>
    </Container>
  );
}

export default Login;
