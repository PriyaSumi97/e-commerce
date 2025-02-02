import { Button, Container, Snackbar, Typography } from "@mui/material";
import { signIn } from "../firebase";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import '../styles/signin.css';

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);


    useEffect(() => {
      if (user) {
        navigate("/");
      }
    }, [user, navigate]);

    const handleSignIn = async () => {
      try {
        await signIn(); // Call the signIn function from firebase.js
      } catch (error) {
        if (error.code === 'auth/cancelled-popup-request') {
          setOpen(true); // Show Snackbar on cancellation
        }
        console.error(error.message);
      }
    };

  return (
    <Container className="login-container">
      <Typography variant="h4">Login to Janardan E-Commerce</Typography>
      <Button variant="contained" onClick={handleSignIn}>Login with Google</Button>
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        message="You closed the sign-in popup."
      />
    </Container>
  );
};

export default Login;
