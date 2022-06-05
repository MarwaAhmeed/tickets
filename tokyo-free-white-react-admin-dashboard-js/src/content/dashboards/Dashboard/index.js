import { Helmet } from 'react-helmet-async';

import { Container, Grid } from '@mui/material';

import AccountBalance from './AccountBalance';


function DashboardCrypto() {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
          marginTop={5}
        >
          <Grid item xs={12}>
            <AccountBalance />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default DashboardCrypto;
