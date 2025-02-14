import { useState, useEffect, useContext } from "react";
import { Container, Typography, TextField, Button, Card, CardContent, CardActions, IconButton, Divider, Box } from "@mui/material";
import { Favorite, Comment, Delete } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import "../styles/global.css";

// Estilo personalizado para el Card de publicaciones
const PostCard = styled(Card)({
  marginTop: '20px',
  padding: '15px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  backgroundColor: '#fafafa',
});

// Estilo para los botones
const StyledButton = styled(Button)({
  backgroundColor: '#3f51b5',
  color: 'white',
  '&:hover': {
    backgroundColor: '#303f9f',
  },
});

const AdminButton = styled(Button)({
  backgroundColor: '#f44336',
  color: 'white',
  '&:hover': {
    backgroundColor: '#d32f2f',
  },
});

const LikeButton = styled(IconButton)({
  color: '#f44336',
});

// Interfaz para las publicaciones
interface Post {
  id: number;
  content: string;
  comments: string[];
  likes: number;
}

export default function Posts() {
  const { user } = useContext(AuthContext)!;
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>(() => JSON.parse(localStorage.getItem("posts") || "[]"));
  const [newPost, setNewPost] = useState("");
  const [comment, setComment] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const addPost = () => {
    if (!newPost.trim()) {
      toast.warn("La publicación no puede estar vacía");
      return;
    }
    const newEntry = { id: Date.now(), content: newPost, comments: [], likes: 0 };
    setPosts([newEntry, ...posts]);
    setNewPost("");
    toast.success("Publicación creada con éxito");
  };

  const addComment = (postId: number) => {
    if (!comment[postId]?.trim()) {
      toast.warn("El comentario no puede estar vacío");
      return;
    }
    setPosts(posts.map((post) =>
      post.id === postId ? { ...post, comments: [...post.comments, comment[postId]] } : post
    ));
    setComment({ ...comment, [postId]: "" });
    toast.success("Comentario agregado");
  };

  const likePost = (postId: number) => {
    setPosts(posts.map((post) =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const deletePost = (postId: number) => {
    setPosts(posts.filter((post) => post.id !== postId));
    toast.success("Publicación eliminada");
  };

  const deleteComment = (postId: number, commentIndex: number) => {
    setPosts(posts.map((post) =>
      post.id === postId ? { ...post, comments: post.comments.filter((_, index) => index !== commentIndex) } : post
    ));
    toast.success("Comentario eliminado");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/"); // Redirige a la página de inicio
  };

  const navigateToAdminPanel = () => {
    navigate("/admin"); // Redirige a la página de administración
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '30px' }}>
      <Typography variant="h3" gutterBottom align="center" color="primary">
        Publicaciones
      </Typography>
      <Typography variant="h6" paragraph align="center" color="textSecondary">
        Comparte tus pensamientos y comenta en las publicaciones.
      </Typography>

      <Box style={{ marginBottom: "20px", textAlign: "center" }}>
        <Button variant="outlined" onClick={handleLogout} style={{ marginRight: "10px" }}>
          Salir
        </Button>

        {/* Mostrar botón de administración solo si el usuario es administrador */}
        {user?.role === "Administrador" && (
          <AdminButton variant="outlined" onClick={navigateToAdminPanel}>
            Ir al Panel de Administración
          </AdminButton>
        )}
      </Box>

      <TextField 
        fullWidth 
        label="¿Qué estás pensando?" 
        value={newPost} 
        onChange={(e) => setNewPost(e.target.value)} 
        variant="outlined" 
        multiline
        rows={3}
        style={{ marginBottom: "10px" }}
      />
      <StyledButton 
        variant="contained" 
        fullWidth 
        onClick={addPost}
        style={{ marginBottom: "20px" }}
      >
        Publicar
      </StyledButton>

      {posts.map((post) => (
        <PostCard key={post.id}>
          <CardContent>
            <Typography variant="body1">{post.content}</Typography>
          </CardContent>
          <CardActions>
            <LikeButton onClick={() => likePost(post.id)}>
              <Favorite />
            </LikeButton>
            <Typography>{post.likes} Me gusta</Typography>
            {user?.role === "Administrador" && (
              <>
                <IconButton onClick={() => deletePost(post.id)}>
                  <Delete color="error" />
                </IconButton>
              </>
            )}
          </CardActions>
          <Divider />
          <CardContent>
            <TextField 
              fullWidth 
              label="Escribe un comentario..." 
              variant="outlined" 
              value={comment[post.id] || ""} 
              onChange={(e) => setComment({ ...comment, [post.id]: e.target.value })}
              style={{ marginBottom: "10px" }}
            />
            <Button 
              variant="text" 
              color="primary" 
              onClick={() => addComment(post.id)}
            >
              Comentar
            </Button>
          </CardContent>
          {post.comments.map((comment, index) => (
            <CardContent key={index} style={{ paddingLeft: "20px" }}>
              <Typography variant="body2">{comment}</Typography>
              {user?.role === "Administrador" && (
                <IconButton onClick={() => deleteComment(post.id, index)}>
                  <Delete color="error" />
                </IconButton>
              )}
            </CardContent>
          ))}
        </PostCard>
      ))}

      <ToastContainer />
    </Container>
  );
}
