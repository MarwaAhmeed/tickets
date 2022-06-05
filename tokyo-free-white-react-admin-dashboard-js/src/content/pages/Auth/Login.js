import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { login } from "../../../store/action/auth";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  let navigate = useNavigate();
  const emailPattern = new RegExp("^[^\\s@]+@([^\\s@.,]+\\.)+[^\\s@.,]{2,}$");
  const dispatch = useDispatch();
  const [userForm, setUserForm] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {}, [userForm]);

 const [userFormErrors, setUserFormError] = useState({
  emailErr: null,
  passwordErr: null,
});
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      let res = await login(userForm)
       if(res.data){
          //save user and token in localstorage
          window.localStorage.setItem("auth",JSON.stringify(res.data))
          //save user and token in redux
          dispatch({
            type: "LOGGED_IN_USER",
            payload: res.data,
          });
          console.log(res.data)
          navigate("/dashboards");
        }
      } catch (err) {
        toast.error(err.response.data);
      }
  };

  const handleChange=(e)=>{
    console.log(e.target.value)
    if (e.target.name === "email") {
      setUserForm({
        ...userForm,
        email: e.target.value,
      });
      setUserFormError({
        ...userFormErrors,
        emailErr:
          e.target.value.length === 0
            ? "this filed is requird"
            : !emailPattern.test(e.target.value)
            ? "email not valid"
            : null,
      });
    } else if (e.target.name === "password") {
      setUserForm({
        ...userForm,
        password: e.target.value,
      });
      setUserFormError({
        ...userFormErrors,
        passwordErr:
          e.target.value.length === 0
            ? "this filed is requird"
            : e.target.value.length < 5
            ? "must be 6 char"
            : null,
      });
    }
  }

  return (
    <ThemeProvider theme={theme}>
            <ToastContainer />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
              error={!!userFormErrors.emailErr}
              helperText={userFormErrors.emailErr}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
              error={!!userFormErrors.passwordErr}
              helperText={userFormErrors.passwordErr}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!!userFormErrors.emailErr || !!userFormErrors.passwordErr ||!userForm.email || !userForm.password}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
