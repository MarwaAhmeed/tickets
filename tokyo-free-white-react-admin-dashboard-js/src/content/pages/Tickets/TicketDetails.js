import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';

import {addNote} from 'src/store/action/admin';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { addCustomerNote } from 'src/store/action/customer';
import { addCustomerSeviceNote } from 'src/store/action/customerService';
import { getTicketDetails, getTicketNotes } from 'src/store/action/tickets';
const theme = createTheme();

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function TicketDetails() {
  const params = useParams();
  let navigate=useNavigate()
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));
  const ticketDetails = useSelector((state) =>state.tickets.ticketDetails);
  const ticketNotes = useSelector((state) => state.tickets.ticketNotes);

  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
      dispatch(getTicketDetails(params));
      dispatch(getTicketNotes(params));
  }, []);


  const handleSubmit = async (e) => {
    
    e.preventDefault();
    console.log(comment)
    try {
      if(auth.role=="admin"){
        await addNote(params,comment,auth.token);
        dispatch(getTicketNotes(params));
      }
      else if(auth.role=="customer"){
        await addCustomerNote(params,comment,auth.email,auth.token);
        dispatch(getTicketNotes(params));
      }
      else if(auth.role=="customerService"){
        await addCustomerSeviceNote(params,comment,auth.token);
        dispatch(getTicketNotes(params));
      }
       setOpen(false)
    } catch (err) {
      navigate("/")
      window.localStorage.removeItem("auth")
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Typography variant="h6" component="div" margin={3}>
        Ticket Details
      </Typography>
      <Card sx={{ margin: 4 }}>
        <CardContent>
          <Typography variant="h6" component="div" sx={{textTransform:"uppercase" }}>
            Ticket Title
          </Typography>
          <Typography sx={{ fontSize: 15,marginBottom:3,marginTop:1 }} color="text.secondary" gutterBottom>
            {ticketDetails?.title}
          </Typography>
          <Typography variant="h6" component="div" sx={{textTransform:"uppercase" }}>
            Ticket Id
          </Typography>
          <Typography sx={{ fontSize: 15,marginBottom:3 ,marginTop:1}} color="text.secondary" gutterBottom>
            {ticketDetails?._id}
          </Typography>
          <Typography variant="h6" component="div" sx={{textTransform:"uppercase" }}>
            Ticket Customer
          </Typography>
          <Typography sx={{ fontSize: 15,marginBottom:3 ,marginTop:1 }} color="text.secondary" gutterBottom>
            {ticketDetails?.customerId?.email}
          </Typography>
          <Typography variant="h6" component="div"sx={{textTransform:"uppercase" }}>
            Ticket Status
          </Typography>
          <Typography sx={{ fontSize: 15,marginBottom:3 ,marginTop:1 }} color="text.secondary" gutterBottom>
            {ticketDetails?.status}
          </Typography>
        </CardContent>
      </Card>
      <Box  sx={{
            marginTop: 8,
            display: 'flex',
            justifyContent: 'space-around'
          }} >
      <Typography variant="h6" component="div" margin={3}>
        Ticket Notes
      </Typography>
      <Button onClick={handleOpen}>Add Note</Button>
      </Box>
     
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="comment"
              label="comment"
              name="comment"
              autoComplete="email"
              autoFocus
              onChange={(e)=>setComment(e.target.value)}
            />
            <Button onClick={handleSubmit}>Add Note</Button>
          </Box>
        </Fade>
      </Modal>
     {ticketNotes?.map((note)=>{
       return(
        <Card sx={{ margin: 4 }} key={note._id} >
        <CardContent>
          <Typography variant="h6" component="div">
            Comment
          </Typography>
          <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
            {note?.comment}
          </Typography>
          <Typography variant="h6" component="div">
            Owner
          </Typography>
          <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
            {note?.owner}
          </Typography>
        </CardContent>
      </Card>
       )
     })}
    </ThemeProvider>
  );
}
