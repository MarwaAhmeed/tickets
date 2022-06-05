import { axiosInstance } from "../../network/axios";

  export const editeTicketStatus = async (params,data,token) =>
  await axiosInstance.patch(`/customerservice/ticket/${params.id}`, {status:data},{
    headers: {
      authorization:token ,
    },
  });

  export const addCustomerSeviceNote = async (params,data,token) =>
  await axiosInstance.post(`/customerservice/note/${params.id}`,{comment:data},{
    headers: {
      authorization:token ,
    },
  });
