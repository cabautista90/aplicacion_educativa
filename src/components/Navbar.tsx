import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, cursor: "pointer" }} onClick={() => navigate("/")}>
          Académica Red
        </Typography>
        <Button color="inherit" onClick={() => navigate("/about")}>Acerca de</Button> {/* Nuevo botón */}
        <Button color="inherit" onClick={() => navigate("/login")}>Iniciar Sesión</Button>
        <Button color="inherit" onClick={() => navigate("/register")}>Registrarse</Button>
      </Toolbar>
    </AppBar>
  );
}
