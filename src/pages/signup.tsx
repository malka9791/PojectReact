import {
  Button,
  TextField,
  Box,
  Typography,
  InputAdornment,
} from "@mui/material";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Send, Person, Email, Lock,Phone, PermIdentity} from "@mui/icons-material";
import { Link, useNavigate } from "react-router";
import axios from "axios";
type FormValues = {
  UserName: string;
  Password: string;
  Name: string;
  Phone: string;
  Email: string;
  Tz: string;
};

// סכמת ולידציה עם כל השדות חובה
const schema = Yup.object().shape({
  UserName: Yup.string().required("User Name is required"),
  Password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  Name: Yup.string().required(),
  Phone: Yup.string().length(10).required(),

  Email: Yup.string()
    .email("Invalid Email format")
    .required("Email is required"),
  Tz: Yup.string().length(9).required(),
});

const SignUp = () => {
  const [message, setErrorMessage] = useState<string>("");
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      UserName: "",
      Password: "",
      Name: "",
      Phone: "",
      Email: "user@gmail.com",
      Tz: "",
    },
    mode: "onBlur",
  });
  //submit function
  const onSubmit = async (data: FormValues) => {
    //get function from authAction
    try {
      const res = await axios.post(
        "http://localhost:8080/api/user/sighin",
        data
      );
      localStorage.setItem("userId",res.data.Id);
      //if Ok pass to home page
      nav("/home");
      //else print messege
    } catch (err) {
      console.error(err);
      setErrorMessage("failed, try again");
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 11 }}>
        <Box
          sx={{
            padding: 3,
            width: 400,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="#d32f2f" mb={3}>
            Sign Up
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("UserName")}
              label="UserName"
              fullWidth
              margin="normal"
              variant="outlined"
              error={!!errors.UserName}
              helperText={errors?.UserName?.message}
              InputLabelProps={{ style: { color: " #d32f2f" } }}
              InputProps={{
                style: { color: " black" },
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: "#d32f2f" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#d32f2f" },
                  "&:hover fieldset": { borderColor: "#d32f2f" },
                  "&.Mui-focused fieldset": {
                    borderColor: "#d32f2f !important",
                  },
                  "&.Mui-error fieldset": {
                    borderColor: "#d32f2f !important",
                  },
                },
                "& .MuiFormHelperText-root": { color: "#d32f2f" },
              }}
            />
            <TextField
              {...register("Email")}
              label="Email"
              type="Email"
              fullWidth
              margin="normal"
              variant="outlined"
              error={!!errors.Email}
              helperText={errors?.Email?.message}
              InputLabelProps={{ style: { color: " #d32f2f" } }}
              InputProps={{
                style: { color: " black" },
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: "#d32f2f" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#d32f2f" },
                  "&:hover fieldset": { borderColor: "#d32f2f" },
                  "&.Mui-focused fieldset": {
                    borderColor: "#d32f2f !important",
                  },
                  "&.Mui-error fieldset": {
                    borderColor: "#d32f2f !important",
                  },
                },
                "& .MuiFormHelperText-root": { color: "#d32f2f" },
              }}
            />
            <TextField
              {...register("Name")}
              label="Name"
              fullWidth
              margin="normal"
              variant="outlined"
              error={!!errors.Name}
              helperText={errors?.Name?.message}
              InputLabelProps={{ style: { color: " #d32f2f" } }}
              InputProps={{
                style: { color: " black" },
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: "#d32f2f" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#d32f2f" },
                  "&:hover fieldset": { borderColor: "#d32f2f" },
                  "&.Mui-focused fieldset": {
                    borderColor: "#d32f2f !important",
                  },
                  "&.Mui-error fieldset": {
                    borderColor: "#d32f2f !important",
                  },
                },
                "& .MuiFormHelperText-root": { color: "#d32f2f" },
              }}
            />
            <TextField
              {...register("Password")}
              label="Password"
              type="Password"
              fullWidth
              margin="normal"
              variant="outlined"
              error={!!errors.Password}
              helperText={errors?.Password?.message}
              InputLabelProps={{ style: { color: " #d32f2f" } }}
              InputProps={{
                style: { color: " black" },
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: "#d32f2f" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#d32f2f" },
                  "&:hover fieldset": { borderColor: "#d32f2f" },
                  "&.Mui-focused fieldset": {
                    borderColor: "#d32f2f !important",
                  },
                  "&.Mui-error fieldset": {
                    borderColor: "#d32f2f !important",
                  },
                },
                "& .MuiFormHelperText-root": { color: "#d32f2f" },
              }}
            />
            <TextField
              {...register("Phone")}
              label="Phone"
              fullWidth
              margin="normal"
              variant="outlined"
              error={!!errors.Phone}
              helperText={errors?.Phone?.message}
              InputLabelProps={{ style: { color: " #d32f2f" } }}
              InputProps={{
                style: { color: " black" },
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone sx={{ color: "#d32f2f" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#d32f2f" },
                  "&:hover fieldset": { borderColor: "#d32f2f" },
                  "&.Mui-focused fieldset": {
                    borderColor: "#d32f2f !important",
                  },
                  "&.Mui-error fieldset": {
                    borderColor: "#d32f2f !important",
                  },
                },
                "& .MuiFormHelperText-root": { color: "#d32f2f" },
              }}
            />
            <TextField
              {...register("Tz")}
              label="Tz"
              fullWidth
              margin="normal"
              variant="outlined"
              error={!!errors.Tz}
              helperText={errors?.Tz?.message}
              InputLabelProps={{ style: { color: " #d32f2f" } }}
              InputProps={{
                style: { color: " black" },
                startAdornment: (
                  <InputAdornment position="start">
                    <PermIdentity sx={{ color: "#d32f2f" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#d32f2f" },
                  "&:hover fieldset": { borderColor: "#d32f2f" },
                  "&.Mui-focused fieldset": {
                    borderColor: "#d32f2f !important",
                  },
                  "&.Mui-error fieldset": {
                    borderColor: "#d32f2f !important",
                  },
                },
                "& .MuiFormHelperText-root": { color: "#d32f2f" },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "#d32f2f",
                color: "#fff",
                fontSize: "18px",
                margin: "normal",
                mt: 3,
                "&:hover": {
                  bgcolor: "#d32f2f",
                },
              }}
              size="large"
              endIcon={<Send />}
            >
              Sign Up
            </Button>
            {message && <p style={{ color: "red" }}>{message}</p>}
          </form>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p style={{ margin: "10px  10px" }}>Do you have an account?</p>
            <Link
              to="/login"
              style={{
                color: "#d32f2f",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Login
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SignUp;
