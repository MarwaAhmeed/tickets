import { Card } from '@mui/material';
import RecentTicketsTable from './RecentTicketsTable';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCustomerTicketsList } from 'src/store/action/customer';
import { getTicketsList } from 'src/store/action/tickets';


function RecentTickets() {
  let dispatch=useDispatch()
  const { auth } = useSelector((state) => ({ ...state }));

  let tickets=useSelector((state)=>{
    if(auth.role==="customer"){
      return  state.customer.ticketsList
    }
    else {
      return state.tickets.ticketsList
    }
  })

  useEffect(() => {
    { auth.role==="customer"? dispatch(getCustomerTicketsList(auth.customerId,auth.token)):dispatch(getTicketsList())}
  }, []);
  return (
    <Card>
      <RecentTicketsTable tickets={tickets} role={auth.role}/>
    </Card>
  );
}

export default RecentTickets;
