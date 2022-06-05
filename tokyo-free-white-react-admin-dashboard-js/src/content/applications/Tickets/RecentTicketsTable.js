import { useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
} from '@mui/material';
import Label from 'src/components/Label';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import BulkActions from './BulkActions';
import { useNavigate } from 'react-router';

const getStatusLabel = (ticketStatus) => {
  const map = {
    Closed: {
      text: 'Closed',
      color: 'error'
    },
    Active: {
      text: 'Active',
      color: 'success'
    },
    Pending: {
      text: 'Pending',
      color: 'warning'
    }
  };

  const { text, color } = map[ticketStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (tickets, filters) => {
  return tickets.filter((ticket) => {
    let matches = true;
    if (filters.status && ticket.status !== filters.status) {
      matches = false;
    }
    return matches;
  });
};

const applyPagination = (tickets, page, limit) => {
  return tickets.slice(page * limit, page * limit + limit);
};

const RecentTicketsTable = ({ tickets,role }) => {
  let navigate= useNavigate()
  const [selectedtickets, setSelectedtickets] = useState([]);
  const selectedBulkActions = selectedtickets.length > 0;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [filters, setFilters] = useState({
    status: null
  });
 
  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'Active',
      name: 'Active'
    },
    {
      id: 'Pending',
      name: 'Pending'
    },
    {
      id: 'Closed',
      name: 'Closed'
    }
  ];

  const handleStatusChange = (e) => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const filteredtickets = applyFilters(tickets, filters);
  const paginatedtickets = applyPagination(
    filteredtickets,
    page,
    limit
  );
  const selectedSometickets =
    selectedtickets.length > 0 &&
    selectedtickets.length < tickets.length;
  const selectedAlltickets =
    selectedtickets.length === tickets.length;
  const theme = useTheme();
  
  const handleEditTicket = (id) => {
    console.log(id);
    navigate(`/management/tickets/editticket/${id}`)  
  };
  const handleTicketDetails = (id) => {
    console.log(id);
    navigate(`/management/tickets/ticketdetails/${id}`)  
  };

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status || 'all'}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="Recent Tickets"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Last Updated on</TableCell>
              <TableCell>Ticket ID</TableCell>
              <TableCell >Status</TableCell>
              <TableCell >Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedtickets.map((ticket) => {
              const isticketselected = selectedtickets.includes(
                ticket._id
              );
              return (
                <TableRow
                  hover
                  key={ticket?._id}
                  selected={isticketselected}
                >
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {ticket?.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {ticket?.customerId?.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {Moment(ticket?.updatedAt).format('ddd DD MMM YYYY')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {tickets.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {ticket?._id}
                    </Typography>
                  </TableCell>
                   <TableCell>{getStatusLabel(ticket?.status)}</TableCell>
                  <TableCell>
                    { role!=="customer" && <Tooltip title="Change Status" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => handleEditTicket(ticket._id)}
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>}
                    <Tooltip title="Ticket Details" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={()=>handleTicketDetails(ticket._id)}
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredtickets.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

RecentTicketsTable.propTypes = {
  tickets: PropTypes.array.isRequired
};

RecentTicketsTable.defaultProps = {
  tickets: []
};

export default RecentTicketsTable;
