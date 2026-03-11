import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import Dashboard from "../components/Dashboard";

function DashboardPage() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    if (role === "ADMIN") {
      navigate("/usuarios");
    }
  }, [role, navigate]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      {role === "USER" && <Dashboard />}
    </Container>
  );
}

export default DashboardPage;
