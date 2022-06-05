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
import { useDispatch,useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { addTicket } from 'src/store/action/customer';

const theme = createTheme();

export default function AddTicket() {
  let navigate = useNavigate();
  const { auth } = useSelector((state) => ({ ...state }));
  const [ticketForm, setticketForm] = useState({
    title: "",
    customerId:auth.customerId,
  });
  useEffect(() => {
    console.log(ticketForm)
  }, [ticketForm]);

 const [ticketFormErrors, setticketFormError] = useState({
  titleErr: null,
});
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        await addTicket(ticketForm,auth.token)
          navigate("/management/tickets");
        
      } catch (err) {
        navigate("/");
        window.localStorage.removeItem("auth")
      }
  };

  const handleChange=(e)=>{
    console.log(e.target.value)
    if (e.target.name === "title") {
      setticketForm({
        ...ticketForm,
        title: e.target.value,
      });
      setticketFormError({
        ...ticketFormErrors,
        titleErr:
          e.target.value.length === 0
            ? "this filed is requird"
            :e.target.value.length<=4
            ? "title should be more than 4 char"
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
          <Typography component="h1" variant="h5">
            Add Ticket
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="title Address"
              name="title"
              autoComplete="title"
              autoFocus
              onChange={handleChange}
              error={!!ticketFormErrors.titleErr}
              helperText={ticketFormErrors.titleErr}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!!ticketFormErrors.titleErr ||!ticketForm.title}
            >
              Add Ticket
            </Button>
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
