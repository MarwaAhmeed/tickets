import {
  Card,
  Box,
  Grid,
  Typography,
  Hidden,
  Divider,
 
} from '@mui/material';

import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getTotalCustomers, getTotalTickets } from 'src/store/action/admin';


function AccountBalance() {
  const { auth } = useSelector((state) => ({ ...state }));
  let totalTicets =useSelector((state)=>state.admin.totalTickets)
  let totalCustomers =useSelector((state)=>state.admin.totalCustomers)

  let dispatch=useDispatch()

 useEffect(() => {
   dispatch(getTotalTickets(auth.token));
   dispatch(getTotalCustomers(auth.token))
 }, []);
  return (
    <Card>
      <Grid spacing={3} container >
        <Grid item xs={12} md={6}>
          <Box p={4}>
            <Typography sx={{ pb: 3 }} variant="h4">
              Total Tickets
            </Typography>
            <Box>
              <Typography variant="h1" gutterBottom>
                  {totalTicets}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}  sx={{ position: 'relative' }}>
        <Hidden mdDown>
            <Divider absolute orientation="vertical" />
          </Hidden>
          <Box p={4} >
            <Typography sx={{ pb: 3 }} variant="h4">
               Total Customers
            </Typography>
            <Box>
              <Typography variant="h1" gutterBottom>
                  {totalCustomers}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Card>
    
  );
}

export default AccountBalance;
