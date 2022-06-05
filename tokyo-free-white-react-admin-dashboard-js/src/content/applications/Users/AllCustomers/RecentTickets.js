import { Card } from '@mui/material';
import RecentTicketsTable from './RecentTicketsTable';
import { getCustomersList } from 'src/store/action/admin';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';


function RecentTickets() {
  let customers =useSelector((state)=>state.admin.customersList)
  const { auth } = useSelector((state) => ({ ...state }));
   let dispatch=useDispatch()

  useEffect(() => {
    dispatch(getCustomersList(auth.token));
  }, []);
  console.log(customers)
  return (
    <Card>
      <RecentTicketsTable customers={customers} />
    </Card>
  );
}

export default RecentTickets;
