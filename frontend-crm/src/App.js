import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/Clientes";
import Pedidos from "./pages/Pedidos";
import Estoque from "./pages/Estoque";
import Movimentacoes from "./pages/Movimentacoes";
import Relatorios from "./pages/Relatorios";
import Usuarios from "./pages/Usuarios";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: darkMode ? "#90caf9" : "#1976d2" },
      secondary: { main: darkMode ? "#f48fb1" : "#d32f2f" },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* Redireciona raiz para login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Login fora do Layout */}
          <Route
            path="/login"
            element={<Login toggleTheme={toggleTheme} darkMode={darkMode} />}
          />

          {/* Rotas protegidas com Layout */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute roles={["USER", "ADMIN"]}>
                <Layout toggleTheme={toggleTheme} darkMode={darkMode}>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/clientes"
            element={
              <PrivateRoute roles={["USER"]}>
                <Layout toggleTheme={toggleTheme} darkMode={darkMode}>
                  <Clientes />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/pedidos"
            element={
              <PrivateRoute roles={["USER"]}>
                <Layout toggleTheme={toggleTheme} darkMode={darkMode}>
                  <Pedidos />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/estoque"
            element={
              <PrivateRoute roles={["USER"]}>
                <Layout toggleTheme={toggleTheme} darkMode={darkMode}>
                  <Estoque />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/movimentacoes"
            element={
              <PrivateRoute roles={["USER"]}>
                <Layout toggleTheme={toggleTheme} darkMode={darkMode}>
                  <Movimentacoes />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/relatorios"
            element={
              <PrivateRoute roles={["USER"]}>
                <Layout toggleTheme={toggleTheme} darkMode={darkMode}>
                  <Relatorios />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/usuarios"
            element={
              <PrivateRoute roles={["ADMIN"]}>
                <Layout toggleTheme={toggleTheme} darkMode={darkMode}>
                  <Usuarios />
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
