import { Button, Stack, TextField, Box, Typography } from "@mui/material";
import {
  useContext,
  useState,
} from "react";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import   { LoginContext } from "../hooks/loginContext";
 "../hooks/loginContext";



const Login = () => {
  const [username, SetUsername] = useState<string>("");
  const [password, SetPassword] = useState<string>("");
  const { setName, setIsLogin } = useContext(LoginContext);
  const nav = useNavigate();

  const onSubmit = async () => {
    if (!username || !password) return;
    try {
      const res = await axios.post(`http://localhost:8080/api/user/login`, {
        UserName: username,
        Password: password,
      });
      localStorage.setItem("userId", res.data.Id);
      localStorage.setItem("name", res.data.Name);
      localStorage.setItem("isLogin", "true");
      setName(res.data.Name);
      setIsLogin("true");
      nav("/home");
    } catch {
      nav("/signup");
      console.error("failad");
    }
  };
  const MoveToSignIn = () => {
    nav("/signup");
  };
  return (
    <>
      <Box
        sx={{
          padding: 3,
          borderRadius: 2,
          width: 300,
          margin: "auto",
          boxShadow: 3,
        }}
      >
        <h2>Welcome!!</h2>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff", // Background color of the form (white)
            borderRadius: 2, // Rounded corners for the form box
          }}
        >
          <Typography variant="h4" color="#d32f2f" gutterBottom>
            Login
          </Typography>

          <Typography variant="body1" textAlign="center" marginBottom={2}>
            Are you new?
          </Typography>

          <Button
            onClick={MoveToSignIn}
            variant="outlined"
            fullWidth
            sx={{
              marginBottom: 2,
              color: "#d32f2f", // Red color for the sign-in button
              borderColor: "#d32f2f",
              "&:hover": {
                backgroundColor: "#d32f2f",
                color: "#fff",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#d32f2f !important",
              },
            }}
          >
            Press to SignUp
          </Button>

          <TextField
            required
            id="outlined-username"
            label="Username"
            variant="outlined"
            value={username}
            onChange={({ target }) => SetUsername(target.value)}
            margin="normal"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#d32f2f", // Red border color
                },
                "&:hover fieldset": {
                  borderColor: "#d32f2f", // Red border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#d32f2f !important",
                },
              },
            }}
          />

          <TextField
            required
            id="outlined-password"
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={({ target }) => SetPassword(target.value)}
            margin="normal"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#d32f2f", // Red border color
                },
                "&:hover fieldset": {
                  borderColor: "#d32f2f", // Red border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#d32f2f !important",
                },
              },
            }}
          />

          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ marginTop: 2 }}
          >
            <Button
              onClick={onSubmit}
              variant="contained"
              endIcon={<SendIcon />}
              fullWidth
              sx={{
                backgroundColor: "#d32f2f", // Red background for the send button
                "&:hover": {
                  backgroundColor: "#b71c1c", // Darker red on hover
                },
              }}
            >
              Send
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
};
export default Login;
