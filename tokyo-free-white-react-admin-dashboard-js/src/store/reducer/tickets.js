const INITIAL_STATE ={
  ticketsList:[],
  ticketDetails:{},
  ticketNotes:[],
}


export default function tickets(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "GET_TICKETS_LIST":
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
