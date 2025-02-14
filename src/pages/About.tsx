import { Container, Typography, Grid, Card, CardContent, Avatar, Box } from "@mui/material";
import { styled } from "@mui/system";
import "../styles/global.css";

// Estilo personalizado para los Cards de los miembros del equipo
const TeamCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  textAlign: 'center',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  backgroundColor: '#f5f5f5',
});

const About = () => {
  return (
    <Container maxWidth="lg" style={{ marginTop: '30px' }}>
      <Typography variant="h3" gutterBottom align="center" color="primary">
        Acerca de Nosotros
      </Typography>

      <Typography variant="body1" paragraph align="center">
        Este proyecto fue desarrollado con <strong>React</strong>, <strong>TypeScript</strong> y <strong>Material UI</strong>. Nuestro objetivo es crear una plataforma accesible y eficiente para la interacción académica, mejorando la comunicación entre estudiantes y docentes.
      </Typography>

      <Typography variant="h5" gutterBottom align="center" color="secondary">
        Integrantes del Equipo
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <TeamCard>
            <Avatar alt="Integrante 1" src="/path/to/avatar1.jpg" sx={{ width: 80, height: 80 }} />
            <CardContent>
              <Typography variant="h6">Juan Pérez</Typography>
              <Typography variant="body2" color="textSecondary">
                Líder de Proyecto | Frontend Developer
              </Typography>
            </CardContent>
          </TeamCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TeamCard>
            <Avatar alt="Integrante 2" src="/path/to/avatar2.jpg" sx={{ width: 80, height: 80 }} />
            <CardContent>
              <Typography variant="h6">Ana García</Typography>
              <Typography variant="body2" color="textSecondary">
                Backend Developer | API Integration
              </Typography>
            </CardContent>
          </TeamCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TeamCard>
            <Avatar alt="Integrante 3" src="/path/to/avatar3.jpg" sx={{ width: 80, height: 80 }} />
            <CardContent>
              <Typography variant="h6">Carlos Martínez</Typography>
              <Typography variant="body2" color="textSecondary">
                UI/UX Designer | Material UI Specialist
              </Typography>
            </CardContent>
          </TeamCard>
        </Grid>
      </Grid>

      <Box mt={6} textAlign="center">
        <Typography variant="body1" color="textSecondary">
          Si tienes alguna pregunta o sugerencia, no dudes en contactarnos.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
