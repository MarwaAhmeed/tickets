import BrightnessLowTwoToneIcon from '@mui/icons-material/BrightnessLowTwoTone';
import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';


const menuItems = [

  {
    items: [
      {
        name: 'Dashbord',
        link: '/dashboards/dashboard',
        icon: BrightnessLowTwoToneIcon
      },
    ]
  },
  {
    heading: 'Management',
    items: [
      {
        name: 'Tickets',
        icon: TableChartTwoToneIcon,
        link: '/management/tickets'
      },
      {
        name: 'Customers',
        icon: AccountCircleTwoToneIcon,
        link: '/management/customers',
        items: [
          {
            name: 'All Customers',
            link: '/management/customers/allcustomers'
          },
          {
            name: 'Add Customers',
            link: '/management/customers/addcustomer'
          }
        ]
      }
    ]
  },
];

export default menuItems;
