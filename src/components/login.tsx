import { Button, Stack, TextField, Box, Typography } from "@mui/material";
import { createContext, ReactElement, ReactNode, useContext, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./header";

type LoginContextType = {
  name: string | null;
  SetMyName: (name: string) => void;
  isLogin: boolean | false;
  SetIsLogin: (islogin: boolean) => void;
};
const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider = ({ children }: { children: ReactElement }) => {
  const [name, SetMyName] = useState<string>("?");
  const [isLogin, SetIsLogin] = useState<boolean>(false);
  return (
    <LoginContext.Provider value={{ name, SetMyName, isLogin, SetIsLogin }}>
      {children}
    </LoginContext.Provider>
  );
};
export const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLoginContext must be used within a LoginProvider");
  }
  return context;
};

const Login = () => {
  const [username, SetUsername] = useState<string>("");
  const [password, SetPassword] = useState<string>("");
  const {SetMyName,SetIsLogin}=useLoginContext();
  const nav = useNavigate();

  const onSubmit = async () => {
    if(!username||!password)
      return
    try {
      // const res = await axios.post(`http://localhost:8080/api/user/login`, {
      //   UserName: username,
      //   Password: password,
      // });
      const r=1;
      SetMyName(username)
      SetIsLogin(true)
      nav("/home/");
    } catch {
      nav("/signin/");
      console.error("failad");
    }
  };
  const MoveToSignIn = () => {
    nav("/signin/");
  };
  return (
    <>
    {/* <LoginProvider> */}
      <Header/>
      <br/>
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
            }}
          >
            Press to Sign In
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
      {/* </LoginProvider> */}
    </>
  );
};
export default Login;
