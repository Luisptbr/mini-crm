import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <Button variant="outlined" color="error" onClick={handleLogout}>
      Sair
    </Button>
  );
}

export default LogoutButton;
