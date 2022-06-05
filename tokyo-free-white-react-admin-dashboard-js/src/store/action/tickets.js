import { axiosInstance } from "../../network/axios";

export const getTicketsList = () => (dispatch) => {
    axiosInstance
      .get("/tickets")
      .then((res) =>
        dispatch({
          type: "GET_TICKETS_LIST",
          payload: res.data,
        })
      )
      .catch((err) => console.log(err));
  };

  export const getTicketDetails = (params) => (dispatch) => {
    
    axiosInstance
      .get(`/tickets/${params.id}`)
      .then((res) =>
        dispatch({
          type: "GET_TICKET_DETAILS",
          payload: res.data,
        })
      )
      .catch((err) => console.log(err));
  };

  export const getTicketNotes = (params) => (dispatch) => {
    axiosInstance
      .get(`/tickets/notes/${params.id}`)
      .then((res) =>
        dispatch({
          type: "GET_TICKET_NOTES",
          payload: res.data,
        })
      )
      .catch((err) => console.log(err));
  };
