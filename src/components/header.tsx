import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Logo from "./pictures/Logo.jpg";
import { Link } from "react-router-dom";
import { margin } from "@mui/system";

const Header = () => {
  return (
    <AppBar
      sx={{ backgroundColor: "#fff", color: "#d32f2f" }}
      // position="static"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            src={Logo}
            alt="description"
            style={{
              width: "100px",
              height: "auto",
              margin: "0px 15px 0px 15px",
            }}
          />
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button sx={{ my: 2, display: "block", color: "#d32f2f" }}>
              Login
            </Button>
            <Button sx={{ my: 2, display: "block", color: "#d32f2f" }}>
              our Recipes
            </Button>
            <Button sx={{ my: 2, display: "block", color: "#d32f2f" }}>
              categories
            </Button>
            <Button sx={{ my: 2, display: "block", color: "#d32f2f" }}>
              About Us🤏
            </Button>
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
  );
};
export default Header;
