import { AppBar, Toolbar, Button, InputBase, Snackbar } from "@mui/material";
import { signIn, logout } from "../firebase";
import { useAuth } from "../Context/AuthContext";
import "../styles/navbar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log(user?.photoURL, "user");
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const handleSignIn = async () => {
    navigate("/login");
  };

  return (
    <AppBar className="navbar-container">
      <Toolbar className="navbar">
        <h2>E-Commerce</h2>
        <InputBase
          placeholder="Search..."
          onChange={(e) => onSearch(e.target.value)}
        />

      
          {user ? (
              <div className="navbar-right">
            <Button onClick={logout}>Logout</Button>
            <div className="navbar-profile">
            {user?.photoURL ? (
              <img src={user?.photoURL} alt="Profile" />
            ) : (
              <div className="profile-initial">
                {user.displayName ? user.displayName[0] : "U"}
              </div>
            )}
            <p>{user.displayName}</p>
          </div>
          </div>
          ) : (
            <Button onClick={handleSignIn}>Login</Button>
          )}
        <Snackbar
          open={open}
          autoHideDuration={1000}
          onClose={handleClose}
          message="You closed the sign-in popup."
        />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
