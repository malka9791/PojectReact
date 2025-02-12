import { Button, Stack, TextField, Box, Typography } from "@mui/material";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import { CenterFocusStrong } from "@mui/icons-material";
import axios from "axios";

const Login = () => {
  const [username, SetUsername] = useState<string>("");
  const [password, SetPassword] = useState<string>("");
  const nav = useNavigate();

  const onSubmit = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/user/login/username/password`
      );
      console.log(res.data);
    } catch {
      console.error("failad");
    }
  };
  const SignIn = () => {
    nav("/home/signin/");
  };
  return (
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
        Sign In
      </Typography>

      <Typography variant="body1" textAlign="center" marginBottom={2}>
        Are you new?
      </Typography>

      <Button
        onClick={SignIn}
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
        }}
      >
        Press to Sign In
      </Button>

      <TextField
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
          },
        }}
      />

      <TextField
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
  );
};
export default Login;
