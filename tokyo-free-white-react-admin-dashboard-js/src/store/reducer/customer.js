const INITIAL_STATE ={
  ticketsList:[],
  ticketDetails:{},
  ticketNotes:[],
}
export default function customer(state = INITIAL_STATE, action) {
  console.log(action.type);
  switch (action.type) {
    case "GET_CUSTOMER_TICKETS":
      return {
        ...state,
        ticketsList: action.payload,
      };
     case "GET_TICKET_DETAILS":
      return {
        ...state,
        ticketDetails: action.payload,
      };
      case "GET_TICKET_NOTES":
        return {
          ...state,
          ticketNotes: action.payload,
        };
    default:
      return state;
  }
}
