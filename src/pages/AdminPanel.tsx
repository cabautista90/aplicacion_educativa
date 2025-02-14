import { useState } from "react";
import { Container, Typography, List, ListItem, ListItemText, Button, Card, CardContent, Divider, Box } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { styled } from "@mui/system";
import "../styles/global.css";

// Estilo personalizado para el Card
const AdminCard = styled(Card)({
  marginTop: '20px',
  padding: '15px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  backgroundColor: '#fafafa',
});

// Estilo para los botones
const StyledButton = styled(Button)({
  backgroundColor: '#f44336',
  color: 'white',
  '&:hover': {
    backgroundColor: '#d32f2f',
  },
});

export default function AdminPanel() {
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem("users") || "[]"));

  const removeUser = (username: string) => {
    const updatedUsers = users.filter((user: any) => user.username !== username);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '30px' }}>
      <Typography variant="h3" gutterBottom align="center" color="primary">
        Panel de Administración
      </Typography>
      <Typography variant="h6" paragraph align="center" color="textSecondary">
        En este panel podrás gestionar los usuarios registrados. Puedes eliminar usuarios si es necesario.
      </Typography>
      
      <Box>
        {users.length > 0 ? (
          <List>
            {users.map((user: any) => (
              <AdminCard key={user.username}>
                <CardContent>
                  <ListItem>
                    <ListItemText primary={`${user.username} (${user.role})`} />
                    <StyledButton variant="contained" startIcon={<Delete />} onClick={() => removeUser(user.username)}>
                      Eliminar
                    </StyledButton>
                  </ListItem>
                </CardContent>
                <Divider />
              </AdminCard>
            ))}
          </List>
        ) : (
          <Typography variant="body1" align="center" color="textSecondary">
            No hay usuarios registrados.
          </Typography>
        )}
      </Box>
    </Container>
  );
}
