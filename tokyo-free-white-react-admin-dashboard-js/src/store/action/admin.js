import { axiosInstance } from "../../network/axios";

  export const getTotalTickets = (token) => (dispatch) => {
    axiosInstance
      .get("/admin/totaltickets",{
        headers: {
          authorization:token ,
        },
      })
      .then((res) =>
        dispatch({
          type: "GET_TOTAL_TICKETS",
          payload: res.data,
        })
      )
      .catch((err) => {
        window.location.assign("http://localhost:3000");
        window.localStorage.removeItem("auth")
      });
  };
 
  export const getTotalCustomers = (token) => (dispatch) => {
    axiosInstance
      .get("/admin/totalcustomers",{
        headers: {
          authorization:token ,
        },
      })
      .then((res) =>
        dispatch({
          type: "GET_TOTAL_CUSTOMERS",
          payload: res.data,
        })
      )
      .catch((err) =>{
        window.location.assign("http://localhost:3000");
        window.localStorage.removeItem("auth")
      });
  };

  export const getCustomersList = (token) => (dispatch) => {
    axiosInstance
      .get("/admin/customers",{
        headers: {
          authorization:token ,
        },
      })
      .then((res) =>
        dispatch({
          type: "GET_CUSTOMERS_LIST",
          payload: res.data,
        })
      )
      .catch((err) => {
        window.location.assign("http://localhost:3000");
        window.localStorage.removeItem("auth")
      });
  };

  export const getCustomerDetails = (id,token) => (dispatch) => {
    axiosInstance
      .get(`/admin/customer/${id}`,{
        headers: {
          authorization:token ,
        },
      })
      .then((res) =>
        dispatch({
          type: "GET_CUSTOMER_DETAILS",
          payload: res.data,
        })
      )
      .catch((err) => {
        window.location.assign("http://localhost:3000");
        window.localStorage.removeItem("auth")
      });
  };

  export const addCustomer = async (user,token) =>await axiosInstance.post("/admin/customer", user,{
    headers: {
      authorization:token ,
    },
  });
  export const editCustomer = async (id,user,token) =>await axiosInstance.post(`/admin/customer/${id}`, user,{
    headers: {
      authorization:token ,
    },
  });
  export const deletCustomer = async (id,token) =>await axiosInstance.delete(`/admin/customer/${id}`,{
    headers: {
      authorization:token ,
    },
  });

 export const editeTicket = async (params,data,token) =>
  await axiosInstance.patch(`/admin/ticket/${params.id}`, {status:data},{
    headers: {
      authorization:token ,
    },
  });
  
 export const addNote = async (params,data,token) =>
  await axiosInstance.post(`/admin/note/${params.id}`,{comment:data},{
    headers: {
      authorization:token ,
    },
  });

