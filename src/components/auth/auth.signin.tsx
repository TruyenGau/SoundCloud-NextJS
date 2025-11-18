"use client";

import {
  GitHub,
  Google,
  Lock,
  Visibility,
  VisibilityOff,
  ArrowBack,
} from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

export const AuthSignIn = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isErrorUsername, setIsErrorUsername] = useState<boolean>(false);
  const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false);

  const [errorUsername, setErrorUsername] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");
  const [openMessage, setOpenMessage] = useState<boolean>(false);
  const [resMessage, setResMessage] = useState<string>("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async () => {
    setIsErrorUsername(false);
    setIsErrorPassword(false);
    setErrorUsername("");
    setErrorPassword("");

    if (!username) {
      setIsErrorUsername(true);
      setErrorUsername("Username can not be empty");
      return;
    }

    if (!password) {
      setIsErrorPassword(true);
      setErrorPassword("Password can not be empty");
      return;
    }

    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    if (!res?.error) {
      //redirect to home
      router.push("/");
    } else {
      setOpenMessage(true);
      setResMessage(res.error);
    }
  };

  return (
    <form>
      <Grid
        container
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          lg={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            padding: "24px",
          }}
        >
          <Box>
            <Link href={"/"}>
              <ArrowBack />
            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar>
              <Lock />
            </Avatar>
            <Typography component="h1">Sign in</Typography>
          </Box>

          <FormControl sx={{ width: "100%" }} variant="outlined">
            <TextField
              required
              id="outlined-adornment-username"
              type="text"
              label="Username"
              onChange={(e) => setUsername(e.target.value)}
              error={isErrorUsername}
              helperText={errorUsername}
              variant="outlined"
            />
          </FormControl>

          <FormControl sx={{ width: "100%" }} variant="outlined">
            <TextField
              required
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              label="Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setPassword(e.target.value)}
              error={isErrorPassword}
              helperText={errorPassword}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            />
          </FormControl>

          <Button
            variant="contained"
            sx={{ width: "100%" }}
            onClick={handleSubmit}
          >
            SIGN IN
          </Button>

          <Divider sx={{ width: "100%" }}>Or using</Divider>

          <Grid
            item
            sx={{
              display: "flex",
              gap: "12px",
            }}
          >
            <Avatar
              sx={{ cursor: "pointer", bgcolor: "orange" }}
              onClick={() => signIn("github")}
            >
              <GitHub titleAccess="Login with Github" />
            </Avatar>
            <Avatar sx={{ cursor: "pointer", background: "orange" }}>
              <Google titleAccess="Login with Google" />
            </Avatar>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        open={openMessage}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
          onClose={() => {
            setOpenMessage(false);
          }}
        >
          {resMessage}
        </Alert>
      </Snackbar>
    </form>
  );
};
