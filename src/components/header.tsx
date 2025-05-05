import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Logo from "../pictures/Logo.jpg";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useLoginContext } from "./login.tsx";
import { Typography } from "@mui/material";

const Header = () => {
  const { name, isLogin } = useLoginContext();
  const nav = useNavigate();
  return (
    <>
      <AppBar
        sx={{
          backgroundColor: "#fff",
          color: "#d32f2f",
        }}
        // position="static"
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img
              onClick={() => {
                nav("/home");
              }}
              src={Logo}
              alt="description"
              style={{
                width: "100px",
                height: "auto",
                margin: "0px 15px 0px 15px",
              }}
            />
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Box sx={{ my: 2, display: "block", color: "#d32f2f", px: 1 }}>
                <Link
                  to="/login"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Login
                </Link>
              </Box>
              {isLogin && (
                <>
                  <Box
                    sx={{ my: 2, display: "block", color: "#d32f2f", px: 1 }}
                  >
                    <Link
                      to="/recipes"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      our Recipes
                    </Link>
                  </Box>
                  <Box
                    sx={{ my: 2, display: "block", color: "#d32f2f", px: 1 }}
                  >
                    <Link
                      to="/login"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      categories
                    </Link>
                  </Box>
                  <Box
                    sx={{ my: 2, display: "block", color: "#d32f2f", px: 1 }}
                  >
                    <Link
                      to="/addrecipe"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      add Recipe
                    </Link>
                  </Box>
                </>
              )}
              <Box sx={{ my: 2, display: "block", color: "#d32f2f", px: 1 }}>
                <Link
                  to="/about"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  About Us🤏
                </Link>
              </Box>
            </Box>
            <Box sx={{ flexGrow: 3, display: "flex", textAlign: "center" }}>
              <Typography variant="h6" sx={{ color: "#d32f2f" }}>
                Hello {name}
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 0, color: "#d32f2f" }}>
              {/* {icon of profil} */}
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
export default Header;
