import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/Logo.jpg";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// MUI icons
import LoginIcon from "@mui/icons-material/Login";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import InfoIcon from "@mui/icons-material/Info";
import { LoginContext } from "../hooks/loginContext";
import { useContext } from "react";

const Header = () => {
  const { name } = useContext(LoginContext);
  const isLogin = localStorage.getItem("isLogin")
    ? localStorage.getItem("isLogin")
    : undefined;
  const nav = useNavigate();

  const linkStyle = {
    color: "inherit",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
  };

  const navBoxStyle = {
    my: 2,
    display: "flex",
    alignItems: "center",
    color: "#d32f2f",
    px: 1,
  };

  return (
    <Box sx={{ mb: 10 }}>
      <AppBar sx={{ backgroundColor: "#fff", color: "#d32f2f" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo */}
            <img
              onClick={() => nav("/home")}
              src={Logo}
              alt="description"
              style={{
                width: "100px",
                height: "auto",
                margin: "0 15px",
                cursor: "pointer",
              }}
            />

            {/* Navigation Links */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Box sx={navBoxStyle}>
                <Link to="/login" style={linkStyle}>
                  <LoginIcon sx={{ mr: 0.5 }} /> Login
                </Link>
              </Box>

              {isLogin == "true" && (
                <>
                  <Box sx={navBoxStyle}>
                    <Link to="/recipes" style={linkStyle}>
                      <MenuBookIcon sx={{ mr: 0.5 }} />
                      Our Recipes
                    </Link>
                  </Box>
                  <Box sx={navBoxStyle}>
                    <Link to="/myRecipes" style={linkStyle}>
                      <FavoriteBorderIcon sx={{ mr: 0.5 }} />
                      My Recipes
                    </Link>
                  </Box>
                  <Box sx={navBoxStyle}>
                    <Link to="/addrecipe" style={linkStyle}>
                      <AddOutlinedIcon sx={{ mr: 0.5 }} /> Add Recipe
                    </Link>
                  </Box>
                </>
              )}

              <Box sx={navBoxStyle}>
                <Link to="/about" style={linkStyle}>
                  <InfoIcon sx={{ mr: 0.5 }} /> About Us
                </Link>
              </Box>
            </Box>

            {/* User Avatar Circle */}
            <Box
              sx={{
                color: "white",
                fontSize: "20px",
                borderRadius: "50%",
                backgroundColor: "#d32f2f",
                width: "45px",
                height: "45px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                ml: 2,
              }}
            >
              <p style={{ margin: 0 }}>{name?.charAt(0)}</p>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;
