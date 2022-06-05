import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

// Pages

const LoginPage = Loader(lazy(() => import('src/content/pages/Auth/Login')));
const SignupPage = Loader(lazy(() => import('src/content/pages/Auth/Register')));
const TicketDetails=Loader(lazy(() => import('src/content/pages/Tickets/TicketDetails')));
const TicketsEdit=Loader(lazy(() => import('src/content/pages/Tickets/TicketsEdit')));
const EditCustomer=Loader(lazy(() => import('src/content/pages/Customer/EditCustomer')));


// Dashboards

const WelcomPage=Loader(lazy(() => import('src/content/dashboards/WelcomPage')))
const Dashboard = Loader(lazy(() => import('src/content/dashboards/Dashboard')));

// Applications

const Tickets = Loader(lazy(() => import('src/content/applications/Tickets')));
const AllCustomers = Loader(lazy(() => import('src/content/applications/Users/AllCustomers')));
const AddCustomer = Loader(lazy(() => import('src/content/applications/Users/AddCustomer')));
const AddTicket=Loader(lazy(() => import('src/content/applications/AddTicket/AddTicket')));



// Status

const Status404 = Loader(lazy(() => import('src/content/pages/Status/Status404')));
const Status500 = Loader(lazy(() => import('src/content/pages/Status/Status500')));
const StatusComingSoon = Loader(lazy(() => import('src/content/pages/Status/ComingSoon')));
const StatusMaintenance = Loader(lazy(() => import('src/content/pages/Status/Maintenance')));


const routes = [
  {
    path: '*',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <LoginPage />
      },
      {
        path: '/signup',
        element:<SignupPage/>
        
      },
      {
        path: 'status',
        children: [
          {
            path: '/',
            element: (
              <Navigate
                to="404"
                replace
              />
            )
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          },
        ]
      },
      {
        path: '*',
        element: <Status404 />
      },
    ]
  },
  {
    path: 'dashboards',
    element: (
      <SidebarLayout />
    ),
    children: [
      {
        path: '/',
        element:<WelcomPage/>
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
    ]
  },
  {
    path: 'management',
    element: (
      <SidebarLayout />
    ),
    children: [
      {
        path: '/',
        element: (
          <Navigate
            to="/management/tickets"
            replace
          />
        )
      },
      {
        path: 'tickets',
        element: <Tickets/>
      },
      {
        path: 'tickets/addticket',
        element: <AddTicket/>
      },
      {
        path: 'tickets/editticket/:id',
        element: <TicketsEdit/>
      },
      {
        path: 'tickets/ticketdetails/:id',
        element: <TicketDetails/>
      },
      {
        path: 'customers',
        children: [
          {
            path: '/',
            element: (
              <Navigate
                to="allcustomers"
                replace
              />
            )
          },
          {
            path: 'allcustomers',
            element: <AllCustomers />
          },
          {
            path: 'addcustomer',
            element: <AddCustomer />
          },
          {
            path: 'editcustomer/:id',
            element: <EditCustomer />
          },
        ]
      }
    ]
  },

];

export default routes;
