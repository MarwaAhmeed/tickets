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
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { register } from "../../../store/action/auth";
import { getCustomerDetails } from 'src/store/action/admin';
import Input from '@mui/material/Input';
import EditCustomerForm from './EditCustomerForm';

const theme = createTheme();

export default function EditCustomer() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const emailPattern= new RegExp("^[^\\s@]+@([^\\s@.,]+\\.)+[^\\s@.,]{2,}$")
  const { auth } = useSelector((state) => ({ ...state }));
  const customerDetails = useSelector((state) => state.admin.customerDetails);
  const params = useParams();
  useEffect(() => {
    dispatch(getCustomerDetails(params.id,auth.token))
  }, [])
const [userForm,setUserForm]=useState({
  name:customerDetails.name,
  email:customerDetails.email
});

useEffect(() => {
}, [userForm]);

const [userFormErrors, setUserFormError] = useState({
  nameErr:null,
   emailErr: null,
 });

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
         :e.target.value.length<3
         ?"Name should be more than 2 char" 
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
                  value={userForm?.name}
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
                  value={userForm?.email}
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  error={!!userFormErrors.emailErr}
                  helperText={userFormErrors.emailErr}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!!userFormErrors.emailErr ||!!userFormErrors.nameErr ||!userForm.email ||!userForm.name}
            >
              Update Customer
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
