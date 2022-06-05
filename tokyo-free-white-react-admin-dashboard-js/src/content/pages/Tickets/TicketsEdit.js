import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { editeTicket } from 'src/store/action/admin';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { editeTicketStatus} from 'src/store/action/customerService';
import { getTicketDetails } from 'src/store/action/tickets';

const theme = createTheme();

export default function EditTicket() {
  const params = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));
  const ticketDetails = useSelector((state) => state.tickets.ticketDetails );
 useEffect(() => {
    dispatch(getTicketDetails(params));
}, []);

  const [status, setStatus] = useState(ticketDetails?.status);
  useEffect(() => {
    console.log(status)
  }, [status]);

  const handleSubmit = async (e) => {
    console.log(status);

    e.preventDefault();
    try {
      if(auth.role=="admin"){
        await editeTicket(params,status,auth.token);
      }
      else if(auth.role=="customerService"){
        await editeTicketStatus(params,status,auth.token);
      }
      navigate('/management/tickets');
    } catch (err) {
      navigate("/")
      window.localStorage.removeItem("auth")
    }
  };

  const handleChange = (e) => {
    setStatus(e.target.value)
  };
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
            alignItems: 'center'
          }}
        >
          <Typography component="h1" variant="h5">
           Update Status
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-title"
                  title="title"
                  required
                  fullWidth
                  id="title"
                  autoFocus
                  value={ticketDetails?.title}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="ticketId"
                  title="ticketId"
                  autoComplete="ticketId"
                  value={ticketDetails?._id}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  title="customer"
                  type="status"
                  id="status"
                  autoComplete="new-status"
                  value={ticketDetails?.customerId?.email}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="Status"
                    onChange={handleChange}
                  >
                    <MenuItem value={"Active"}>Active</MenuItem>
                    <MenuItem value={"Pending"}>Pending</MenuItem>
                    <MenuItem value={"Closed"}>Closed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!status}
            >
              Update
             </Button>
          </Box>
        </Box>
       
      </Container>
    </ThemeProvider>
  );
}
