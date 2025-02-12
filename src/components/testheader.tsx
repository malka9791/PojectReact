import Logo from "./pictures/Logo.jpg";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
const Header=()=>
{
return(
    <>
    <Box sx={{ flexGrow: 1, }}>
    <AppBar 
    // position="static"
    >
      <Toolbar sx={{backgroundColor:"white"}}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 ,color:"#d32f2f"}}
          
        >
          <MenuIcon />
        </IconButton>
        {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1, }} color="#d32f2f">
          News
        </Typography> */}
        <img src={Logo} alt="description" style={{ width: '100px', height: 'auto' }}  />
        <Button sx={{color:"#d32f2f"}}>Login</Button>
      </Toolbar>
    </AppBar>
  </Box>
  </>
)
}
export default Header;