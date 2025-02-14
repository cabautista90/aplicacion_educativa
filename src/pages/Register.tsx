import { Container, Typography, Button, Box, TextField, Card, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import { toast, ToastContainer } from "react-toastify"; // Importar ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Estilos de Toastify
import "../styles/global.css";

export default function Home() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext)!;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Publicador"); // Estado para el rol

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u: any) => u.username === username && u.password === password);
    if (user) {
      login(user.username, user.role);
      toast.success("Inicio de sesión exitoso");
      navigate("/posts");
    } else {
      toast.error("Usuario o contraseña incorrectos");
    }
  };

  const handleRegister = () => {
    if (!username || !password) {
      toast.warn("Por favor, completa todos los campos");
      return;
    }

    // Validación de usuario (mínimo 8 caracteres)
    if (username.length < 8) {
      toast.error("El nombre de usuario debe tener al menos 8 caracteres");
      return;
    }

    // Validación de contraseña (mínimo 8 caracteres, al menos una mayúscula, y al menos un carácter especial)
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error("La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial");
      return;
    }

    // Si todo está bien, se registra el usuario
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push({ username, password, role }); // Usa el rol seleccionado
    localStorage.setItem("users", JSON.stringify(users));
    toast.success("Registro exitoso, ahora puedes iniciar sesión");
    navigate("/login");
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
          <Typography variant="h5" gutterBottom>Registro</Typography>
          <TextField 
            label="Usuario" 
            fullWidth 
            margin="normal" 
            onChange={(e) => setUsername(e.target.value)} 
            value={username}
          />
          <TextField 
            label="Contraseña" 
            type="password" 
            fullWidth 
            margin="normal" 
            onChange={(e) => setPassword(e.target.value)} 
            value={password}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Rol</InputLabel>
            <Select 
              value={role} // Vincula el valor del select con el estado
              onChange={(e) => setRole(e.target.value)} // Actualiza el estado cuando cambia el rol
            >
              <MenuItem value="Publicador">Publicador</MenuItem>
              <MenuItem value="Administrador">Administrador</MenuItem>
            </Select>
          </FormControl>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            style={{ marginTop: "20px" }}
            onClick={handleRegister}
          >
            Registrarse
          </Button>
        </Card>
      </Container>
      <ToastContainer />
    </>
  );
}
