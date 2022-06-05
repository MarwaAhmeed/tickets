import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";

import Sidebar from './Sidebar';
import SidebarCustomer from "./SidebarCustomer"
import SidebarCustomerService from "./SidebarCustomerService"
import Header from './Header';

const MainWrapper = styled(Box)(
  ({ theme }) => `
        flex: 1 1 auto;
        display: flex;
        height: 100%;
        
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            padding-left: ${theme.sidebar.width};
        }
`
);

const MainContent = styled(Box)(
  ({ theme }) => `
        margin-top: ${theme.header.height};
        flex: 1 1 auto;
        overflow: auto;
`
);

const SidebarLayout = () => {

  // get role of logged in and display his sidebar
  const { auth } = useSelector((state) => ({ ...state }));
   console.log(auth)
  return (
    <>
    {auth.role=="admin"?<Sidebar/>:auth.role=="customerService"?<SidebarCustomerService/>:<SidebarCustomer/>}
      
      <MainWrapper>
        <Header />
        <MainContent>
          <Outlet />
        </MainContent>
      </MainWrapper>
    </>
  );
};

export default SidebarLayout;
