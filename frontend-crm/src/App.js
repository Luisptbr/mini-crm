import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/Clientes";
import Pedidos from "./pages/Pedidos";
import Estoque from "./pages/Estoque";
import Movimentacoes from "./pages/Movimentacoes";
import Relatorios from "./pages/Relatorios";
import Usuarios from "./pages/Usuarios";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout"; // importa o Layout

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redireciona raiz para login */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />

        {/* USER e ADMIN podem acessar o Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute roles={["USER", "ADMIN"]}>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />

        {/* Rotas de USER */}
        <Route
          path="/clientes"
          element={
            <PrivateRoute roles={["USER"]}>
              <Layout>
                <Clientes />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/pedidos"
          element={
            <PrivateRoute roles={["USER"]}>
              <Layout>
                <Pedidos />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/estoque"
          element={
            <PrivateRoute roles={["USER"]}>
              <Layout>
                <Estoque />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/movimentacoes"
          element={
            <PrivateRoute roles={["USER"]}>
              <Layout>
                <Movimentacoes />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/relatorios"
          element={
            <PrivateRoute roles={["USER"]}>
              <Layout>
                <Relatorios />
              </Layout>
            </PrivateRoute>
          }
        />
        {/* Rotas de ADMIN */}
        <Route
          path="/usuarios"
          element={
            <PrivateRoute roles={["ADMIN"]}>
              <Layout>
                <Usuarios />
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
