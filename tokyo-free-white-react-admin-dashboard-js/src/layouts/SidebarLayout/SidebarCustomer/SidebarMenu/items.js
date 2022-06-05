import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import AddBoxIcon from '@mui/icons-material/AddBox';

const menuItems = [
  {
    heading: 'Management',
    items: [
      {
        name: 'Tickets',
        icon: TableChartTwoToneIcon,
        link: '/management/tickets'
      },
      {
        name: 'Add Ticket',
        icon: AddBoxIcon,
        link: '/management/tickets/addticket'
      },
    
    ]
  },
];

export default menuItems;
