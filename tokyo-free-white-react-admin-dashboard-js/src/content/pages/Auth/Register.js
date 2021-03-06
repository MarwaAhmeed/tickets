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
import { register } from "../../../store/action/auth";
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
      Marwa
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const emailPattern= new RegExp("^[^\\s@]+@([^\\s@.,]+\\.)+[^\\s@.,]{2,}$")
  const namePattern=new RegExp("^[a-z]*$")
  const passPattern=new  RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})")
 const [userForm,setUserForm]=useState({
   name:"",
   email:"",
   password:"",
 });
 const [userFormErrors, setUserFormError] = useState({
  nameErr:null,
   emailErr: null,
   passwordErr: null,
 });
 useEffect(() => {
}, [userForm]);

  const handleSubmit = async(e) => {
    console.log(userForm)
  
    e.preventDefault();
    try{
     await register(userForm)
     toast.success("Register Success Please Login");
      navigate("/");
    }
    catch(err){
      toast.error(err.response.data)
    }
  };

  const handleChange=(e)=>{
    if(e.target.name==="email"){
      setUserForm({
        ...userForm,
        email:e.target.value,
      });
      setUserFormError({
        ...userFormErrors,
        emailErr:
         e.target.value.length===0
         ?"this filed is requird"
         :!emailPattern.test(e.target.value) 
         ?"email not valid" 
         : null
      })
    }
    else if(e.target.name==="name"){
      setUserForm({
        ...userForm,
        name:e.target.value,
      });
      setUserFormError({
        ...userFormErrors,
        nameErr:
         e.target.value.length===0
         ?"this filed is requird"
         :!namePattern.test(e.target.value) 
         ?"No space" 
         : null
      })
    }
      else if(e.target.name==="password"){
        setUserForm({
          ...userForm,
          password:e.target.value,
        })
        setUserFormError({
          ...userFormErrors,
          passwordErr:
           e.target.value.length===0
           ?"this filed is requird"
           :!passPattern.test(e.target.value) 
           ?"password length not less than 8 characters , contains at least one lowercase , one uppercase ,  at least one digit and special character" 
           : null
        })
      }
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
      <ToastContainer />
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  onChange={handleChange}
                  error={!!userFormErrors.nameErr}
                  helperText={userFormErrors.nameErr}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  error={!!userFormErrors.emailErr}
                  helperText={userFormErrors.emailErr}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  error={!!userFormErrors.passwordErr}
                  helperText={userFormErrors.passwordErr}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!!userFormErrors.emailErr || !!userFormErrors.passwordErr||!!userFormErrors.nameErr ||!userForm.email || !userForm.password ||!userForm.name}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
