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
  IconButton,
  CssBaseline,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const drawerWidth = 240;

function Layout({ children, darkMode, toggleTheme }) {
  // Recupera o usuário completo salvo no localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  // Menus
  const menuAdmin = [
    { text: "Dashboard", path: "/dashboard" },
    { text: "Usuários", path: "/usuarios" },
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
      <CssBaseline />

      {/* Barra superior */}
      <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Mini CRM
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {/* Botão de alternância de tema */}
          <IconButton onClick={toggleTheme} color="inherit">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
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
            backgroundColor: (t) => t.palette.background.default,
            color: (t) => t.palette.text.primary,
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
                sx={{
                  "&:hover": {
                    backgroundColor: (t) => t.palette.action.hover,
                  },
                  borderRadius: 1,
                  mx: 1,
                  my: 0.5,
                }}
              >
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{ variant: "subtitle1" }}
                />
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
          minHeight: "100vh",
          width: `calc(100% - ${drawerWidth}px)`,
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default Layout;
