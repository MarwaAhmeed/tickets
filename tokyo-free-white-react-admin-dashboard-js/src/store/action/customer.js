import { axiosInstance } from "../../network/axios";

export const getCustomerTicketsList = (id,token) => (dispatch) => {
    axiosInstance
      .get(`/customer/tickets/${id}`,{
        headers: {
          authorization:token ,
        },
      })
      .then((res) =>
        dispatch({
          type: "GET_CUSTOMER_TICKETS",
          payload: res.data,
        })
      )
      .catch((err) =>{
      window.location.assign("http://localhost:3000");
      window.localStorage.removeItem("auth")
    });
  };

  export const addCustomerNote = async (params,data,email,token) =>
  await axiosInstance.post(`/customer/note/${params.id}`,{comment:data,owner:email},{
    headers: {
      authorization:token ,
    },
  });

  export const addTicket = async (data,token) =>
  await axiosInstance.post(`/customer/ticket`,data,{
    headers: {
      authorization:token ,
    },
  });
