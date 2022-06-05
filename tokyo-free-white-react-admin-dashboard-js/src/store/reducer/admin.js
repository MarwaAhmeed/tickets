const INITIAL_STATE ={
    customersList:[],
    customerDetails:{},
    totalTickets:0,
    totalCustomers:0
}
export default function admin(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "GET_TOTAL_TICKETS":
          return {
            ...state,
            totalTickets: action.payload,
          };
          case "GET_TOTAL_CUSTOMERS":
            return {
              ...state,
              totalCustomers: action.payload,
            };
          case "GET_CUSTOMERS_LIST":
            return {
              ...state,
              customersList: action.payload,
            };
            case "GET_CUSTOMER_DETAILS":
              return {
                ...state,
                customerDetails: action.payload,
              };
      default:
        return state;
    }
  }
  