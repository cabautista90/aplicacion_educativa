import { Container, Typography, Button, Card, CardContent, CardActions, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserManagement() {
  const { user } = useContext(AuthContext)!;
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(storedUsers);
  }, []);

  const deleteUser = (username: string) => {
    const updatedUsers = users.filter((u) => u.username !== username);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    toast.success("Usuario eliminado");
  };

  if (user?.role !== "Administrador") {
    return (
      <Container>
        <Typography variant="h3" gutterBottom>
          Acceso denegado
        </Typography>
        <Typography>
          Solo los administradores pueden acceder a esta página.
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Gestión de Usuarios
      </Typography>
      {users.map((user) => (
        <Card key={user.username} style={{ marginTop: "20px", padding: "10px" }}>
          <CardContent>
            <Typography variant="body1">Usuario: {user.username}</Typography>
            <Typography variant="body2">Rol: {user.role}</Typography>
          </CardContent>
          <CardActions>
            <IconButton onClick={() => deleteUser(user.username)}>
              <Delete color="error" />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </Container>
  );
}