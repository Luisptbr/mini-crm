import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemText,
  Box,
  ListItemButton,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const drawerWidth = 240;

function Layout({ children }) {
  const role = localStorage.getItem("role");

  const menuAdmin = [
    { text: "Dashboard", path: "/dashboard" },
    { text: "Usuários", path: "/usuarios" },
    { text: "Relatórios", path: "/relatorios" },
  ];

  const menuUser = [
    { text: "Dashboard", path: "/dashboard" },
    { text: "Clientes", path: "/clientes" },
    { text: "Pedidos", path: "/pedidos" },
    { text: "Estoque", path: "/estoque" },
    { text: "Movimentações", path: "/movimentacoes" },
    { text: "Relatórios", path: "/relatorios" },
  ];

  const menu = role === "ADMIN" ? menuAdmin : menuUser;

  return (
    <Box sx={{ display: "flex" }}>
      {/* Barra superior */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#1976d2",
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Mini CRM
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {/* Botão de sair no topo */}
          <LogoutButton />
        </Toolbar>
      </AppBar>

      {/* Menu lateral */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {menu.map((item) => (
              <ListItemButton
                key={item.text}
                component={Link}
                to={item.path}
                sx={{ "&:hover": { backgroundColor: "#f0f0f0" } }}
              >
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>

      {/* Conteúdo principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: `${drawerWidth}px`,
          backgroundColor: "#fafafa",
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default Layout;
