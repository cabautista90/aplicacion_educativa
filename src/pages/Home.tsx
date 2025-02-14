// src/pages/Home.tsx
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/global.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Container className="container">
        <Box className="card" textAlign="center">
          <Typography variant="h3" gutterBottom>
            Bienvenido a Académica Red
          </Typography>
          <Typography>
            Conéctate con estudiantes y docentes para compartir conocimientos y aprender juntos.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
            onClick={() => navigate("/login")}
          >
            Iniciar Sesión
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            style={{ marginTop: "20px", marginLeft: "10px" }}
            onClick={() => navigate("/register")}
          >
            Registrarse
          </Button>
        </Box>
      </Container>
    </>
  );
}
