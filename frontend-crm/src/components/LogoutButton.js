import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";

import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <IconButton
      color="error"
      size="small"
      startIcon={<LogoutIcon fontSize="small" />}
      onClick={handleLogout}
      sx={{ border: "1px solid", borderRadius: 2, p: 1 }}
    >
      <LogoutIcon />
    </IconButton>
  );
}

export default LogoutButton;
