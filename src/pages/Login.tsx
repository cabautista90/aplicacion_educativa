
import { Container, Typography, Button, Box, TextField, Card } from "@mui/material";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import "../styles/global.css";

export default function Home() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext)!;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u: any) => u.username === username && u.password === password);
    if (user) {
      login(user.username, user.role);
      navigate("/posts");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

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
        <Card className="login-card" style={{ padding: "20px", marginTop: "30px" }}>
          <Typography variant="h5" gutterBottom>Iniciar Sesión</Typography>
          {error && <Typography color="error">{error}</Typography>}
          <TextField 
            label="Usuario" 
            fullWidth 
            margin="normal" 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <TextField 
            label="Contraseña" 
            type="password" 
            fullWidth 
            margin="normal" 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            style={{ marginTop: "20px" }}
            onClick={handleLogin}
          >
            Iniciar Sesión
          </Button>
        </Card>
      </Container>
    </>
  );
}
