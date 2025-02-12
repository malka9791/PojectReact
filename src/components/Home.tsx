import { Title } from "@mui/icons-material";
import Login from "./login";
import { Box, Typography } from "@mui/material";
import Header from "./header";
import H from "./header";

const Home = () => {
  return (
    <>
      {/* <Header /> */}
      <Header/>
      <br />
      <Box
        sx={{
          padding: 3,
          borderRadius: 2,
          width: 300,
          margin: "auto",
          boxShadow: 3,
        }}
      >
        <h2>Enter your details!!</h2>
        <Login />
      </Box>
    </>
  );
};
export default Home;
